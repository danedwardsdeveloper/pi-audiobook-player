import { readFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import logger from '@/library/logger'
import type { PhotoData } from '@/types'
import sharp from 'sharp'

export async function getPhoto(folderName: string): Promise<PhotoData | null> {
	const folderPath = path.join(process.cwd(), 'public/media', folderName)

	try {
		const files = await readdir(folderPath)

		const photoFile = files.find((file) => {
			const extension = path.extname(file).toLowerCase()
			return extension === '.jpg' || extension === '.jpeg' || extension === '.png'
		})

		if (!photoFile) {
			logger.warn(`No photo found for ${folderName}`)
			return null
		}

		const filePath = path.join(folderPath, photoFile)
		const metadata = await sharp(filePath).metadata()
		const buffer = await readFile(filePath)

		const extension = path.extname(photoFile).toLowerCase()
		const mimeType = extension === '.png' ? 'image/png' : 'image/jpeg'

		const base64 = buffer.toString('base64')
		const dataUrl = `data:${mimeType};base64,${base64}`

		return {
			src: dataUrl,
			width: metadata.width || 500,
			height: metadata.height || 500,
		}
	} catch (error) {
		logger.error(`Error finding photo for ${folderName}:`, error)
		return null
	}
}

export async function getPhotos(folderNames: string[]): Promise<PhotoData[]> {
	try {
		const photosPromises = folderNames.map((folderName) => getPhoto(folderName))
		const photos = await Promise.all(photosPromises)

		const validPhotos = photos.filter((photo): photo is PhotoData => photo !== null)

		return validPhotos
	} catch (error) {
		logger.error('Error getting multiple photos:', error)
		return []
	}
}

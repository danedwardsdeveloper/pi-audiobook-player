import path from 'node:path'
import logger from '@/library/logger'
import { readDirectory } from './fileSystem'

export async function getTracks(folderName: string): Promise<string[]> {
	const folderPath = path.join(process.cwd(), 'public/media', folderName)

	try {
		const files = await readDirectory(folderPath)

		const audioFiles = files.filter((file) => {
			const extension = path.extname(file).toLowerCase()
			return extension === '.mp3'
		})

		if (audioFiles.length === 0) {
			logger.warn(`No audio files found in ${folderName}`)
			return []
		}

		return audioFiles
	} catch (error) {
		logger.error(`Error finding files in ${folderName}:`, error)
		return []
	}
}

export async function getAllTracks(folderNames: string[]): Promise<string[]> {
	try {
		const allFilesPromises = folderNames.map((folderName) => getTracks(folderName))
		const nestedFiles = await Promise.all(allFilesPromises)

		const allFiles = nestedFiles.flat()

		return allFiles
	} catch (error) {
		logger.error('Error getting multiple files:', error)
		return []
	}
}

import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import logger from '@/library/logger'

export const runtime = 'nodejs'

export async function getFolders(): Promise<string[]> {
	try {
		const mediaPath = path.join(process.cwd(), 'public/media')
		const items = await readdir(mediaPath)

		const folderPromises = items.map(async (item) => {
			const itemPath = path.join(mediaPath, item)
			const stats = await stat(itemPath)

			if (stats.isDirectory()) {
				return item
			}
			return null
		})

		const results = await Promise.all(folderPromises)

		const folders = results.filter((folder): folder is string => folder !== null).sort((a, b) => a.localeCompare(b))

		return folders
	} catch (error) {
		logger.error('Error getting folders:', error)
		return []
	}
}

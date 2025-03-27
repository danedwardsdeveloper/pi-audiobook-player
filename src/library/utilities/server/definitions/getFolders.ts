import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import database from '@/library/database/connection'
import { audiobooks } from '@/library/database/schema'
import logger from '@/library/logger'
import { inArray } from 'drizzle-orm'

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

		const existingAudiobooks = await database.select({ name: audiobooks.name }).from(audiobooks).where(inArray(audiobooks.name, folders))

		const existingNames = existingAudiobooks.map((book) => book.name)

		const newFolders = folders.filter((folder) => !existingNames.includes(folder))

		if (newFolders.length > 0) {
			const valuesToInsert = newFolders.map((name) => ({ name }))

			await database.insert(audiobooks).values(valuesToInsert)
		}

		return folders
	} catch (error) {
		logger.error('Error getting folders:', error)
		return []
	}
}

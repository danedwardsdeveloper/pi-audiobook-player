import { readFile } from 'node:fs/promises'
import path from 'node:path'
import logger from '@/library/logger'
import type { Metadata } from '@/types'

export async function getMetadata(folderName: string): Promise<Metadata | null> {
	const metadataPath = path.join(process.cwd(), 'public/media', folderName, 'metadata.json')
	try {
		const data = await readFile(metadataPath, { encoding: 'utf8' })
		const metadata = JSON.parse(data) as Metadata

		return metadata
	} catch (error) {
		logger.error(`Error reading metadata for ${folderName}:`, error)
		return null
	}
}

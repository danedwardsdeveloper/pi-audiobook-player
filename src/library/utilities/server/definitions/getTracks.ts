import { execSync } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import database from '@/library/database/connection'
import { type TrackInsertValues, audiobooks, tracks } from '@/library/database/schema'
import logger from '@/library/logger'
import { and, eq, inArray } from 'drizzle-orm'

export async function getTracks(folderName: string): Promise<string[]> {
	const folderPath = path.join(process.cwd(), 'public/media', folderName)

	try {
		const files = await readdir(folderPath)

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

function getAudioDuration(filePath: string): number {
	try {
		const output = execSync(`afinfo "${filePath}"`).toString()
		const durationMatch = output.match(/estimated duration: (\d+\.\d+)/)
		return durationMatch?.[1] ? Number.parseFloat(durationMatch[1]) : 0
	} catch (error) {
		logger.error('Error getting audio duration:', error)
		return 0
	}
}

export async function insertTracks(folderName: string): Promise<void> {
	try {
		const audiobookResult = await database.select({ id: audiobooks.id }).from(audiobooks).where(eq(audiobooks.name, folderName)).limit(1)

		if (audiobookResult.length === 0) {
			logger.warn(`Audiobook not found for folder: ${folderName}`)
			return
		}

		const audiobookId = audiobookResult[0].id

		const trackFileNames = await getTracks(folderName)

		const existingTracks = await database
			.select({ name: tracks.name })
			.from(tracks)
			.where(and(eq(tracks.audiobookId, audiobookId), inArray(tracks.name, trackFileNames)))

		const existingTrackNames = existingTracks.map((track) => track.name)

		const newTrackNames = trackFileNames.filter((trackName) => !existingTrackNames.includes(trackName))

		if (newTrackNames.length === 0) {
			logger.info(`No new tracks to add for ${folderName}`)
			return
		}

		const tracksToInsert: TrackInsertValues[] = await Promise.all(
			newTrackNames.map(async (trackName) => {
				const filePath = path.join(process.cwd(), 'public/media', folderName, trackName)

				return {
					name: trackName,
					audiobookId,
					durationSeconds: getAudioDuration(filePath),
				}
			}),
		)

		await database.insert(tracks).values(tracksToInsert)

		logger.info(`Inserted ${tracksToInsert.length} new tracks for ${folderName}`)
	} catch (error) {
		logger.error(`Error inserting tracks for ${folderName}:`, error)
	}
}

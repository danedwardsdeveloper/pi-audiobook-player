import database from '@/library/database/connection'
import { audiobooks as audiobooksTable, progress, tracks } from '@/library/database/schema'
import logger from '@/library/logger'
import { getFolders, getMetadata, getPhoto } from '@/library/utilities/server'
import type { Audiobook, PhotoData } from '@/types'
import { eq, inArray } from 'drizzle-orm'
import { type NextRequest, NextResponse } from 'next/server'

export interface AudiobooksGETresponse {
	message: 'success' | 'fail' | 'folderName missing'
	photos?: PhotoData[]
	audiobooks?: Audiobook[]
}

const routeDetail = 'GET api/audiobooks: '

export async function GET(_request: NextRequest): Promise<NextResponse<AudiobooksGETresponse>> {
	try {
		const folders = await getFolders()

		const promises = folders.map(async (folder) => {
			try {
				const [metadata, photo] = await Promise.all([getMetadata(folder), getPhoto(folder)])

				const [{ audiobookId }] = await database
					.select({ audiobookId: audiobooksTable.id })
					.from(audiobooksTable)
					.where(eq(audiobooksTable.name, folder))

				const tracksData = await database.select().from(tracks).where(eq(tracks.audiobookId, audiobookId))

				const trackIds = tracksData.map((track) => track.id)
				const progressData = await database.select().from(progress).where(inArray(progress.trackId, trackIds))

				const progressMap = new Map()
				for (const prog of progressData) {
					progressMap.set(prog.trackId, prog.positionSeconds)
				}

				if (!metadata || !photo) return null

				const data: Audiobook = {
					folderName: folder,
					titleDisplay: metadata.titleDisplay,
					titleSlug: metadata.titleSlug,
					writer: metadata.writer,
					narrator: metadata.narrator,
					photoData: {
						src: photo.src,
						width: photo.width,
						height: photo.height,
					},
					tracks: tracksData.map((track) => ({
						id: track.id,
						audiobookId: track.audiobookId,
						name: track.name,
						durationSeconds: track.durationSeconds,
						progress: progressMap.get(track.id) || 0,
					})),
				}

				return data
			} catch (error) {
				logger.error(`Error processing folder ${folder}:`, error)
				return null
			}
		})

		const results = await Promise.all(promises)
		const audiobooks = results.filter((book): book is Audiobook => book !== null)

		return NextResponse.json({ message: 'success', audiobooks }, { status: 200 })
	} catch (error) {
		logger.error(routeDetail, error)
		return NextResponse.json({ message: 'fail' }, { status: 500 })
	}
}

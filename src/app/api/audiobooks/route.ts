import logger from '@/library/logger'
import { getFolders, getMetadata, getPhoto, getTracks, insertTracks } from '@/library/utilities/server'
import type { Audiobook, PhotoData } from '@/types'
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
				const [metadata, photo, files] = await Promise.all([getMetadata(folder), getPhoto(folder), getTracks(folder), insertTracks(folder)])

				if (!metadata || !photo) return null

				const data: Audiobook = {
					titleDisplay: metadata.titleDisplay,
					titleSlug: metadata.titleSlug,
					writer: metadata.writer,
					narrator: metadata.narrator,
					photoData: {
						src: photo.src,
						width: photo.width,
						height: photo.height,
					},
					files,
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

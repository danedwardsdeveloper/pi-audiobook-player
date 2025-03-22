// import logger from '@/library/logger'
// import { getFolders, getMetadata, getPhoto } from '@/library/utilities/server'
// import type { Audiobook } from '@/types'
// import { type NextRequest, NextResponse } from 'next/server'

// export interface AudiobookGETresponse {
// 	message: 'success' | 'fail' | 'folderName missing'
// 	audiobook?: Audiobook
// }

// const routeDetail = 'GET api/audiobooks/[slug]: '

// export async function GET(_request: NextRequest): Promise<NextResponse<AudiobookGETresponse>> {
// 	try {

// 			try {
// 				const [metadata, photo] = await Promise.all([getMetadata(folder), getPhoto(folder)])

// 				if (!metadata || !photo) return null

// 				return {
// 					title: metadata.title || folder,
// 					writer: metadata.author || '',
// 					narrator: metadata.narrator || '',
// 					photoData: {
// 						src: photo.src,
// 						width: photo.width,
// 						height: photo.height,
// 					},
// 				}
// 			} catch (error) {
// 				logger.error(`Error processing folder ${folder}:`, error)
// 				return null
// 			}
// 		})

// 		const results = await Promise.all(promises)
// 		const audiobooks = results.filter((book): book is Audiobook => book !== null)

// 		return NextResponse.json({ message: 'success', audiobooks }, { status: 200 })
// 	} catch (error) {
// 		logger.error(routeDetail, error)
// 		return NextResponse.json({ message: 'fail' }, { status: 500 })
// 	}
// }

import type { TrackRecord } from '@/library/database/schema'
import type { Metadata, PhotoData } from '@/types'

export interface Audiobook extends Metadata {
	folderName: string
	photoData: PhotoData
	totalSeconds?: number
	listenedSeconds?: number
	tracks: TrackRecord[]
}

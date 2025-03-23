import type { Metadata, PhotoData } from '@/types'

export interface Chapter {
	name: string
	duration: string
	progress: number
}

export interface Audiobook extends Metadata {
	photoData: PhotoData
	totalSeconds?: number
	listenedSeconds?: number
	files?: string[]
	chapters?: Chapter[]
}

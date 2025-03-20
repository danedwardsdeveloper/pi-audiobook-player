import type { StaticImageData } from 'next/image'

import anneOfGreenGables from '@/images/anne.jpg'
import dracula from '@/images/dracula.jpg'
import janeEyre from '@/images/jane-eyre.jpg'

export type TitleSlug = 'dracula' | 'anne-of-green-gables' | 'jane-eyre'

interface Chapter {
	name: string
	duration: string
	progress: number
}

export interface Audiobook {
	titleDisplay: string
	titleSlug: TitleSlug
	writer: string
	performer: string
	totalSeconds: number
	listenedSeconds: number
	image: StaticImageData
	chapters: Chapter[]
}

const chapters = [
	{ name: 'Intro', duration: '12:30', progress: 1 },
	{ name: 'Chapter 1', duration: '24:45', progress: 1 },
	{ name: 'Chapter 2', duration: '32:15', progress: 1 },
	{ name: 'Chapter 3', duration: '28:10', progress: 0.55 },
	{ name: 'Chapter 4', duration: '35:20', progress: 0 },
	{ name: 'Chapter 5', duration: '40:15', progress: 0 },
	{ name: 'Chapter 6', duration: '22:30', progress: 0 },
	{ name: 'Chapter 7', duration: '15:45', progress: 0 },
	{ name: 'Chapter 8', duration: '31:20', progress: 0 },
	{ name: 'Chapter 9', duration: '27:50', progress: 0 },
	{ name: 'Chapter 10', duration: '36:15', progress: 0 },
	{ name: 'Chapter 11', duration: '29:40', progress: 0 },
	{ name: 'Chapter 12', duration: '33:25', progress: 0 },
	{ name: 'Chapter 13', duration: '25:10', progress: 0 },
	{ name: 'Chapter 14', duration: '30:50', progress: 0 },
	{ name: 'Chapter 15', duration: '18:35', progress: 0 },
	{ name: 'Chapter 16', duration: '22:20', progress: 0 },
	{ name: 'Chapter 17', duration: '28:45', progress: 0 },
	{ name: 'Chapter 18', duration: '34:30', progress: 0 },
	{ name: 'Chapter 19', duration: '26:15', progress: 0 },
	{ name: 'Chapter 20', duration: '42:10', progress: 0 },
]

export const temporaryAudiobooks: Audiobook[] = [
	{
		titleDisplay: 'Anne of Green Gables',
		titleSlug: 'anne-of-green-gables',
		writer: 'Lucy Maud Montgomery',
		performer: 'Rachael McAdams',
		totalSeconds: 28800,
		listenedSeconds: 19387,
		image: anneOfGreenGables,
		chapters,
	},
	{
		titleDisplay: 'Dracula',
		titleSlug: 'dracula',
		writer: 'Bram Stoker',
		performer: 'Alan Cumming',
		totalSeconds: 32400,
		listenedSeconds: 12960,
		image: dracula,
		chapters,
	},
	{
		titleDisplay: 'Jane Eyre',
		titleSlug: 'jane-eyre',
		writer: 'Charlotte Brontë',
		performer: 'Thandiwe Newton',
		totalSeconds: 36000,
		listenedSeconds: 5400,
		image: janeEyre,
		chapters,
	},
]

export function getAudiobookBySlug(slug: TitleSlug): Audiobook | undefined {
	return temporaryAudiobooks.find((audiobook) => audiobook.titleSlug === slug)
}

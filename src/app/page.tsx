import { formatList } from '@/library/utilities/client'
import Image, { type StaticImageData } from 'next/image'
import anneOfGreenGables from '../images/anne.jpg'
import dracula from '../images/dracula.jpg'
import janeEyre from '../images/jane-eyre.jpg'

interface Audiobook {
	titleDisplay: string
	titleSlug: string
	writer: string
	performer: string
	totalSeconds: number
	listenedSeconds: number
	image: StaticImageData
	// chapters
}

const audiobooks: Audiobook[] = [
	{
		titleDisplay: 'Anne of Green Gables',
		titleSlug: 'anne-of-green-gables',
		writer: 'Lucy Maud Montgomery',
		performer: 'Rachael McAdams',
		totalSeconds: 28800,
		listenedSeconds: 19387,
		image: anneOfGreenGables,
	},
	{
		titleDisplay: 'Dracula',
		titleSlug: 'dracula',
		writer: 'Bram Stoker',
		performer: 'Alan Cumming',
		totalSeconds: 32400,
		listenedSeconds: 12960,
		image: dracula,
	},
	{
		titleDisplay: 'Jane Eyre',
		titleSlug: 'jane-eyre',
		writer: 'Charlotte Brontë',
		performer: 'Thandiwe Newton',
		totalSeconds: 36000,
		listenedSeconds: 5400,
		image: janeEyre,
	},
]

export function AudiobookCard({ audiobook }: { audiobook: Audiobook }) {
	return (
		<div className="flex flex-col p-4 bg-slate-100 w-full rounded-xl">
			<Image src={audiobook.image} alt="" className="max-w-sm mb-4" />
			<h2 className="text-2xl font-semibold mb-1">{audiobook.titleDisplay}</h2>
			<p className="text-lg mb-2">{formatList([audiobook.writer, audiobook.performer])}</p>
			<div className="relative h-2 mb-2">
				<div className="absolute h-2 bg-orange-300 rounded-full w-56 z-10" />
				<div className="absolute h-2 bg-slate-300 rounded-full w-full" />
			</div>
			<div className="flex justify-between">
				<span className="block">Play</span>
				<span className="block">More</span>
			</div>
		</div>
	)
}

export default function Home() {
	return (
		<div className="w-full flex justify-between p-8 gap-4">
			{audiobooks.map((audiobook) => (
				<AudiobookCard key={audiobook.titleSlug} audiobook={audiobook} />
			))}
		</div>
	)
}

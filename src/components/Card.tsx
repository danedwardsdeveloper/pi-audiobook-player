import { formatList } from '@/library/utilities/browser'
import type { Audiobook } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function Card({ audiobook }: { audiobook: Audiobook }) {
	return (
		<div className="flex flex-col p-4 bg-slate-100 rounded-xl max-w-sm">
			<Image
				src={audiobook.photoData.src}
				alt=""
				width={audiobook.photoData.width}
				height={audiobook.photoData.height}
				className="w-full max-w-sm h-auto mb-4 rounded-lg"
			/>
			<h2 className="text-2xl font-semibold mb-1">{audiobook.titleDisplay}</h2>
			<p className="text-lg mb-2 truncate">{formatList([audiobook.writer, audiobook.narrator])}</p>
			<div className="relative h-2 mb-2">
				<div className="absolute h-2 bg-orange-300 rounded-full w-56 z-10" />
				<div className="absolute h-2 bg-slate-300 rounded-full w-full" />
			</div>
			<div className="flex justify-between">
				<Link href={`/audiobooks/${audiobook.titleSlug}`} className="block link-primary">
					Play
				</Link>
				<span className="block">More</span>
			</div>
		</div>
	)
}

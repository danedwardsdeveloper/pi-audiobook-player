import { formatList } from '@/library/utilities/browser'
import type { Audiobook } from '@/types'
import Image from 'next/image'
import Link from 'next/link'

export default function BookShelfCard({ audiobook }: { audiobook: Audiobook }) {
	return (
		<Link
			href={`/audiobooks/${audiobook.titleSlug}`}
			className="flex flex-col p-4 rounded-xl max-w-sm bg-orange-50 hover:bg-orange-200 hover:opacity-80 transition-all duration-500"
		>
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
		</Link>
	)
}

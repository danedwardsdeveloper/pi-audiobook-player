'use client'
import ChapterProgressBars from '@/components/ChapterProgressBars'
import PlayerControls from '@/components/PlayerControls'
import { formatList } from '@/library/utilities/browser'
import { useAudiobooks } from '@/providers/audiobook'
import Image from 'next/image'
import { notFound, useParams } from 'next/navigation'

type ResolvedParams = { audiobookSlug: string }

export default function SpecificAudiobookPage() {
	const { audiobookSlug } = useParams<ResolvedParams>()
	const { audiobooks, getAudiobookBySlug } = useAudiobooks()

	if (!audiobooks) return <h1>No audiobooks found</h1>

	const audiobook = getAudiobookBySlug(audiobookSlug)

	if (!audiobook) return notFound()

	return (
		<div className="w-full p-4">
			<div className="w-full max-w-5xl grid grid-cols-2 h-full max-h-screen p-4 gap-x-6 mx-auto bg-orange-50 rounded-xl">
				<div className="col-span-1 flex flex-col justify-between">
					<div>
						<h2 className="text-3xl font-medium mb-2 text-zinc-900">{audiobook.titleDisplay}</h2>
						<p className="text-lg text-zinc-700 mb-6">{formatList([audiobook.writer, audiobook.narrator])}</p>

						<PlayerControls />
					</div>

					<Image src={audiobook.photoData} alt="" className="w-full max-w-md mb-4 rounded-xl" />
				</div>
				<div className="col-span-1 overflow-y-auto">
					<ChapterProgressBars audiobook={audiobook} />
				</div>
			</div>
		</div>
	)
}

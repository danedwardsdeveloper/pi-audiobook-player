'use client'
import AudioControls from '@/components/AudioControls'
import ChapterProgressBars from '@/components/ChapterProgressBars'
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
		<div className="w-full h-screen flex flex-col overflow-hidden p-4">
			<div className="w-full max-w-5xl flex flex-grow overflow-hidden gap-x-6 mx-auto bg-orange-50 rounded-xl py-4 pl-4">
				<div className="max-w-sm flex flex-col justify-between overflow-y-auto">
					<div>
						<h2 className="text-3xl font-medium mb-2 text-zinc-900">{audiobook.titleDisplay}</h2>
						<p className="text-lg text-zinc-700 mb-6 truncate overflow-hidden">{formatList([audiobook.writer, audiobook.narrator])}</p>

						<AudioControls
							audiobookName={audiobook.folderName}
							track={audiobook.tracks?.[0] || { id: 1, audiobookId: 1, name: 'test', durationSeconds: 500 }}
						/>
					</div>
					<Image src={audiobook.photoData} alt="" className="h-auto rounded-xl" />
				</div>
				<div className="w-full overflow-y-auto pr-4">
					<ChapterProgressBars audiobook={audiobook} />
				</div>
			</div>
		</div>
	)
}

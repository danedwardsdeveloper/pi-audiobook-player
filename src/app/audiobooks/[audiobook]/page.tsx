import ChapterProgressBars from '@/components/ChapterProgressBars'
import PlayerControls from '@/components/PlayerControls'
import { type TitleSlug, getAudiobookBySlug } from '@/library/constants'
import { formatList } from '@/library/utilities/client'
import Image from 'next/image'
import { notFound } from 'next/navigation'

interface ResolvedParams {
	audiobook: string
}
type Params = Promise<ResolvedParams>

export default async function SpecificAudiobookPage({ params }: { params: Params }) {
	const { audiobook } = await params
	const titleSlug = audiobook as TitleSlug

	const audiobookData = getAudiobookBySlug(titleSlug)

	if (!audiobookData) return notFound()

	return (
		<div className="w-full p-4">
			<div className="w-full max-w-5xl grid grid-cols-2 h-full p-4 gap-x-6 mx-auto bg-orange-50 rounded-xl">
				<div className="col-span-1 flex flex-col justify-between">
					<div>
						<h2 className="text-3xl font-medium mb-2 text-zinc-900">{audiobookData.titleDisplay}</h2>
						<p className="text-lg text-zinc-700 mb-6">{formatList([audiobookData.writer, audiobookData.performer])}</p>

						<PlayerControls />
					</div>

					<Image src={audiobookData.image} alt="" className="w-full max-w-md mb-4 rounded-xl" />
				</div>
				<div className="col-span-1 overflow-y-auto">
					<ChapterProgressBars audiobookData={audiobookData} />
				</div>
			</div>
		</div>
	)
}

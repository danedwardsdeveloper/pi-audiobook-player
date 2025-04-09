import { useAudiobooks } from '@/providers/audiobook'
import type { Audiobook } from '@/types'

export default function ChapterProgressBars({ audiobook }: { audiobook: Audiobook }) {
	const { isLoadingAudiobooks } = useAudiobooks()

	if (isLoadingAudiobooks) return null
	if (!audiobook.tracks) return <h2>No chapters found</h2>

	return (
		<div className="max-h-screen w-full space-y-12 mb-44">
			{audiobook.tracks.map((track) => (
				<div key={track.id} className="w-full">
					<div className="flex items-center mb-2">
						<span className="text-sm font-medium text-gray-700 w-1/2">{track.name.slice(0, track.name.length - 4)}</span>

						{/* <div className="w-1/2 flex justify-center">
							{formatProgress('13', 24) && 24 < 1 && (
								<span className="text-xs font-medium text-gray-600">{formatProgress('246', 2578)}</span>
							)}
						</div> */}

						<span className="text-sm text-gray-500 w-1/2 text-right">{Math.floor(track.durationSeconds / 60)} minutes </span>
					</div>

					<div className="relative h-3 w-full bg-slate-300 rounded-full overflow-hidden">
						<div
							className={`absolute h-full rounded-full ${Math.random() > 0.5 ? 'bg-orange-400' : ''}`}
							style={{ width: `${(track.progress / track.durationSeconds) * 100}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

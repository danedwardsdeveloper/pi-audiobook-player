import type { Audiobook } from '@/library/constants'

export default async function ChapterProgressBars({ audiobookData }: { audiobookData: Audiobook }) {
	const formatProgress = (duration: string, progress: number) => {
		if (progress === 0 || progress === 1) return null

		const [minutes, seconds] = duration.split(':').map(Number)
		const totalSeconds = minutes * 60 + seconds
		const progressSeconds = Math.round(totalSeconds * progress)
		const progressMinutes = Math.floor(progressSeconds / 60)

		return `${progressMinutes}:00`
	}

	return (
		<div className="max-h-screen w-full space-y-8 mb-44">
			{audiobookData.chapters.map((chapter, index) => (
				<div key={`${chapter.name}-${index}`} className="w-full">
					<div className="flex items-center mb-1">
						<span className="text-sm font-medium text-gray-700 w-1/3">{chapter.name}</span>

						<div className="w-1/3 flex justify-center">
							{formatProgress(chapter.duration, chapter.progress) && chapter.progress < 1 && (
								<span className="text-xs font-medium text-gray-600">{formatProgress(chapter.duration, chapter.progress)}</span>
							)}
						</div>

						<span className="text-sm text-gray-500 w-1/3 text-right">{chapter.duration}</span>
					</div>

					<div className="relative h-3 w-full bg-slate-300 rounded-full overflow-hidden">
						<div
							className={`absolute h-full rounded-full ${chapter.progress > 0 ? 'bg-orange-400' : ''}`}
							style={{ width: `${chapter.progress * 100}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

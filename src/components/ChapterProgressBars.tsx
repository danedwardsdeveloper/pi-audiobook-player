import type { Audiobook } from '@/types'

export default function ChapterProgressBars({ audiobook }: { audiobook: Audiobook }) {
	const formatProgress = (duration: string, progress: number) => {
		if (progress === 0 || progress === 1) return null

		const [minutes, seconds] = duration.split(':').map(Number)
		const totalSeconds = minutes * 60 + seconds
		const progressSeconds = Math.round(totalSeconds * progress)
		const progressMinutes = Math.floor(progressSeconds / 60)

		return `${progressMinutes}:00`
	}

	if (!audiobook.files) return <h2>No chapters found</h2>

	return (
		<div className="max-h-screen w-full space-y-8 mb-44">
			{audiobook.files.map((file) => (
				<div key={file} className="w-full">
					<div className="flex items-center mb-1">
						<span className="text-sm font-medium text-gray-700 w-1/3">{file}</span>

						<div className="w-1/3 flex justify-center">
							{formatProgress('13', 24) && 24 < 1 && (
								<span className="text-xs font-medium text-gray-600">{formatProgress('246', 2578)}</span>
							)}
						</div>

						<span className="text-sm text-gray-500 w-1/3 text-right">24:12</span>
					</div>

					<div className="relative h-3 w-full bg-slate-300 rounded-full overflow-hidden">
						<div
							className={`absolute h-full rounded-full ${Math.random() > 0.5 ? 'bg-orange-400' : ''}`}
							style={{ width: `${244 * 100}%` }}
						/>
					</div>
				</div>
			))}
		</div>
	)
}

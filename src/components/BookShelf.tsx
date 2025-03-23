'use client'
import BookShelfCard from '@/components/BookShelfCard'
import { useAudiobooks } from '@/providers/audiobook'

export default function BookShelf() {
	const { audiobooks } = useAudiobooks()

	if (!audiobooks) return <div>No audiobooks found</div>

	return (
		<div className="max-w-full w-full flex justify-between p-8 gap-4">
			{audiobooks.map((audiobook) => (
				<BookShelfCard key={audiobook.titleSlug} audiobook={audiobook} />
			))}
		</div>
	)
}

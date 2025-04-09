'use client'
import BookCard from '@/components/BookCard'
import { useAudiobooks } from '@/providers/audiobook'

export default function HomePage() {
	const { audiobooks, isLoadingAudiobooks } = useAudiobooks()

	if (isLoadingAudiobooks) return null
	if (!audiobooks) return <div>No audiobooks found</div>

	return (
		<div className="max-w-full w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-8 gap-6">
			{audiobooks.map((audiobook) => (
				<BookCard key={audiobook.titleSlug} audiobook={audiobook} />
			))}
		</div>
	)
}

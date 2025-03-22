'use client'
import Card from '@/components/Card'
import { useAudiobooks } from '@/providers/audiobook'

export default function BookShelf() {
	const { audiobooks, isLoading } = useAudiobooks()

	if (isLoading) return <div>Loading...</div>
	if (!audiobooks) return <div>No image available</div>

	return (
		<div className="max-w-full w-full flex justify-between p-8 gap-4">
			{audiobooks.map((audiobook) => (
				<Card key={audiobook.titleSlug} audiobook={audiobook} />
			))}
		</div>
	)
}

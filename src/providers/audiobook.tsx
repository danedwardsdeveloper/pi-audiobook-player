'use client'
import type { AudiobooksGETresponse } from '@/app/api/audiobooks/route'
import logger from '@/library/logger'
import type { Audiobook } from '@/types'
import type React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

interface AudiobookContextType {
	audiobooks: Audiobook[] | null
	setAudiobooks: (audiobooks: Audiobook[]) => void
	getAudiobookBySlug: (slug: string) => Audiobook | null
	isLoading: boolean
}

const AudiobookContext = createContext<AudiobookContextType | undefined>(undefined)

export function AudiobookProvider({ children }: { children: React.ReactNode }) {
	const [audiobooks, setAudiobooks] = useState<Audiobook[] | null>(null)
	const [isLoading, setIsLoading] = useState(false)

	function getAudiobookBySlug(slug: string): Audiobook | null {
		if (!audiobooks) return null
		return audiobooks.find((book) => book.titleSlug === slug) || null
	}

	useEffect(() => {
		async function fetchImage() {
			try {
				const response = await fetch('/api/audiobooks', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
				})

				const { audiobooks }: AudiobooksGETresponse = await response.json()

				if (audiobooks) setAudiobooks(audiobooks)
			} catch (error) {
				logger.error('Failed to fetch image:', error)
			} finally {
				setIsLoading(false)
			}
		}

		fetchImage()
	}, [])

	const value = {
		audiobooks,
		setAudiobooks,
		getAudiobookBySlug,
		isLoading,
		setIsLoading,
	}

	return <AudiobookContext.Provider value={value}>{children}</AudiobookContext.Provider>
}

export function useAudiobooks() {
	const context = useContext(AudiobookContext)
	if (context === undefined) {
		throw new Error('useAudiobooks must be used within an AudiobookProvider')
	}
	return context
}

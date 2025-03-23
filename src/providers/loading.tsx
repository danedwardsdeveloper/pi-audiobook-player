'use client'
import logger from '@/library/logger'
import { type Dispatch, type ReactNode, type SetStateAction, createContext, useContext, useEffect, useState } from 'react'
import { useAudiobooks } from './audiobook'

interface LoadingContextType {
	isLoading: boolean
	setIsLoading: Dispatch<SetStateAction<boolean>>
}

const initialLoadingContext: LoadingContextType = {
	isLoading: true,
	setIsLoading: () => {},
}

export const LoadingContext = createContext<LoadingContextType>(initialLoadingContext)

export function LoadingProvider({ children }: { children: ReactNode }) {
	const [uiReady, setUiReady] = useState<boolean>(false)
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const { isLoadingAudiobooks } = useAudiobooks()

	useEffect(() => {
		const fontsPromise = document.fonts.ready
		const timeoutPromise = new Promise<void>((resolve) => setTimeout(() => resolve(), 800))

		Promise.all([fontsPromise, timeoutPromise])
			.then(() => setUiReady(true))
			.catch((error) => {
				logger.error('LoadingProvider error:', error)
				setUiReady(true)
			})
	}, [])

	useEffect(() => {
		if (uiReady && !isLoadingAudiobooks) {
			setIsLoading(false)
		}
	}, [uiReady, isLoadingAudiobooks])

	const contextValue: LoadingContextType = {
		isLoading,
		setIsLoading,
	}

	return <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
}

export function useLoading(): LoadingContextType {
	const context = useContext(LoadingContext)

	if (context === undefined) {
		throw new Error('useLoading must be used within a LoadingProvider')
	}

	return context
}

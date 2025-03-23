import { AudiobookProvider } from '@/providers/audiobook'
import { LoadingProvider } from '@/providers/loading'
import { UiProvider } from '@/providers/ui'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<UiProvider>
			<AudiobookProvider>
				<LoadingProvider>{children}</LoadingProvider>
			</AudiobookProvider>
		</UiProvider>
	)
}

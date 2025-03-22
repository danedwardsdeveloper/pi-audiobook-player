import { AudiobookProvider } from '@/providers/audiobook'
import { UiProvider } from '@/providers/ui'
import type { ReactNode } from 'react'

export default function Providers({ children }: { children: ReactNode }) {
	return (
		<UiProvider>
			<AudiobookProvider>{children}</AudiobookProvider>
		</UiProvider>
	)
}

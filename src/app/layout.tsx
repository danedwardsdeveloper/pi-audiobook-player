import Providers from '@/components/Providers'
import type { Metadata, Viewport } from 'next'

import './styles.tailwind.css'
import SplashScreen from '@/components/SplashScreen'
import type { ReactNode } from 'react'

export const metadata: Metadata = {
	title: 'Audiobook Player',
}

export const viewport: Viewport = {
	initialScale: 1,
	width: 'device-width',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<html lang="en-GB" suppressHydrationWarning>
			<body className="flex flex-col min-h-screen antialiased">
				<Providers>
					<SplashScreen />
					{children}
				</Providers>
			</body>
		</html>
	)
}

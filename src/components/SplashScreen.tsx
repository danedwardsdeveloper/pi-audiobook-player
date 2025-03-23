'use client'
import icon from '@/app/icon.svg'
import { mergeClasses } from '@/library/utilities/browser'
import { useLoading } from '@/providers/loading'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import Spinner from './Spinner'

export default function SplashScreen() {
	const [splashExists, setSplashExists] = useState(true)
	const { isLoading } = useLoading()

	const forceShow = false
	const showSplash = forceShow || isLoading

	useEffect(() => {
		if (showSplash) {
			setSplashExists(true)
		} else {
			const timer = setTimeout(() => {
				setSplashExists(false)
			}, 550)
			return () => clearTimeout(timer)
		}
	}, [showSplash])

	if (!splashExists) return null

	return (
		<div
			data-component="SplashScreen"
			className={mergeClasses(
				'fixed inset-0 h-full z-50 flex flex-col items-center justify-center bg-orange-50 transition-opacity duration-500',
				showSplash ? 'opacity-100' : 'pointer-events-none opacity-0',
			)}
		>
			<Spinner />
			<div className="absolute bottom-10 flex flex-col items-center gap-y-4">
				<div className="">
					<Image src={icon} alt="Audiobook Player icon" height={80} width={80} priority />
				</div>
				<h1 className="text-xl font-medium text-gray-900">Audiobook Player</h1>
			</div>
		</div>
	)
}

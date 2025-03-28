import type { ProgressInsertValues, TrackRecord } from '@/library/database/schema'
import logger from '@/library/logger'
import { useEffect, useRef, useState } from 'react'

export default function AudioControls({ audiobookName, track }: { audiobookName: string; track: TrackRecord }) {
	const audioRef = useRef(null)
	const [isPlaying, setIsPlaying] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const progressIntervalRef = useRef(null)
	const loggingIntervalRef = useRef(null)

	const trackUrl = encodeURI(`/media/${audiobookName}/${track.name}`)

	useEffect(() => {
		const audio = audioRef.current
		if (!audio) return

		audio.addEventListener('loadedmetadata', handleLoadMetadata)
		audio.addEventListener('timeupdate', handleTimeUpdate)
		audio.addEventListener('ended', handleEnded)

		return () => {
			audio.removeEventListener('loadedmetadata', handleLoadMetadata)
			audio.removeEventListener('timeupdate', handleTimeUpdate)
			audio.removeEventListener('ended', handleEnded)

			clearInterval(progressIntervalRef.current)
			clearInterval(loggingIntervalRef.current)
		}
	}, [])

	// biome-ignore lint/correctness/useExhaustiveDependencies: <run every 2 seconds when playing>
	useEffect(() => {
		if (loggingIntervalRef.current) {
			clearInterval(loggingIntervalRef.current)
			loggingIntervalRef.current = null
		}

		if (isPlaying) {
			loggingIntervalRef.current = setInterval(() => {
				const body: ProgressInsertValues = {
					trackId: track.id,
					positionSeconds: Math.round(audioRef.current?.currentTime) || 0,
				}

				logger.debug('Progress: ', body)
				// Make API call here
			}, 2000)
		}

		return () => {
			if (loggingIntervalRef.current) {
				clearInterval(loggingIntervalRef.current)
			}
		}
	}, [isPlaying])

	const handleLoadMetadata = () => {
		setDuration(audioRef.current.duration)
	}

	const handleTimeUpdate = () => {
		setCurrentTime(audioRef.current.currentTime)
	}

	const handleEnded = () => {
		setIsPlaying(false)
	}

	const togglePlayPause = () => {
		if (isPlaying) {
			audioRef.current.pause()
		} else {
			audioRef.current.play()
		}
		setIsPlaying(!isPlaying)
	}

	const handleProgressChange = (e) => {
		const newTime = e.target.value
		setCurrentTime(newTime)
		audioRef.current.currentTime = newTime
	}

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
		const seconds = Math.floor(time % 60)
		return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
	}

	return (
		<div className="w-full">
			{/* biome-ignore lint/a11y/useMediaCaption: <explanation> */}
			<audio ref={audioRef} src={trackUrl} preload="metadata" />

			<div className="flex items-center justify-between mb-4">
				<button
					type="button"
					onClick={togglePlayPause}
					className="rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors duration-300"
				>
					<svg className="size-14" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
						<title>{isPlaying ? 'Pause icon' : 'Play icon'}</title>
						{isPlaying ? (
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
						) : (
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
							/>
						)}
					</svg>
				</button>

				<div className="flex-1 mx-4">
					<input
						type="range"
						min="0"
						max={duration || 0}
						value={currentTime}
						onChange={handleProgressChange}
						className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
					/>
					<div className="flex justify-between text-sm mt-1">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>
			</div>
		</div>
	)
}

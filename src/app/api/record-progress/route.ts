import database from '@/library/database/connection'
import { type ProgressInsertValues, progress } from '@/library/database/schema'
import logger from '@/library/logger'
import { type NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	try {
		const { trackId, positionSeconds }: ProgressInsertValues = await request.json()

		if (!trackId || !positionSeconds) {
			return NextResponse.json({ message: 'body incorrect' }, { status: 400 })
		}

		await database.update(progress).set({
			trackId,
			positionSeconds,
		})

		return NextResponse.json({}, { status: 200 })
	} catch (error) {
		logger.error(error)
		return NextResponse.json({ message: 'caught error' }, { status: 500 })
	}
}

import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const audiobooks = sqliteTable('audiobooks', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
})

export type AudiobookInsertValues = typeof audiobooks.$inferInsert
export type AudiobookRow = typeof audiobooks.$inferSelect

export const tracks = sqliteTable('tracks', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	audiobookId: integer('audiobook_id')
		.references(() => audiobooks.id)
		.notNull(),
	name: text('name').notNull(),
	durationSeconds: integer('duration_seconds').notNull(),
})

export type TrackInsertValues = typeof tracks.$inferInsert
export type TrackRecord = typeof tracks.$inferSelect

export const progress = sqliteTable('progress', {
	trackId: integer('track_id')
		.references(() => tracks.id)
		.primaryKey(),
	positionSeconds: integer('position_seconds'),
})

export type ProgressInsertValues = typeof progress.$inferInsert
export type ProgressRecord = typeof tracks.$inferSelect

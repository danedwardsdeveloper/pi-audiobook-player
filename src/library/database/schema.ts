import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const tracks = sqliteTable('tracks', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	name: text('name').notNull().unique(),
})

export type TrackInsertValues = typeof tracks.$inferInsert
export type Track = typeof tracks.$inferSelect

export const playHistory = sqliteTable('play_history', {
	id: integer('id').primaryKey({ autoIncrement: true }),
	trackId: integer('trackId').references(() => tracks.id),
})

/*


tracks


play_history








*/

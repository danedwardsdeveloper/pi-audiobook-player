import { integer, sqliteTable } from 'drizzle-orm/sqlite-core'

export const audiobooks = sqliteTable('audiobooks', {
	id: integer('id').primaryKey({ autoIncrement: true }),
})

/*


tracks


play_history








*/

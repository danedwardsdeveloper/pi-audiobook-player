import Database from 'better-sqlite3'
import { drizzle } from 'drizzle-orm/better-sqlite3'
import logger from '../logger'

const sqlite = new Database('sqlite.db')

const database = drizzle(sqlite)

export function testDatabaseConnection() {
	try {
		database.run('select 1')
		logger.success('Successfully connected to database')
	} catch (error) {
		logger.error('Failed to connect to database: ', error)
	}
}

export default database

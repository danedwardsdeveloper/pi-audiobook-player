import { testDatabaseConnection } from './library/database/connection'

export function register() {
	testDatabaseConnection()
}

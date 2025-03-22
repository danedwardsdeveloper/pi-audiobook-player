import type { Config } from 'drizzle-kit'

export default {
	dialect: 'sqlite',
	schema: './src/library/database/schema.ts',
	out: './drizzle',
	dbCredentials: {
		url: 'file:sqlite.db',
	},
	verbose: true,
	strict: true,
} satisfies Config

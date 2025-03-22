import fs from 'node:fs'
import { promisify } from 'node:util'

export const readDirectory = promisify(fs.readdir)
export const getStatistics = promisify(fs.stat)
export const readFile = promisify(fs.readFile)

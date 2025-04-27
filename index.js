import getArgs from './helpers/args.js'
import { printError, printHelp, printSuccess } from './services/log.service.js'
import { saveKeyValues } from './services/storage.service.js'

const saveToken = async token => {
	try {
		await saveKeyValues('token', token)
		printSuccess('Token successfully saved')
	} catch (error) {
		printError(error.message)
	}
}
const startCLI = () => {
	const args = getArgs(process.argv)

	if (args.h) {
		printHelp()
	}
	if (args.s) {
		// save
	}
	if (args.t) {
		saveToken(args.t)
	}
}

startCLI()

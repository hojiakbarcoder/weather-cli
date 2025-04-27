import getArgs from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import { printError, printHelp, printSuccess } from './services/log.service.js'
import { saveKeyValues, TOKEN_DICTIONARY } from './services/storage.service.js'

const saveToken = async token => {
	if (!token.length) {
		printError('Token does not exist')
		return
	}
	try {
		await saveKeyValues(TOKEN_DICTIONARY.token, token)
		printSuccess('Token successfully saved')
	} catch (error) {
		printError(error.message)
	}
}

const getForcast = async () => {
	try {
		const response = await getWeather(process.env.CITY ?? 'Uzbekistan')
		console.log(response)
	} catch (error) {
		if (error?.response?.status == 404) {
			printError('City not found')
		} else if (error?.response?.status == 401) {
			printError('Invalid Token')
		} else {
			printError(error.message)
		}
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
	getForcast()
}

startCLI()

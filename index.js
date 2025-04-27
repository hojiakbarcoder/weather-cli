import getArgs from './helpers/args.js'
import { getWeather } from './services/api.service.js'
import {
	printError,
	printHelp,
	printSuccess,
	printWeather,
} from './services/log.service.js'
import {
	getKeyValue,
	saveKeyValues,
	TOKEN_DICTIONARY,
} from './services/storage.service.js'

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
const saveCity = async city => {
	if (!city.length) {
		printError('City does not exist')
		return
	}
	try {
		await saveKeyValues(TOKEN_DICTIONARY.city, city)
		printSuccess('City successfully saved')
	} catch (error) {
		printError(error.message)
	}
}

const getForcast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city))
		const response = await getWeather(city)
		printWeather(response)
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
		return saveCity(args.s)
	}
	if (args.t) {
		return saveToken(args.t)
	}
	return getForcast()
}

startCLI()

import chalk from 'chalk'
import dedent from 'dedent-js'

const printError = error => {
	console.log(chalk.bgRed('Error') + ' ' + error)
}

const printSuccess = message => {
	console.log(chalk.bgGreen('Success') + ' ' + message)
}

const printHelp = () => {
	console.log(dedent`${chalk.bgGray('HELP')}
		-s [CITY] to install city
		-h for help
		-t [API_TOKEN] to save token
		`)
}

const printWeather = res => {
	console.log(dedent`
		${chalk.bgYellowBright('WEATHER')} City Weather ${res.name}
		${res.weather[0].description}
		Temperature: ${res.main.temp}
		Humidity: ${res.main.humidity}%
		`)
}

export { printError, printHelp, printSuccess, printWeather }

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

export { printError, printHelp, printSuccess }

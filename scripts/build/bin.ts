import { build } from "./index"
import { config } from "../../config"

build()
	.then(() => {
		console.log(`${config.name} has been built!`)
		process.exit(0)
	})
	.catch(error => {
		console.log(`${config.name} build failed..`)
		if (error) {
			console.error(error.stack || error.toString())
		}
		process.exit(1)
	})
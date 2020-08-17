import { clean } from "./index"
import { config } from "../../config"

clean()
	.then(() => {
		console.log(`${config.name} has been cleaned!`)
		process.exit(0)
	})
	.catch(error => {
		console.log(`${config.name} clean failed..`)
		if (error) {
			console.error(error.stack || error.toString())
		}
		process.exit(1)
	})
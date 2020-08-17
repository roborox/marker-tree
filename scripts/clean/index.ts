import rimraf from "rimraf"
import { config } from "../../config"

type GlobPattern = string & {
	isGlobPattern: true
}

const rr = (pattern: GlobPattern) => {
	return new Promise((resolve, reject) => rimraf(pattern, {}, (err) => {
		if (err) {
			return reject(err)
		}
		resolve(true)
	}))
}

export function clean() {
	console.log(`Cleaning '${config.name}'\n`)

	return Promise.resolve(true)
		.then(() => rr(config.paths.esmDir as GlobPattern))
		.then(() => rr(config.paths.declarationsDir as GlobPattern))
}
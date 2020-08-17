import { createStep } from "../utils/create-step"
import { copyByExtensions } from "../utils/copy-by-extensions"
import { runShell } from "../utils/run-shell"
import { config } from "../../config"
import { clean } from "../clean"

const copyTypes = createStep("Copy types", () => {
	return copyByExtensions(config.paths.declarationsDir, config.paths.esmDir, [".d.ts"])
})

const buildESM = createStep("ESM", async () => {
	await runShell("tsc -d --emitDeclarationOnly --outDir declarations")
	await runShell(`yarn babel ${config.paths.sourceDir} -x .ts,.tsx --ignore src/**/*.spec.ts  --out-dir ${config.paths.esmDir}`)
})


export function build() {
	console.log(`Package '${config.name}': Building targets: ESM\n`)

	return Promise.resolve(true)
		.then(clean)
		.then(buildESM)
		.then(copyTypes)
}
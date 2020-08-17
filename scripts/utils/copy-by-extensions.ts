import { runShell } from "./run-shell"

export function copyByExtensions(from: string, to: string, extensions: string[]) {
	return extensions.reduce((prev, curr) => {
		return prev.then(() => {
			return runShell(`cpx "${from}/**/*${curr}" ${to}`)
		})
	}, Promise.resolve())
}
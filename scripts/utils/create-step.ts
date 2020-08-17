export function createStep(name: string, action: () => Promise<void> | void) {
	return async () => {
		console.log("Building: " + name)
		await action()
		console.log("Built: " + name)
	}
}
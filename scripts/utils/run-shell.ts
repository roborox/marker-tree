import execa from "execa"

export const runShell = (cmd: string): Promise<any> => execa(cmd, {
	stdio: ["pipe", "pipe", "inherit"],
	shell: true,
})
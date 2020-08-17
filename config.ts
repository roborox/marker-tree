import path from "path"

const rootDir = path.resolve(__dirname)
const sourceDir = path.join(rootDir, "src")

export const config = {
	name: "marker-tree",
	paths: {
		sourceDir,
		rootDir,
		declarationsDir: path.join(rootDir, "declarations"),
		esmDir: path.join(rootDir, "esm"),
		entryFile: path.join(sourceDir, "index.ts"),
	},
}

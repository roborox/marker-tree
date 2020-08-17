import type { ComplexSchema, Schema, Marker, InferMarkerType } from "./types"

/**
 * @example
 * const s = complex({
 *  subValue1: simple,
 *  subValue2: simple,
 *  simpleItems: simpleItems,
 * })
 * const root = s("root")
 * <Input {...root.subValue2.nodeProps} />
 */

export const simple: Schema<Marker> = value => ({
	value,
	selector: `[data-marker='${value}']`,
	nodeProps: {
		"data-marker": value,
	},
})

/**
 * @example
 * const s = complex({
 *  child1: simple,
 *  child2: part,
 *  items: byKey(complex({
 *   id: simple,
 *   actions: simple,
 *  })),
 * })
 * const root = s("root")
 * <Input {...root.items("some-id")} />
 */

export function complex<C extends Record<string, Schema<any>>>(config: C): ComplexSchema<C> {
	return (value: string) => {
		const result = simple(value) as Marker & { [P in keyof C]: InferMarkerType<C[P]> }
		for (const key of Object.keys(config)) {
			const child = config[key]
			Object.defineProperty(result, key, {
				get: () => child(value + "/" + key),
			})
		}
		return result
	}
}

export function byKey<S extends Schema<any>>(schema: S) {
	return (value: string) => {
		const result = ((key: string) => schema(value + "/" + key)) as Marker & ((key: string) => InferMarkerType<S>)
		result.value = value
		result.selector = `[data-marker='${value}']`
		result.nodeProps = {
			"data-marker": value,
		}
		return result
	}
}

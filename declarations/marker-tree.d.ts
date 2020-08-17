import type { ComplexSchema, Schema, Marker, InferMarkerType } from "./types";
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
export declare const simple: Schema<Marker>;
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
export declare function complex<C extends Record<string, Schema<any>>>(config: C): ComplexSchema<C>;
export declare function byKey<S extends Schema<any>>(schema: S): (value: string) => Marker & ((key: string) => InferMarkerType<S>);

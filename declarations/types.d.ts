export declare type Marker = {
    value: string;
    selector: string;
    nodeProps: {
        "data-marker": string;
    };
};
export declare type Schema<M extends Marker> = (value: string) => M;
export declare type InferMarkerType<S extends Schema<any>> = S extends Schema<infer M> ? M : never;
export declare type ComplexSchema<C extends Record<string, Schema<any>>> = Schema<Marker & {
    [P in keyof C]: InferMarkerType<C[P]>;
}>;

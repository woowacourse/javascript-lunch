export type ObjectToUnion<T extends Record<PropertyKey, unknown>> = T[keyof T];

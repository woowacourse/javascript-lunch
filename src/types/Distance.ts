import { DISTANCE } from '../constants/distance';

type Union<T> = T[keyof T];

export type Distance = Union<typeof DISTANCE>;

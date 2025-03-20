export const TAB = Object.freeze({
  ALL: 'all',
  FAVORITE: 'favorite',
} as const);

export type Tab = (typeof TAB)[keyof typeof TAB];

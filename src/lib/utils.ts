import { concat, flat, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from './types';

export function html(strings: TemplateStringsArray, ...values: any[]): HTMLType {
  return pipe(
    zip(strings, concat(values, [''])),
    flat,
    reduce((a, b) => a + b),
  );
}

export function generateId() {
  return Math.random().toString(16).slice(2);
}

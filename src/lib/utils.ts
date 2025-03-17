import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';
import type { HTMLType } from './types';

const escape = (str: string) =>
  String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function html(strings: TemplateStringsArray, ...values: any[]) {
  return pipe(
    zip(
      strings,
      concat(
        map((value) => escape(value), values),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  ) as HTMLType;
}

export function generateId() {
  return Math.random().toString(16).slice(2);
}

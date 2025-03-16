import { concat, flat, map, pipe, reduce, zip } from '@fxts/core';
import { Component } from '../components/core/index';
import type { HTMLType } from './types';

export function html(strings: TemplateStringsArray, ...values: any[]): HTMLType {
  return pipe(
    zip(
      strings,
      concat(
        map((value) => (value instanceof Component ? value.template() : value), values),
        [''],
      ),
    ),
    flat,
    reduce((a, b) => a + b),
  );
}

export function generateId() {
  return Math.random().toString(16).slice(2);
}

import { JSX } from 'react';

type ExtractFirstGeneric<T> = T extends React.DetailedHTMLProps<infer A, unknown> ? A : never;

export type AttributeWithoutChildren<T extends keyof JSX.IntrinsicElements> = Omit<
  ExtractFirstGeneric<JSX.IntrinsicElements[T]>,
  'children'
>;

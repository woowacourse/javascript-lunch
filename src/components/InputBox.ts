import { SelectOptions } from '../types/types';
import { AttributeWithoutChildren } from '../types/typeUtils';
import createDOMElement from '../util/createDomElement';

function Root({ label, input, caption }: { label: HTMLElement; input: HTMLElement; caption?: HTMLElement }) {
  return createDOMElement({
    tag: 'div',
    class: 'form-item form-item--required',
    children: [label, input, caption],
  });
}

interface LabelProps extends AttributeWithoutChildren<'label'> {
  text: string;
  textContent?: string;
}

function Label({ text, className, ...attribute }: LabelProps) {
  return createDOMElement({
    tag: 'label',
    textContent: text,
    class: `${className} text-caption`,
    ...attribute,
  });
}

interface SelectProps extends AttributeWithoutChildren<'select'> {
  options: SelectOptions;
}

function Select({ options, ...attribute }: SelectProps) {
  return createDOMElement({
    tag: 'select',
    children: options.map(({ value, option }) =>
      createDOMElement({
        tag: 'option',
        value: value,
        textContent: option,
      }),
    ),
    ...attribute,
  });
}

function Input({ ...attribute }: AttributeWithoutChildren<'input'>) {
  return createDOMElement({
    tag: 'input',
    ...attribute,
  });
}

function TextArea({ ...attribute }: AttributeWithoutChildren<'textarea'>) {
  return createDOMElement({
    tag: 'textarea',
    ...attribute,
  });
}

function Caption({ text }: { text: string }) {
  return createDOMElement({
    tag: 'span',
    class: 'help-text text-caption',
    textContent: text,
  });
}

export const InputBox = { Root, Label, Select, Input, TextArea, Caption };

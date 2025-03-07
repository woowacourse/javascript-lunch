import createDOMElement from '../util/createDomElement.js';

function Root({ label, input, caption }) {
  return createDOMElement({
    tag: 'div',
    class: ['form-item', 'form-item--required'],
    children: [label, input, caption].filter(Boolean)
  });
}

function Label({ text, className, ...attribute }) {
  return createDOMElement({
    tag: 'label',
    textContent: text,
    class: [className, 'text-caption'].filter(Boolean),
    ...attribute
  });
}

function Select({ options, ...attribute }) {
  return createDOMElement({
    tag: 'select',
    children: options.map(({ value, option }) =>
      createDOMElement({
        tag: 'option',
        value: value,
        textContent: option
      })
    ),
    ...attribute
  });
}

function Input({ ...attribute }) {
  return createDOMElement({
    tag: 'input',
    ...attribute
  });
}

function TextArea({ ...attribute }) {
  return createDOMElement({
    tag: 'textarea',
    ...attribute
  });
}

function Caption({ text }) {
  return createDOMElement({
    tag: 'span',
    class: ['help-text', 'text-caption'],
    textContent: text
  });
}

export const InputBox = { Root, Label, Select, Input, Select, TextArea, Caption };

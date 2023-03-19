import { registerdCustomElementNames } from './decorators';

export const allCustomElementsDefined = () =>
  Promise.all(
    registerdCustomElementNames.map((customElementName) =>
      customElements.whenDefined(customElementName),
    ),
  );

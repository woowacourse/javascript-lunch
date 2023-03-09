import { registerdCustomElementNames } from './decorators';

export const waitForCustomElementsDefined = () =>
  Promise.all(
    registerdCustomElementNames.map((customElementName) =>
      customElements.whenDefined(customElementName),
    ),
  );

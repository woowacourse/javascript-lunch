export const registerdCustomElementNames: string[] = [];

export function define(name: string) {
  registerdCustomElementNames.push(name);
  return function defineCustomElement(customElementClass: CustomElementConstructor) {
    customElements.define(name, customElementClass);
  };
}

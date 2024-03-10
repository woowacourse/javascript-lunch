export const getDeepCopiedArray = <T>(array: T): T =>
  JSON.parse(JSON.stringify(array)) as T;

export const setObjectAttribute = (attributes: Object, el: HTMLElement) => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'required' && 'required' in el) {
      el.required = true;
      return;
    }

    el.setAttribute(key, value);
  });

  return el;
};

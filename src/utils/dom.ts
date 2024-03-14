export const $ = <T extends string>(
  selector: T,
  target = document
): HTMLElement => {
  const targetElement = target.querySelector(selector);

  if (!targetElement) {
    throw new Error(
      `Selector '${selector}'에 해당하는 요소를 찾을 수 없습니다.`
    );
  }

  return targetElement as HTMLElement;
};

export const $$ = <T extends string>(selector: T, target = document) => {
  const targetElements = target.querySelectorAll(selector);

  if (!targetElements) {
    throw new Error(
      `Selector '${selector}'에 해당하는 요소를 찾을 수 없습니다.`
    );
  }

  return targetElements;
};

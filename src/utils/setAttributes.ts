function setAttributes(
  element: Element,
  attributes: Record<string, string | number | boolean | (() => void)> | undefined
): void {
  if (attributes === undefined) {
    return;
  }

  Object.entries(attributes).forEach(([name, value]) => {
    if (value !== undefined) {
      if (typeof value === 'function') {
        (element as any)[name] = value;
      } else {
        // 함수가 아닌 경우, 기존처럼 setAttribute를 사용합니다.
        element.setAttribute(name, String(value));
      }
    }
  });
}

export default setAttributes;

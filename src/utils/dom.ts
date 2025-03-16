interface Props<K extends keyof HTMLElementTagNameMap>
  extends Omit<Partial<HTMLElementTagNameMap[K]>, "className"> {
  className?: string | string[];
}
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  props: Props<K> = {}
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag) as HTMLElementTagNameMap[K];

  Object.entries(props).forEach(([key, value]) => {
    if (key === "className") {
      if (Array.isArray(value)) {
        element.classList.add(...value);
      } else if (typeof value === "string") {
        element.classList.add(value);
      }
      return;
    }

    if (key in element) (element as any)[key] = value;
  });

  return element;
}

export function createElementsFragment(
  elements: HTMLElement[]
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  fragment.append(...elements);
  return fragment;
}

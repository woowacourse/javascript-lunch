export default function findParentBox(
  element: HTMLElement | null,
  tagName: string,
): HTMLElement | null {
  while (element) {
    if (element.tagName === tagName) {
      return element as HTMLElement;
    }
    element = element.parentElement;
  }
  return null;
}

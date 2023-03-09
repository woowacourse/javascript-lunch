export const $ = (element: string) => document.querySelector(element);

export const BottomSheetForm = {
  showClose(elem: HTMLElement, message: string) {
    elem?.classList.toggle(message);
  },
};

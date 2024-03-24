type SwapClassesProps = {
  element: HTMLElement | Element;
  classA: string;
  classB: string;
};

export const swapClasses = ({ element, classA, classB }: SwapClassesProps) => {
  if (element.classList.contains(classA)) {
    element.classList.remove(classA);
    element.classList.add(classB);
  } else if (element.classList.contains(classB)) {
    element.classList.remove(classB);
    element.classList.add(classA);
  }
};

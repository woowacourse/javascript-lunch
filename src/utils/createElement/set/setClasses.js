const setClasses = (element, classNames) => {
  if (!classNames || classNames.length === 0) return;

  if (typeof classNames === "string") {
    classNames = classNames.split(" ");
  }

  element.classList.add(...classNames.filter((className) => className));
};

export default setClasses;

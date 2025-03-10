const setClasses = (element, classes) => {
  if (typeof classes === "string") {
    classes = classes.split(" ");
  }

  if (classes.length > 0) {
    element.classList.add(...classes);
  }
};

export default setClasses;

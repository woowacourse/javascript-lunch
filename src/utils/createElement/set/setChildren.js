const setChildren = (element, children) => {
  element.append(...Array.from(children));
};

export default setChildren;

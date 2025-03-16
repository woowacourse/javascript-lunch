const setChildren = (element, children) => {
  element.append(...Array.from(children).filter(Boolean));
};

export default setChildren;

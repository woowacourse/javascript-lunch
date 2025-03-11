const setChildren = (element, children) => {
  children.forEach((child) => {
    if (child) element.appendChild(child);
  });
};

export default setChildren;

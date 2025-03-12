const setAttributes = (element, attributes) => {
  Object.entries(attributes).forEach(([key, value]) => {
    if (value || value === "") element.setAttribute(key, value);
  });
};

export default setAttributes;

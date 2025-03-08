const $select = ({attribute, options}) => {
  const select = document.createElement("select");
  Object.assign(select, attribute);

  Object.keys(options).forEach((selectName) => {
    const option = document.createElement("option");
    option.value = options[selectName];
    option.textContent = selectName;
    select.appendChild(option);
  });

  return select;
};

export default $select;

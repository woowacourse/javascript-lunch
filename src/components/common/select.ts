type SelectProps = {
  attribute?: Partial<HTMLInputElement>;
  options: Record<string, string | number>;
};

const $select = ({
  attribute = {},
  options,
}: SelectProps): HTMLSelectElement => {
  const select = document.createElement("select");
  Object.assign(select, attribute);

  Object.keys(options).forEach((selectName) => {
    const option = document.createElement("option");
    option.value = String(options[selectName]);
    option.textContent = selectName;
    select.appendChild(option);
  });

  return select;
};

export default $select;

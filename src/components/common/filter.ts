type FilterProps = {
  attribute?: Partial<HTMLInputElement>;
  options: Record<string, string | number>;
};

const $filter = ({
  attribute = {},
  options,
}: FilterProps): HTMLSelectElement => {
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

export default $filter;

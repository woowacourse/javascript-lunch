import createElement from "../utils/createElement";

const Select = ({ name = "", id = "", classList = [], options }) => {
  const select = createElement({
    tag: "select",
    name,
    id,
    classList,
  });

  select.innerHTML = `
  ${Object.keys(options)
    .map((key) => `<option value="${key}">${options[key]}</option>`)
    .join("")}`;

  return select;
};

export default Select;

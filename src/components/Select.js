import createElement from "../utils/createElement";

const Select = ({ tag, name = "", id = "", classList = [], options }) => {
  const select = createElement({
    tag,
    name,
    id,
    classList,
  });

  select.innerHTML = `${options
    .map((option) => `<option value="${option}">${option}</option>`)
    .join("")}`;

  return select;
};

export default Select;

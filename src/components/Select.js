import createElement from "../utils/createElement";

// 카테고리 필터 & 정렬 드롭박스
const Select = ({
  name = "",
  id = "",
  classList = [],
  options,
  handleChange,
}) => {
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

  select.addEventListener("change", handleChange);

  return select;
};

export default Select;

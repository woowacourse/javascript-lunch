const CATEGORY_OPTIONS = [
  "전체",
  "한식",
  "중식",
  "일식",
  "양식",
  "아시안",
  "기타",
];
const SORTING_OPTIONS = ["이름순", "거리순"];

const getSortValue = (option) => {
  if (option === "이름순") {
    return "name";
  }
  return "distance";
};

const CategoryAndFilterOptionInput = (type = "category") => {
  const options = type === "category" ? CATEGORY_OPTIONS : SORTING_OPTIONS;
  const select = document.createElement("select");
  Object.assign(select, {
    name: type,
    id: `${type}-filter`,
    className: "restaurant-filter",
  });

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    Object.assign(optionElement, {
      value: type === "category" ? option : getSortValue(option),
      textContent: option,
    });
    select.appendChild(optionElement);
  });

  return select;
};

export default CategoryAndFilterOptionInput;

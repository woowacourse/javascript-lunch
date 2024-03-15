export const createDropdown = () => {
  const categoryDropdown = document.createElement("select");
  categoryDropdown.classList.add("restaurant-filter");
  categoryDropdown.setAttribute("name", "category");
  categoryDropdown.setAttribute("id", "category-filter");

  const categoryOptions = [
    "전체",
    "한식",
    "중식",
    "일식",
    "양식",
    "아시안",
    "기타",
  ].map((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    return option;
  });
  categoryOptions.forEach((option) => {
    categoryDropdown.appendChild(option);
  });

  return categoryDropdown;
};

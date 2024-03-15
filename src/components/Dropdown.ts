interface Props {
  items: string[];
  onSelect?: (value: string) => void;
}

export const createDropdown = ({ items, onSelect }: Props) => {
  const categoryDropdown = document.createElement("select");
  categoryDropdown.classList.add("restaurant-filter");

  const categoryOptions = [...items].map((category) => {
    const option = document.createElement("option");
    option.textContent = category;
    return option;
  });

  categoryOptions.forEach((option) => {
    categoryDropdown.appendChild(option);
  });

  if (onSelect) {
    categoryDropdown.addEventListener("change", (event) =>
      onSelect((event.target as HTMLSelectElement).value)
    );
  }

  return categoryDropdown;
};

import "./restaurantFilter.css";

export default class RestaurantFilter {
  #options;
  #type;
  #onChange;

  constructor(options, type, onChange) {
    this.#options = options;
    this.#type = type;
    this.#onChange = onChange;
  }

  render() {
    const $select = document.createElement("select");
    $select.className = "restaurant-filter";
    $select.id = `${this.#type}-filter`;
    $select.setAttribute("name", this.#type);

    const $defaultOption = document.createElement("option");
    $defaultOption.value = this.#options[0];
    $defaultOption.textContent = this.#options[0];

    $select.appendChild($defaultOption);

    this.#options.slice(1).forEach((option) => {
      const $option = document.createElement("option");
      $option.value = option;
      $option.textContent = option;
      $select.appendChild($option);
    });

    $select.addEventListener("change", this.#onChange);

    return $select;
  }
}

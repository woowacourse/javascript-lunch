class StatusController {
  static getFilterSelection() {
    const categoryFilter = document.getElementById(
      "category-filter"
    ) as HTMLSelectElement;

    const sortStandardFilter = document.getElementById(
      "sort-standard-filter"
    ) as HTMLSelectElement;

    return {
      category: (categoryFilter.value as CategoryWithEntire) ?? "전체",
      sortStandard: (sortStandardFilter.value as SortStandard) ?? "이름순",
    };
  }

  static getRestaurantFromPreview(preview: HTMLElement): Restaurant {
    const category = (
      preview.querySelector(".category-icon") as HTMLImageElement
    )?.alt as Category;
    const name = preview.querySelector(".restaurant__name")
      ?.textContent as string;

    const distanceString = preview.querySelector(".restaurant__distance")
      ?.textContent as string;
    const distance = this.#getNumberInSentence(distanceString) as Distance;

    const description = preview.querySelector(".restaurant__description")
      ?.textContent as string;
    const url = preview.querySelector(".restaurant__link")
      ?.textContent as string;

    return { category, name, distance, description, url };
  }

  static #getNumberInSentence(string: string): Number {
    const regex = /[^0-9]/g;
    const result = string.replace(regex, "");
    return Number(result);
  }
}

export default StatusController;

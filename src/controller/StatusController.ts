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
}

export default StatusController;

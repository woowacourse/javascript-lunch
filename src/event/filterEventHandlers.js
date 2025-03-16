function CategorySortFilterEventHandler(categoryFilterElement, sortingFilterElement, updateListView) {
  categoryFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });

  sortingFilterElement.addEventListener("change", () => {
    updateListView(categoryFilterElement.value, sortingFilterElement.value);
  });
}

export default CategorySortFilterEventHandler;

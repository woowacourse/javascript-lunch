class SelectedFilterValue {
    #category
    #sorting

    constructor() {
        this.#category = "한식";
        this.#sorting = "이름순";
    }

    updateSelectedFilterValue(id, value) {
        if(id === "category-filter") {
            this.#category = value;
        }

        if(id === "sorting-filter") {
            this.#sorting = value;
        }
    }

    getSelectedFilterCategoryValue() {
        return this.#category;
    }

    getSelectedFilterCategorySorting() {
        return this.#sorting;
    }
}

const selectedFilterValue = new SelectedFilterValue();
export default selectedFilterValue;

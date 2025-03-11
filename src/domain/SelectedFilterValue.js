class SelectedFilterValue {
    #category
    #sorting

    constructor() {
        this.#category = "한식";
        this.#sorting = "이름순";
    }

    updateSelectedFilterValue(value, name) {
        if(name === "category") {
            this.#category = value;
        }

        if(name === "sorting") {
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

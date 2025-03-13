class SelectedFilterValue {
    #category
    #sorting
    #isWishList

    constructor() {
        this.#category = "한식";
        this.#sorting = "이름순";
        this.#isWishList = false;
    }

    updateSelectedFilterValue(id, value) {
        if(id === "category-filter") {
            this.#category = value;
        }

        if(id === "sorting-filter") {
            this.#sorting = value;
        }

        if(id === "restaurant-star") {
            this.#isWishList = value
        }
    }

    getSelectedFilterCategoryValue() {
        return this.#category;
    }

    getSelectedFilterCategorySorting() {
        return this.#sorting;
    }

    getIsWishList() {
        return this.#isWishList;
    }
}

const selectedFilterValue = new SelectedFilterValue();
export default selectedFilterValue;

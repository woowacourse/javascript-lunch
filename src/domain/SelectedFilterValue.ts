class SelectedFilterValue {
    #category: string;
    #sorting: string;
    #isWishList: boolean;

    constructor() {
        this.#category = "한식";
        this.#sorting = "이름순";
        this.#isWishList = false;
    }

    updateSelectedFilterValue(id: string, value: string | boolean): void {
        if (id === "category-filter") {
            this.#category = value as string;
        }

        if (id === "sorting-filter") {
            this.#sorting = value as string;
        }

        if (id === "restaurant-tab") {
            this.#isWishList = value as boolean;
        }
    }

    getSelectedFilterCategoryValue(): string {
        return this.#category;
    }

    getSelectedFilterSortingValue(): string {
        return this.#sorting;
    }

    getIsWishList(): boolean {
        return this.#isWishList;
    }
}

const selectedFilterValue = new SelectedFilterValue();
export default selectedFilterValue;

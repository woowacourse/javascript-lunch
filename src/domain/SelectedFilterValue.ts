class SelectedFilterValue {
    #category: string;
    #sorting: string;
    #isWishList: boolean;

    constructor() {
        this.#category = "전체";
        this.#sorting = "이름순";
        this.#isWishList = false;
    }

    updateSelectedFilterValue(id: string, value: string | boolean): void {
        if (id === "category-filter" && typeof value === "string") {
            this.#category = value;
        }

        if (id === "sorting-filter" && typeof value === "string") {
            this.#sorting = value;
        }

        if (id === "restaurant-tab" && typeof value === "boolean") {
            this.#isWishList = value;
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

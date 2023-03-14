/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * 커스텀 함수들은 이곳에 정의되어야 합니다.
     * @example func(variable: type): Chainable<Element>
     */
    openAddModal(): Chainable<Element>;

    closeAddModal(): Chainable<Element>;

    writeRestaurantAddForm(
      input: TestRestaurantFormInfoType
    ): Chainable<Element>;

    checkRestaurantItem(
      index: number,
      info: TestRestaurantInfoType
    ): Chainable<Element>;
  }
}

import LOCALSTORAGE_SAMPLE_DATA from "../utils/localStorageSampleData";

const validateFavoriteList = (favoriteNames) => {
  cy.get('nav label')
  .contains('자주 가는 음식점')
  .click();

  cy.get('.restaurant-list-container')
    .children()
    .should('have.length', favoriteNames.length)
    .each((element, index) => {
      (cy.wrap(element))
        .should('contain', favoriteNames[index]);
    });
};

describe('자주 가는 음식점 테스트', () => {
  it('자주 가는 음식점 클릭 시 표시', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');

    validateFavoriteList(['늘봄막국수', '바나프레소']);
  });

  it('별표 클릭 시 자주 가는 음식점에서 제거', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');

    cy.get('.restaurant')
      .contains('바나프레소')
      .parent()
      .parent()
      .children()
      .last()
      .click();

    validateFavoriteList(['늘봄막국수']);
  });
});

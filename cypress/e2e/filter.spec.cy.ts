import LOCALSTORAGE_SAMPLE_DATA from "../utils/localStorageSampleData";

const validateOrder = (answer) => {
  cy.get('.restaurant-list-container')
    .children()
    .should('have.length', answer.length)
    .each((element, index) => {
      (cy.wrap(element))
        .should('contain', answer[index]);
    });
};

describe('필터 테스트', () => {
  it('한식 카테고리, 이름순 정렬 테스트', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');

    cy.get('#category-filter')
      .select('한식');

    validateOrder(["김밥지옥", "늘봄막국수", "천국김밥"]);
  });

  it('한식 카테고리, 거리순 정렬 테스트', () => {
    window.localStorage.setItem("restaurants", LOCALSTORAGE_SAMPLE_DATA);
    cy.visit('http://localhost:8080');

    cy.get('#category-filter')
      .select('한식');
    
    cy.get('#sorting-filter')
      .select('거리순');

    validateOrder(["김밥지옥", "천국김밥", "늘봄막국수"]);
  });
});

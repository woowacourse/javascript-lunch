describe('음식점 삭제 테스트', () => {
  beforeEach(() => {
    cy.visit('');

    cy.fixture('dummyRestaurant').then((restaurants) => {
      restaurants.forEach((restaurant) => {
        cy.get('[data-cy="add-button"]').click();

        cy.fillOutRestaurantForm(restaurant);
        cy.get('[data-cy="submit"]').click();
      });
    });

    cy.get('[data-cy="category-select"]').select('전체');
    cy.get('[data-cy="restaurant-list"] li:first-child .restaurant__info').click();
  });

  it('음식점 리스트의 아이템을 클릭하면 상세 정보를 표시하는 모달이 나타난다.', () => {
    cy.get('[data-cy="modal-container"]').should('be.visible');
    cy.get('[data-cy="modal-container"]').find('app-restaurant-detail').should('exist');
  });

  it('상세 정보 모달의 삭제하기 버튼을 누르면 모달이 닫히고 아이템이 삭제된다.', () => {
    cy.get('[data-cy="delete-button"').click();
    cy.get('[data-cy="restaurant-list"]').children().should('have.length', 1);
  });
});

import { addRestaurant } from '../util/addRestaurant';

describe('음식점 상세 정보 확인 및 삭제 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    addRestaurant({ category: 'japanese', name: '재영이', distance: 2 });
    addRestaurant({ category: 'chinese', name: '재오재오재오', distance: 1 });

    cy.reload();
  });

  it('음식점을 클릭하면 모달이 open 되면서 상세 정보를 확인할 수 있다.', () => {
    cy.get('.restaurant').should('exist').first().click({ force: true });
    cy.get('.modal').should('have.class', 'modal--open');
  });

  it('상세 모달에서 삭제하기 버튼을 클릭하면 음식점 리스트에서 해당 음식점이 삭제된다.', () => {
    cy.get('.restaurant-list')
      .children()
      .its('length')
      .then((initialLength) => {
        cy.get('.restaurant').first().click();
        cy.get('.modal button').contains('삭제하기').click({ force: true });
        cy.get('.modal--open').should('not.exist');
        cy.get('.restaurant-list')
          .children()
          .should('have.length', initialLength - 1);
      });
  });
});

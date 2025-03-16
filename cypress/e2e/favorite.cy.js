import { addRestaurant } from '../util/addRestaurant';

describe('자주 가는 음식점 기능 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    addRestaurant({ category: 'japanese', name: '재영이', distance: 2 });
    addRestaurant({ category: 'chinese', name: '재오재오재오', distance: 1 });

    cy.reload();
  });

  it('음식점 목록에서 자주 가는 음식점을 추가할 수 있다', () => {
    cy.get('.restaurant .restaurant__favorite-button').first().click();
    cy.get('.restaurant .restaurant__favorite-button')
      .first()
      .find('img')
      .should('have.attr', 'src', 'images/favorite-icon-filled.png');
  });

  it('상세 모달에서 자주 가는 음식점을 추가할 수 있다', () => {
    cy.get('.restaurant').should('exist').first().click();
    cy.get('.modal .restaurant__favorite-button').click();
    cy.get('.modal .restaurant__favorite-button')
      .find('img')
      .should('have.attr', 'src', 'images/favorite-icon-filled.png');
  });

  it('자주 가는 음식점 탭을 클릭하면 자주 가는 음식점 리스트가 보인다.', () => {
    cy.get('.restaurant .restaurant__favorite-button').first().click();
    cy.get('.restaurant-tab').last().click();
    cy.get('.restaurant-list').children().should('have.length', 1);
  });
});

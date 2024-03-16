import { CATEGORIES, RESTAURANTS_DB_KEY } from '@/constants/Condition';
import { Category, IRestaurant } from '@/types/Restaurant';
import { DISTANCE_FROM_CAMPUS } from '@/constants/Condition';

describe('디테일 모달 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('특정 음식점을 클릭하면 디테일 모달이 열린다.', () => {
    cy.get('.restaurant').first().click();
    cy.get('#detail-modal').should('have.class', 'modal--open');
  });

  it('디테일 모달에는 해당 식당의 카테고리, 제목, 설명, 링크가 보인다.', () => {
    cy.get('.restaurant').first().click();

    const firstRestaurant = JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').sort(
      (a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name),
    )[0];

    cy.get('.restaurant-detail').then((restaurant) => {
      const $categoryImg = restaurant.find('img');
      const categoryImg = `http://localhost:8080/category-${
        CATEGORIES[firstRestaurant.category as Category]
      }.png`;
      expect($categoryImg.attr('src')).to.equal(categoryImg);
    });

    cy.get('.restaurant-detail').find('.restaurant__name').should('text', firstRestaurant.name);
    cy.get('.restaurant-detail')
      .find('.restaurant__distance')
      .should('text', DISTANCE_FROM_CAMPUS(firstRestaurant.distance));
    cy.get('.restaurant-detail')
      .find('.restaurant__description')
      .should('text', firstRestaurant.description);
    cy.get('.restaurant-detail').find('.restaurant__link').should('text', firstRestaurant.link);
  });

  it('모달 배경을 누르면 모달이 닫힌다.', () => {
    cy.get('.restaurant').first().click();
    cy.get('#detail-modal').should('have.class', 'modal--open');

    const $backdrop = cy.get('#detail-modal .modal-backdrop');
    $backdrop.click({ force: true });

    cy.get('#detail-modal').should('have.not.class', 'modal--open');
  });

  it('모달의 닫기 버튼을 누르면 모달이 닫힌다', () => {
    cy.get('.restaurant').first().click();
    cy.get('#detail-modal').should('have.class', 'modal--open');

    const $cancelButton = cy.get('#detail-modal').contains('닫기');
    $cancelButton.click();

    cy.get('#detail-modal').should('have.not.class', 'modal--open');
  });

  it('모달의 삭제하기 버튼을 누르면 alert가 뜨고 alert의 확인을 누르면 해당 음식점이 삭제된다.', () => {
    cy.get('.restaurant').first().click();

    const $deleteButton = cy.get('#detail-modal').contains('삭제하기');
    $deleteButton.click();

    const $deleteConfirmButton = cy.get('#alert-modal').find('button').contains('삭제하기');
    $deleteConfirmButton.click({ force: true });

    const firstRestaurant = JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').sort(
      (a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name),
    )[0];

    cy.get('.restaurant').first().should('not.contain', firstRestaurant.name);
  });

  it('모달의 삭제하기 버튼을 누르면 alert가 뜨고 alert의 취소를 누르면 해당 음식점이 삭제되지 않는다.', () => {
    cy.get('.restaurant').first().click();

    const $deleteButton = cy.get('#detail-modal').contains('삭제하기');
    $deleteButton.click();

    const $deleteConfirmButton = cy.get('#alert-modal').find('button').contains('취소하기');
    $deleteConfirmButton.click({ force: true });

    const firstRestaurant = JSON.parse(localStorage.getItem(RESTAURANTS_DB_KEY) || '[]').sort(
      (a: IRestaurant, b: IRestaurant) => a.name.localeCompare(b.name),
    )[0];

    cy.get('.restaurant').first().should('contain', firstRestaurant.name);
  });
});

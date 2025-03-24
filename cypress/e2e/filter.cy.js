import { addRestaurant } from '../util/addRestaurant';

describe('음식점 필터링 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    addRestaurant({ category: 'japanese', name: '재영이', distance: 2 });
    addRestaurant({ category: 'chinese', name: '재오재오재오', distance: 1 });
  });

  it('카테고리 필터를 일식으로 하면 일식 음식점만 보여야 한다.', () => {
    cy.get('#category-filter').select('japanese');

    cy.get('.restaurant')
      .should('have.attr', 'data-id', '재영이')
      .find('.restaurant__category img')
      .should('have.attr', 'src')
      .and('include', 'category-japanese.png');
  });

  it('카테고리 필터를 적용했는데 필터링된 음식점이 없을 경우, 빈 화면을 보여준다.', () => {
    cy.get('#category-filter').select('western');

    cy.get('.restaurant-list').should('not.exist');
  });

  it('정렬 필터를 거리순으로 하면 distance가 낮은 순으로 정려된다.', () => {
    cy.get('#sorting-filter').select('distance');

    cy.get('.restaurant')
      .first()
      .find('.restaurant__distance')
      .invoke('text')
      .then((text) => Number(text.replace(/[^0-9]/g, '')))
      .as('firstDistance');

    cy.get('.restaurant')
      .last()
      .find('.restaurant__distance')
      .invoke('text')
      .then((text) => Number(text.replace(/[^0-9]/g, '')))
      .as('lastDistance');

    cy.get('@firstDistance').then((firstDistance) => {
      cy.get('@lastDistance').then((lastDistance) => {
        expect(firstDistance).to.be.lessThan(lastDistance);
      });
    });
  });
});

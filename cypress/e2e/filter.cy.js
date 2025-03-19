import { VISIT_URL_CONSTANT } from './constants/visitUrl.js';

describe('필터링할 수 있다.', () => {
  beforeEach(() => {
    cy.visit(VISIT_URL_CONSTANT.LINK);
  });

  describe('한식으로 필터링할 수 있다.', () => {
    it('한식 카테고리 필터링', () => {
      cy.get('#category-filter').select('한식');

      cy.get('.restaurant-list-container .restaurant').each(($el) => {
        cy.wrap($el).find('.restaurant__category img').should('have.attr', 'alt', 'korean');
      });
    });
  });

  describe('이름순으로 필터링할 수 있다.', () => {
    it('이름 순으로 필터링', () => {
      cy.get('#sorting-filter').select('이름 순');

      cy.get('.restaurant-list-container .restaurant__info .restaurant__name').then(($names) => {
        const nameTexts = [...$names].map((el) => el.innerText);
        const sortedNames = [...nameTexts].sort((a, b) => a.localeCompare(b));
        expect(nameTexts).to.deep.equal(sortedNames);
      });
    });
  });

  describe('거리순으로 필터링할 수 있다.', () => {
    it('거리 순으로 필터링', () => {
      cy.get('#sorting-filter').select('거리 순');

      cy.get('.restaurant-list-container .restaurant__info .restaurant__distance').then(($distances) => {
        const distanceNumbers = [...$distances].map((elemnet) => {
          const text = elemnet.innerText;
          const match = text.match(/(\d+)\s*분/);
          return match;
        });

        const sortedDistances = [...distanceNumbers].sort((a, b) => a - b);
        expect(distanceNumbers).to.deep.equal(sortedDistances);
      });
    });
  });
});

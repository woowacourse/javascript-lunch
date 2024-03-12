describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const CATEGORY_OPTIONS = new Map([
    ['all', { text: '전체' }],
    ['korean', { text: '한식' }],
    ['chinese', { text: '중식' }],
    ['japanese', { text: '일식' }],
    ['western', { text: '양식' }],
    ['asian', { text: '아시안' }],
    ['etc', { text: '기타' }],
  ]);

  const CATEGORY_VALUES = Array.from(CATEGORY_OPTIONS.keys());

  it('카테고리 필터링을 위한 트롭박스가 존재한다. ', () => {
    const $filteringCategory = cy.get('#filtering-category');
    $filteringCategory.should('be.visible');
  });

  it('카테고리 필터링을 위한 트롭박스는 관현된  선택 옵션들을 가지고 있다.', () => {
    const $filteringCategory = cy.get('#filtering-category');
    const $options = $filteringCategory.find('option');

    $options.each(($option) => {
      cy.wrap($option)
        .invoke('val')
        .then((value) => {
          expect(CATEGORY_VALUES).to.include(value);
          expect(CATEGORY_OPTIONS.get(value).text).to.include($option.text());
        });
    });
  });

  CATEGORY_VALUES.forEach((category) => {
    it('카테고리 옵션 중 하나를 고르면, 해당 카테고리의 음식점만 화면에 보이며 관련 상점이 없으면 관련 상점이 없다는 문구가 나온다.', () => {
      const $filteringCategory = cy.get('#filtering-category');

      const $restaurantList = cy.get('.restaurant-list');
      const numberOfRestaurant = $restaurantList.childElementCount;

      $filteringCategory.select(category);

      const $filteredList = cy.get('.restaurant-list');

      // all
      if (category === 'all') {
        const numberOfFilteredList = $filteredList.childElementCount;

        expect(numberOfRestaurant).to.equal(numberOfFilteredList);

        return;
      }
      // 기타
      if (category === 'asian') {
        cy.get('#none-restaurant-category').should('be.visible');
      } else {
        cy.get('category-icon').each(($el) => {
          expect($el.attr('category')).to.equal(category);
        });
      }
    });
  });
});

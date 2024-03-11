describe('template spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const CATEGORY_TEXTS = [
    '한식',
    '중식',
    '일식',
    '양식',
    '아시안',
    '기타',
    '전체',
    '기타',
  ];
  const CATEGORY = [
    'all',
    'korean',
    'chinese',
    'japanese',
    'western',
    'asian',
    'chinese',
    'etc',
  ];

  it('카테고리 필터링을 위한 트롭박스가 존재한다. ', () => {
    const $filteringCategory = cy.get('#filtering-category');
    $filteringCategory.should('be.visible');
  });

  it(`카테고리 필터링을 위한 트롭박스는 ${CATEGORY_TEXTS.join(',')}라는 선택 옵션들을 가지고 있다.`, () => {
    const $filteringCategory = cy.get('#filtering-category');
    const options = $filteringCategory.find('option');

    options.each(($option) => {
      expect(CATEGORY_TEXTS).to.include($option.text());
    });
  });

  it(`카테고리 필터링을 위한 드롭박스는 ${CATEGORY.join(',')}의 option value들을 가진다. `, () => {
    const $filteringCategory = cy.get('#filtering-category');

    $filteringCategory
      .find('option') // select 요소 내의 모든 option 요소 선택
      .each(($option) => {
        cy.wrap($option)
          .invoke('val')
          .then((value) => {
            // 각 option 요소의 value 값을 가져와서 특정 배열에 포함되어 있는지 확인
            expect(CATEGORY).to.include(value);
          });
      });
  });

  CATEGORY.forEach((category) => {
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

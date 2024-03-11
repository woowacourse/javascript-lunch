describe('이름/거리순 정렬', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  const SORTING_OPTIONS_ = new Map([
    ['name', { text: '이름순' }],
    ['distance', { text: '거리순' }],
  ]);
  const SORTING_VALUES = Array.from(SORTING_OPTIONS_.keys());

  it('이름/거리순 정렬을 트롭박스가 존재한다.', () => {
    cy.get('#filtering-sorting').should('be.visible');
  });
  it('이름/거리순 정렬 드롭박스는 관련된 선택 옵션들을 가지고 있다.', () => {
    const $filteringSorting = cy.get('#filtering-sorting');
    const $options = $filteringSorting.find('option');

    $options.each(($option) => {
      cy.wrap($option)
        .invoke('val')
        .then((value) => {
          expect(SORTING_VALUES).to.include(value);
          expect(SORTING_OPTIONS_.get(value).text).to.include($option.text());
        });
    });
  });

  it('이름순으로 정렬하면, 음식점의 이름을 기준으로 하여 오름차순으로 정렬된다.', () => {
    const $filteringSorting = cy.get('#filtering-sorting');
    const $filteringCategory = cy.get('#filtering-category');

    $filteringSorting.select('name');
    $filteringCategory.select('all');

    cy.get('restaurant-box').then((elements) => {
      expect(elements[0].getAttribute('name')).to.equal('도스타코스 선릉점');
      expect(elements[elements.length - 1].getAttribute('name')).to.equal(
        '호아빈 삼성점',
      );
    });
  });

  it('거리순으로 정렬하면, 음식점의 켐퍼스로의 거리를 기준으로하여 오름차순으로 정렬된다.', () => {
    const $filteringSorting = cy.get('#filtering-sorting');
    const $filteringCategory = cy.get('#filtering-category');

    $filteringSorting.select('distance');
    $filteringCategory.select('all');

    cy.get('restaurant-box').then((elements) => {
      const firstDistance = elements[0].querySelector(
        '.restaurant__info__distance',
      ).textContent;
      const lastDistance = elements[elements.length - 1].querySelector(
        '.restaurant__info__distance',
      ).textContent;

      expect(firstDistance).to.include('5');
      expect(lastDistance).to.include('20');
    });
  });
});

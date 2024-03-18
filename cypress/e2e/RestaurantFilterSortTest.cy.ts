describe('식당 필터링 및 정렬 테스트', () => {
  beforeEach(() => {
    cy.viewport('iphone-xr'); // 모바일 화면으로 설정
    cy.visit('/');
  });

  it('식당을 "아시안"으로 필터링 했을 때 1개의 식당만을 보여줘야 한다.', () => {
    // given
    cy.get('lunch-item-filter');
    cy.get('lunch-items[liked=false]')
      .find('lunch-item')
      .filter('[category="아시안"]')
      .its('length')
      .then((length) => {
        const expectedItemsCount = length;

        // when
        cy.get('lunch-dropdown[options=category] > select').select('아시안');

        // then
        cy.get('lunch-items[liked=false]')
          .find('lunch-item')
          .its('length')
          .should('equal', expectedItemsCount);
      });
  });

  it('식당을 "가게명순▼"으로 정렬했을 때 적절한 결과를 보여줘야 한다.', () => {
    // given
    cy.get('lunch-item-filter');
    cy.get('lunch-items[liked=false]')
      .find('lunch-item')
      .then((items) => {
        const sortedItems = [...items].sort((a, b) => {
          const nameA = a.getAttribute('name') ?? '';
          const nameB = b.getAttribute('name') ?? '';
          return nameB.localeCompare(nameA);
        });

        // when
        cy.get('lunch-dropdown[options=sortBy] > select').select('가게명순▼');

        // then
        cy.get('lunch-items[liked=false]')
          .find('lunch-item')
          .each((item, index) => {
            const expectedName = sortedItems[index].getAttribute('name') ?? '';
            const name = item.attr('name') ?? '';
            expect(expectedName).to.equal(name);
          });
      });
  });
});

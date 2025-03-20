describe('음식점 필터링 확인', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('카테고리별 필터링이 정상적으로 동작하는지 확인', () => {
    cy.get('#category-filter').select('한식');
    cy.wait(500);

    cy.get('.restaurant')
      .should('have.length.greaterThan', 0)
      .find('.restaurant__category img')
      .should('have.attr', 'src')
      .and('include', 'category-korean.png');
  });

  it('이름순/거리순 정렬이 정상적으로 동작하는지 확인', () => {
    cy.get('#sorting-filter').select('거리순');
    cy.get('.restaurant').then(($restaurants) => {
      const distances = $restaurants
        .map((index, el) =>
          parseInt(
            el.querySelector('.restaurant__distance').innerText.replace('캠퍼스부터 ', '').replace('분 내', ''),
            10
          )
        )
        .get();

      const sortedDistances = [...distances].sort((a, b) => a - b);
      expect(distances).to.deep.equal(sortedDistances);
    });
  });
});

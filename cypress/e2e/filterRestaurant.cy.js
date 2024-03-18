describe('카테고리 선택 테스트', () => {
  it('한식 카테고리를 선택 시, 모킹 데이터 중 "농민 백암순대 본점"과 "피양콩할마니"가 나오고 다른 카테고리는 나오지 않는다 ', () => {
    cy.customVisit();
    cy.get('select[id=category-select]').select('한식');

    cy.contains('농민백암순대 본점').should('exist');
    cy.contains('피양콩할마니').should('exist');
    cy.contains('영빈관').should('not.exist');
  });

  it('일식 카테고리를 선택 시, 모킹 데이터 중 "잇쇼우"가 나오고 다른 카테고리는 나오지 않는다 ', () => {
    cy.customVisit();
    cy.get('select[id=category-select]').select('일식');

    cy.contains('잇쇼우').should('exist');
  });
});

describe('정렬 선택 테스트', () => {
  it('이름순 정렬 선택 시, 모킹 데이터가 이름순으로 정렬된다', () => {
    cy.customVisit();
    cy.get('select[id=sort-select]').select('이름순');

    const names = [];

    cy.get('.restaurant__name')
      .each((name) => {
        names.push(name.text());
      })
      .then(() => {
        const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
        expect(names).to.deep.equal(sortedNames);
      });
  });

  it('거리순 정렬 선택 시, 모킹 데이터가 거리순으로 정렬된다', () => {
    cy.customVisit();
    cy.get('select[id=sort-select]').select('거리순');

    const distances = [];

    cy.get('.restaurant__distance')
      .each((distance) => {
        distances.push(parseInt(distance.text().match(/\d+/))); // '캠퍼스부터 10분 내'
      })
      .then(() => {
        const sortedDistances = [...distances].sort((a, b) => a - b);

        expect(distances).to.deep.equal(sortedDistances);
      });
  });
});

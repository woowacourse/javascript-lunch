import { restaurants } from '../../src/data/dummyData';

beforeEach(() => {
  cy.visit('http://localhost:8080', {
    onBeforeLoad(win) {
      win.localStorage.setItem('restaurantList', JSON.stringify(restaurants));
    },
  });
});

const example = {
  category: '한식',
  name: '도지울토종순대국',
  distance: 30,
  description: `테스트 음식점 설명입니다.`,
  isFavorite: false,
};

describe('E2E Test', () => {
  it('음식점 추가 및 제거', () => {
    // 추가
    cy.get('.gnb__button').click();
    cy.get('#category').select(example.category, { force: true });
    cy.get('#name').type(example.name);
    cy.get('#distance').select(`${example.distance}분 내`);
    cy.get('#description').type(example.description);
    cy.get('.button--primary').click();

    cy.contains(example.name).should('be.visible');

    // 제거
    cy.get(':nth-child(1) > .restaurant__info > .restaurant__name').click();
    cy.get('.restaurant-detail-container > .button-container > .button--secondary').click();

    cy.contains('도스타코스 선릉점').should('not.visible');
  });

  it('필터링 및 정렬', () => {
    // 카테고리 필터링
    cy.get('#category-filter').select('한식');
    cy.contains('피양콩할마니').should('be.visible');

    cy.get('#category-filter').select('중식');
    cy.contains('친친').should('be.visible');

    // 정렬
    const sortedNames = [
      '친친',
      '도스타코스 선릉점',
      '피양콩할마니',
      '잇쇼우',
      '호아빈 삼상점',
      '이태리키친',
    ];

    cy.get('#category-filter').select('전체');
    cy.get('#sorting-filter').select('거리순');
    cy.get('.restaurant').should(($list) => {
      expect($list).to.have.length(sortedNames.length);
      expect($list.eq(0)).to.contain(sortedNames[0]);
      expect($list.eq(1)).to.contain(sortedNames[1]);
      expect($list.eq(2)).to.contain(sortedNames[2]);
      expect($list.eq(5)).to.contain(sortedNames[5]);
    });
  });

  it('즐겨찾기 추가 및 제거', () => {
    // 음식점 목록에서 추가
    cy.get(':nth-child(1) > .restaurant__favorite > .button--favorite').click();
    cy.get(':nth-child(2) > .restaurant__favorite > .button--favorite').click();

    // 상세 정보 모달에서 추가
    cy.get(':nth-child(3) > .restaurant__category').click();
    cy.get(
      '.restaurant-detail-container > .restaurant__favorite > .button--favorite > img',
    ).click();
    cy.get('.restaurant-detail-container > .button-container > .button--primary').click();

    // 즐겨찾기 제거
    cy.get(
      '.restaurant-list > :nth-child(1) > .restaurant__favorite > .button--favorite > img',
    ).click();

    // 즐겨찾기 탭에서 확인
    cy.get('[for="favorite-restaurant"]').click();
    cy.contains('잇쇼우').should('be.visible');
    cy.contains('이태리키친').should('be.visible');
    cy.contains('도스타코스 선릉점').should('not.exist');
  });
});

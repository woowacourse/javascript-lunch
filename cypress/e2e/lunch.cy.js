describe('점심 뭐 먹지 e2e 테스트', () => {
  it('음식점 추가, 삭제, 필터링, 즐겨찾기 테스트', () => {
    cy.visit('http://localhost:8080');
    cy.viewport(500, 1000);

    // 음식점 추가
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('공원네 밥집');
    cy.get('#distance').select('10분 내');
    cy.get('#description').type('집 앞 분식점');
    cy.get('form .button--primary').click();
    
    cy.get('.gnb__button').click();
    cy.get('#category').select('양식');
    cy.get('#name').type('제레미 스파게티');
    cy.get('#distance').select('20분 내');
    cy.get('#description').type('야무짐');
    cy.get('form .button--primary').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('중식');
    cy.get('#name').type('사천성');
    cy.get('#distance').select('15분 내');
    cy.get('#description').type('얼큰함');
    cy.get('form .button--primary').click();

    // 음식점 삭제
    cy.contains('공원네 밥집').click();
    cy.contains('삭제하기').click();
    
    // 음식점 필터링
    cy.get('#sorting-filter').select('거리순');

    // 리스트 확인
    cy.get('.restaurant-list').first().should('contain.text', '사천성');

    // 즐겨찾기 추가
    cy.contains('사천성').parentsUntil('.restaurant-list').children('.favorite-icon').click();
    cy.contains('자주 가는 음식점').click();

    // 자주가는 음식점 리스트 확인
    cy.get('.restaurant-list').first().should('contain.text', '사천성');
  });
});
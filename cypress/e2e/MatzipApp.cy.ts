describe('점심 뭐 먹지 E2E 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  it('Header가 렌더링 테스트', () => {
    cy.get('.gnb').should('exist');
    cy.get('.gnb__title').should('have.text', '점심 뭐 먹지');
    cy.get('.gnb__button').click({ force: true });
    cy.get('.restaurant-form-modal').should('exist');
  });

  it('음식점 추가 및 삭제, 자주 보는 음식점 등록 테스트', () => {
    cy.get('.gnb__button').click({ force: true });

    cy.get('#category').select('한식', { force: true });
    cy.get('#name').type('썬데이네한방족발', { force: true });
    cy.get('#distance').select('5', { force: true });
    cy.get('#description').type('족발이 맛있어요^^', { force: true });
    cy.get('#link').type('www.naver.com', { force: true });
    cy.get('button[type="submit"]').click({ force: true });

    cy.get('.restaurant__name').should('have.text', '썬데이네한방족발');
    cy.get('.restaurant__distance').should('have.text', '캠퍼스부터 5분 내');
    cy.get('.restaurant__description').should('have.text', '족발이 맛있어요^^');

    cy.get('#한식_썬데이네한방족발').should('exist');

    cy.get('.restaurant__favorite_img > img').click({ force: true });

    cy.get('matzip-favorite-container #한식_썬데이네한방족발').should('exist');

    cy.get('matzip-default-container .restaurant').click({ force: true });
    cy.get('.detail-info-modal').should('exist');

    cy.get('.detail-info-modal button:nth-child(1)').click({ force: true });
    cy.get('#한식_썬데이네한방족발').should('not.exist');
  });
});

describe('레스토랑 상세 정보 모달과 즐겨찾기 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
    cy.viewport(1920, 1080);

    // 테스트에 필요한 더미 데이터 추가
    cy.get('.gnb__button').click();
    cy.get('#category').select('한식');
    cy.get('#name').type('김치찌개');
    cy.get('#distance').select('15');
    cy.get('#add').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('중식');
    cy.get('#name').type('쟁반짜장');
    cy.get('#distance').select('5');
    cy.get('#add').click();

    cy.get('.gnb__button').click();
    cy.get('#category').select('일식');
    cy.get('#name').type('스시');
    cy.get('#distance').select('10');
    cy.get('#add').click();
  });

  it('레스토랑 아이템을 클릭하면 상세 정보 모달창이 열린다.', () => {
    cy.get('.restaurant-list-container').find('li').eq(0).click();
    cy.get('.modal').eq(1).should('have.class', 'modal--open');
  });

  it('레스토랑 아이템의 즐겨찾기 버튼을 누르면 자주 가는 음식점 탭에 추가된다.', () => {
    cy.get('.restaurant-list-container').find('li').eq(0).find('.restaurant__favorite').click();

    cy.get('#favorite').click();
    cy.get('.restaurant-list-container').find('li').should('have.length', 1);
  });
});

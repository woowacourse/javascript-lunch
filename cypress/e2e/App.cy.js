import restaurantList from '../fixtures/RestaurantList.json';

describe('점심 뭐 먹지 E2E 테스트', () => {
  // 초기 설정
  beforeEach(() => {
    window.localStorage.setItem('restaurantList', JSON.stringify(restaurantList));
    cy.visit('http://localhost:8080');
  });

  // 처음 렌더링 됐을 때
  it('처음 화면이 뜨면 헤더와 식당 추가 버튼 보인다.', () => {
    cy.get('.gnb').should('be.visible');
    cy.get('.gnb__button').should('be.visible');
  });

  it('처음 화면이 뜨면 모든 음식점/자주가는 음식점 내브바가 보인다.', () => {
    cy.get('#all-restaurant').should('be.visible');
    cy.get('#favorite-restaurant').should('be.visible');
  });

  it('처음 화면이 뜨면 필터링과 정렬 드롭다운 버튼이 보인다.', () => {
    cy.get('#category-filter').should('be.visible');
    cy.get('#sorting-filter').should('be.visible');
  });

  it('처음 화면이 뜨면 레스토랑 리스트가 보인다.', () => {
    cy.get('.restaurant').should('have.length', restaurantList.length);
  });

  // 식당 추가
  it('카테고리, 이름, 거리 등을 입력한 후 추가하기 버튼을 누르면 식당이 추가된다.', () => {
    cy.get('.gnb__button').click();

    cy.get('.modal').should('have.class', 'modal--open');

    cy.get('#category').select('한식');
    cy.get('#name').type('용호동낙지');
    cy.get('#distance').select('10');
    cy.get('#description').type('사장님 츤데레');
    cy.get('#link').type('www.naver.com');

    cy.get('.form-add-restaurant').submit();

    cy.on('window:alert', alertText => {
      expect(alertText).to.equal('추가되었습니다.');
    });

    cy.get('.modal').should('not.be.visible');
  });

  // 식당 필터링/정렬
  it('식당을 카테고리 별로 필터링 하고 이름순, 거리순으로 정렬할 수 있다.', () => {
    cy.get('#category-filter').select('한식');
    cy.get('#sorting-filter').select('distance');

    cy.get('.restaurant').should('have.length', 2);
    cy.get('.restaurant__name').eq(0).should('contain', '꺼벙이분식');
    cy.get('.restaurant__name').eq(1).should('contain', '배가무닭볶음탕');
  });

  // 식당 즐겨찾기
  it('식당 리스트에서 별 버튼을 누르면 자주가는 음식점에서 필터링된 리스트를 확인할 수 있다.', () => {
    cy.get('.favorite-button').eq(0).click();
    cy.get('.favorite-button').eq(3).click();

    cy.get('#favorite-restaurant').click();

    cy.get('.restaurant').should('have.length', 2);
  });
});

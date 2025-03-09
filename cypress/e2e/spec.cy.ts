const localURL = 'http://localhost:5173';

describe('애플리케이션 테스트', () => {
  beforeEach(() => {
    cy.visit(localURL);
  });

  describe('식당 목록', () => {
    it('첫 화면에서 식당 리스트가 보인다.', () => {
      cy.get('.restaurant-list');
    });
  });

  describe('식당 추가', () => {
    it('식당 추가 버튼을 누르면 모달이 보인다.', () => {
      cy.get('.gnb__button').click();

      cy.contains('새로운 음식점');
    });

    it('모달을 열어 각 값을 입력하여 ‘추가하기’ 버튼을 누르면 식당 리스트가 추가된다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);

      cy.contains('이름입니다');
      cy.contains('10분 내');
    });
  });

  describe('식당 저장', () => {
    it('새로고침을 했을 때 이전에 추가한 식당이 보인다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);

      cy.reload();

      cy.contains('이름입니다');
      cy.contains('10분 내');
    });
  });

  describe('식당 상세히 보기', () => {
    it('식당을 누르면 식당의 상세 정보가 보인다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);
      cy.get('.restaurant-list').find('.restaurant').first().click();

      cy.contains('삭제하기');
      cy.contains('닫기');
    });
  });

  describe('식당 삭제', () => {
    it('식당 상세 정보에서 식당을 제거하면 식당이 제거된다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);
      cy.get('.restaurant-list').find('.restaurant').first().click();

      cy.get('#modal-delete').click();

      cy.get('.restaurant').should('not.exist');
    });
  });

  describe('필터링', () => {
    it('자주 가는 음식점을 누르면 자주 가는 음식점만 필터링해 보여준다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);
      cy.get('#tab-like').click();

      cy.get('.restaurant').should('not.exist');
    });
    it('한식을 선택하면 한식만 보여준다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);
      cy.get('#filter').select('한식');
      cy.get('.restaurant').should('not.exist');
    });
    it('일식을 선택하면 일식만 보여준다.', () => {
      cy.addRestaurant('이름입니다', '일식', 10);
      cy.get('#filter').select('일식');
      cy.get('.restaurant').should('exist');
    });
  });
});

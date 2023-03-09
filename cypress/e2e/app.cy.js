describe('앱 실행 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8081/');
  });

  it('음식점 모달창을 열어 새로운 음식점을 등록한다.', () => {
    cy.get('#modal-open-button').click();
    cy.get('select[name="category"]').select('한식');
    cy.get('r-input[name="name"] input').type('백암 순대국');
    cy.get('select[name="distanceByMinutes"]').select('10');
    cy.get('r-textarea[name="description"] textarea').type('생각보다 그냥 그런...');
    cy.get('r-button[action="submitForm"]').click();
  });

  context('음식점 목록을 클릭하면', () => {
    it('세부정보창이 열린다.', () => {
      cy.get('r-restaurant[name="도스타코스 선릉점"]').click();
    });
  });

  context('삭제하기 버튼을 누르면', () => {
    it('해당 음식점이 삭제된다.', () => {
      cy.get('r-restaurant[name="도스타코스 선릉점"]').click();
      cy.get('r-button[action="deleteRestaurant"]').click();
    });
  });

  context('즐겨찾기 버튼을 누르면', () => {
    it('자주 가는 음식점으로 등록된다.', () => {
      cy.get('#favorite-icon[name="도스타코스 선릉점"]').click();
      cy.get('#favorite-icon[name="잇쇼우"]').click();
    });

    it('이후 자주 가는 음식점을 클릭하면 자주 가는 음식점의 목록을 보여준다.', () => {
      cy.get('#favorite-icon[name="도스타코스 선릉점"]').click();
      cy.get('#favorite-icon[name="잇쇼우"]').click();
      cy.get('#favorite-type').click();
    });
  });

  context('카테고리를 일식으로 변경하면', () => {
    it('음식점 목록에 잇쇼우가 있다.', () => {
      cy.get('select[name="filterRestaurant"]').select('일식');
      cy.get('r-restaurant[name="잇쇼우"]');
    });
  });
});

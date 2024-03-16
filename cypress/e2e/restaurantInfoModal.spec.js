describe('restaurantInfoModal 테스트', () => {
  beforeEach(() => {
    cy.customVisit();
  });

  it('가게 정보를 클릭하면 상세정보 모달이 열린다.', () => {
    cy.get('restaurant-box[name="이태리키친"]').click();
    cy.get('restaurant-info-modal-inner').should('exist');
  });

  it('가게 상세정보 이동을 클릭하면 해당하는 가게 링크로 이동한다.', () => {
    cy.get('restaurant-box[name="이태리키친"]').click();
    cy.get('.restaurant-info-modal__link').click();
    cy.visit('https://naver.me/Goz3Wdxi');
  });

  it('삭제하기 버튼을 누르면 모달이 닫히고, 가게정보가 홈에서 삭제된다.', () => {
    cy.get('restaurant-box[name="이태리키친"]').click();
    cy.get('#delete-store').click();
    cy.get('restaurant-info-modal-inner').should('not.exist');
    cy.get('restaurant-box[name="이태리키친"]').should('not.exist');
  });

  it('닫기 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('restaurant-box[name="이태리키친"]').click();
    cy.get('#close-store-info').click();
    cy.get('restaurant-info-modal-inner').should('not.exist');
  });
});

describe("음식점 상세 정보 모달에 대한 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.get('[data-testid="restaurant-list"] li').first().click();
  });

  it("상세 정보 모달이 열리고, 음식점 정보를 올바르게 표시한다.", () => {
    cy.get('[data-testid="modal"]').should("exist");
    cy.get('[data-testid="restaurant-detail-modal"]').within(() => {
      cy.get('[data-testid="restaurant-item-name"]')
        .should("exist")
        .and("not.be.empty");
      cy.get('[data-testid="restaurant-item-category"]')
        .should("exist")
        .and("have.attr", "alt");
      cy.get('[data-testid="restaurant-item-distance"]')
        .should("exist")
        .and("contain.text", "분 내");
      cy.get('[data-testid="restaurant-item-description"]')
        .should("exist")
        .and("not.be.empty");
      cy.get('[data-testid="restaurant-item-link"]')
        .should("exist")
        .and("have.attr", "href");
    });
  });

  it("모달의 닫기 버튼을 클릭하여 닫을 수 있다.", () => {
    cy.get('[data-testid="close-restaurant-detail-modal"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 닫기 버튼을 클릭하면 모달이 닫힌다.", () => {
    cy.get('[data-testid="close-restaurant-detail-modal"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("모달의 삭제 버튼을 클릭하면, 음식점이 삭제되고 모달이 닫힌다.", () => {
    cy.get('[data-testid="delete-restaurant"]').click();
    cy.get('[data-testid="modal"]').should("not.exist");

    // 삭제된 음식점이 음식점 목록에 존재하지 않아야 함
    cy.get('[data-testid="restaurant-list"] li').each(($el) => {
      cy.wrap($el)
        .find('[data-testid="restaurant-item-name"]')
        .should("not.contain.text", "도스타스코스 선릉점");
    });
  });

  it("모달의 즐겨찾기 버튼을 클릭하면, 즐겨찾기 상태가 토글된다.", () => {
    cy.get('[data-testid="restaurant-detail-modal"]')
      .find('[data-testid="favorite-button"]')
      .invoke("attr", "src")
      .then((initialSrc) => {
        // 즐겨찾기 버튼 클릭
        cy.get('[data-testid="restaurant-detail-modal"]')
          .should("exist")
          .find('[data-testid="favorite-button"]')
          .click();

        // 버튼 클릭 후 src 속성이 변경되었는지 확인
        cy.get('[data-testid="restaurant-detail-modal"]')
          .find('[data-testid="favorite-button"] img')
          .invoke("attr", "src")
          .should("not.equal", initialSrc);
      });
  });
});

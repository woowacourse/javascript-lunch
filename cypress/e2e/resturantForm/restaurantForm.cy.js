describe("음식점 추가가 잘 되는지 확인하는 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("모달 열기 닫기 테스트, 음식점 추가(카테고리, 이름, 거리 입력)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");
    cy.get("#name")
      .invoke("attr", "placeholder")
      .should("contain", "음식점 이름(12자 이하)");
    cy.get("#description")
      .invoke("attr", "placeholder")
      .should(
        "contain",
        "설명은 300자 이하여야 합니다. 맛있는 설명을 곁들여 주세요!"
      );
    cy.get("#link")
      .invoke("attr", "placeholder")
      .should("contain", "https://example.com 링크는 300자 이하여야 합니다.");
  });
});

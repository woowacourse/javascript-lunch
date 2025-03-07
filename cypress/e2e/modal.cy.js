describe("모달창 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
  });

  it("음식점 목록에서 우측 상단의 추가 버튼을 누르면 모달창이 보인다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("모달에서 취소버튼을 누르면 모달창이 닫힌다.", () => {
    cy.get(".gnb__button").click();

    cy.get(".button--secondary").click();
    cy.get(".modal-container").should("not.exist");
  });
});

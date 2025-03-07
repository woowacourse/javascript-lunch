describe("컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더에서 '점심 뭐 먹지'가 잘 렌더링되는지 확인한다.", () => {
    cy.get(".gnb").should("exist");
    cy.get(".gnb").contains("점심 뭐 먹지");
  });
});

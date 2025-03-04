describe("컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5500/");
  });
  it("헤더에서 점심 뭐먹지가 잘 렌더링 되는지 확인", () => {
    cy.get(".gnb").should("exist");
    cy.get(".gnb").contains("점심 뭐 먹지");
  });
});

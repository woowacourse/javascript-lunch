describe("컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  })
  it("헤더 정상 생성", () => {
    cy.get(".gnb").contains("점심 뭐 먹지");
  });
});

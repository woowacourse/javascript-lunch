describe("헤더 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("헤더를 확인할 수 있다. ", () => {
    cy.get(".gnb").should("exist");
  });
  it("헤더의 타이틀을 확인할 수 있다.", () => {
    cy.get(".gnb__title").should("exist");
    cy.get(".gnb__title").contains("점심 뭐 먹지");
  });
  it("헤더의 버튼을 확인할 수 있다.", () => {
    cy.get(".gnb__button").should("exist");
  });
});

describe("Test Group", () => {
  it("헤더 컴포넌트를 정상적으로 렌더링 한다", () => {
    //given
    //when
    //then
    cy.visit("http://localhost:5173/");
    cy.get(".gnb__title").should("exist");
    cy.get(".gnb__title").contains("점심 뭐 먹지");
  });
});

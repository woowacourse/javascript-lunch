describe("Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("사용자가 음식점 목록 페이지에 접속한다.", () => {
    cy.get(".gnb").should("be.visible");
  });

  it("음식점 목록에서 우측 상단의 추가 버튼을 누른다.", () => {
    cy.visit("http://localhost:5173");
    cy.get(".gnb").should("be.visible");
  });
});

// describe("컴포넌트 테스트", () => {
//   beforeEach(() => {
//     cy.visit("http://localhost:5173");
//   });

//   it("헤더에서 점심 뭐 먹지가 잘 렌더링되는지 확인한다.", () => {
//     cy.get(".gnb").should("exist");
//     cy.get(".gnb").contains("점심 뭐 먹지");
//   });
// });

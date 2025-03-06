describe("음식점 추가 모달 기능 테스트", () => {
  it("목록 추가 아이콘 클릭 시 음식점 추가 모달이 화면에 보인다.", () => {
    cy.visit("http://localhost:5173/");
    cy.get(".modal-container").should("not.be.visible");
    cy.get(".gnb__button > img").click();
    cy.get(".modal-container").should("be.visible");
  });
});

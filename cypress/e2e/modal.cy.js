describe("모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("메뉴추가 버튼을 눌렀을 때 모달이 정상적으로 뜬다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal.modal--open").should("exist");
  });
  it("취소하기 버튼을 눌렀을 때 모달이 정상적으로 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".button.button--secondary.text-caption").click();
    cy.get(".modal").should("be.hidden");
  });
});

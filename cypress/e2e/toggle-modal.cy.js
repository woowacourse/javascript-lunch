describe("모달 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("메뉴 추가 버튼을 눌렀을때 모달창이 열린다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-backdrop").should("have.class", "open");
  });

  it("취소하기 버튼을 누르면 모달창이 닫힌다.", () => {
    cy.get(".modal-backdrop").invoke("addClass", "open");

    cy.get("#cancel-button").click();
    cy.get(".modal-backdrop").should("not.have.class", "open");
  });

  it("모달 바깥 회색창을 누르면 모달창이 닫힌다.", () => {
    cy.get(".modal-backdrop").invoke("addClass", "open");

    cy.get(".modal-backdrop").click("top");
    cy.get(".modal-backdrop").should("not.have.class", "open");
  });
});

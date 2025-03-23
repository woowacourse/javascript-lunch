describe("모달 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(720, 1280);
  });

  describe("음식점 등록 모달 테스트", () => {
    it("메뉴 추가 버튼을 눌렀을때 모달창이 열린다.", () => {
      cy.get(".gnb__button").click();
      cy.get("#register-modal-backdrop").should("have.class", "open");
    });

    it("취소하기 버튼을 누르면 모달창이 닫힌다.", () => {
      cy.get("#register-modal-backdrop").invoke("addClass", "open");

      cy.get("#cancel-button").click();
      cy.get("#register-modal-backdrop").should("not.have.class", "open");
    });

    it("모달 바깥 회색창을 누르면 모달창이 닫힌다.", () => {
      cy.get("#register-modal-backdrop").invoke("addClass", "open");

      cy.get("#register-modal-backdrop").scrollIntoView().click("top");
      cy.get("#register-modal-backdrop").should("not.have.class", "open");
    });
  });

  describe("음식점 상세보기 모달 테스트", () => {
    it("음식점 카드를 클릭했을때 상세보기 모달창이 열린다", () => {
      cy.get(".restaurant").first().click();
      cy.get("#restaurant-detail-modal-backdrop").should("have.class", "open");
    });
    it("닫기 버튼을 누르면 모달창이 닫힌다", () => {
      cy.get(".restaurant").first().click();
      cy.get("#close-button").click();
      cy.get("#restaurant-detail-modal-backdrop").should(
        "not.have.class",
        "open"
      );
    });
    it("모달 바깥 회색창을 누르면 모달창이 닫힌다", () => {
      cy.get(".restaurant").first().click();
      cy.get("#restaurant-detail-modal-backdrop").click("top");
      cy.get("#restaurant-detail-modal-backdrop").should(
        "not.have.class",
        "open"
      );
    });
    it("삭제하기 버튼을 누르면 모달창이 닫히고 해당 음식점 정보가 삭제된다.", () => {
      cy.get(".restaurant").first().click();
      cy.get("#delete-button").click();
      cy.get("#restaurant-detail-modal-backdrop").should(
        "not.have.class",
        "open"
      );
      cy.get(".restaurant-list").should("not.contain", "피양콩할마니");
    });
  });
});

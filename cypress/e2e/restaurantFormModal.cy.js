import ERROR_MESSAGE from "../../src/constants/errorMessage";

describe("음식점 추가 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("유저가 정상적으로 음식점을 추가하면 목록에 반영된다.", () => {
    cy.get("#category").select("한식");
    cy.get("#name").type("더휴");
    cy.get("#distance").select("5분 내");
    cy.get("#description").type("이집맛집임");
    cy.get("#link").type("http://restaurant.com");

    cy.get(".button--primary").click();
    cy.get(".modal-container").should("not.exist");

    cy.get("body").contains("더휴");
  });

  describe("입력값 검증", () => {
    it("카테고리를 입력하지 않으면 경고 문구가 발생한다.", () => {
      cy.get(".button--primary").click();
      cy.get("#category").then(($select) => {
        expect($select[0].checkValidity()).to.be.false;
      });
    });

    it("이름을 입력하지 않으면 경고 문구가 발생한다.", () => {
      cy.get("#category").select("한식");
      cy.get(".button--primary").click();
      cy.get("#name").then(($input) => {
        expect($input[0].checkValidity()).to.be.false;
      });
    });

    it("거리를 입력하지 않으면 경고 문구가 발생한다.", () => {
      cy.get("#category").select("한식");
      cy.get("#name").type("더휴");
      cy.get(".button--primary").click();
      cy.get("#distance").then(($select) => {
        expect($select[0].checkValidity()).to.be.false;
      });
    });

    it("이름이 두 글자 이하일 경우 alert 메시지가 발생한다.", () => {
      cy.get("#category").select("한식");
      cy.get("#name").type("더");
      cy.get("#distance").select("5분 내");
      cy.get(".button--primary").click();
      cy.on("window:alert", (text) => {
        expect(text).to.equal(ERROR_MESSAGE.name);
      });
    });
  });

  it("취소 버튼을 누르면 모달이 닫힌다.", () => {
    cy.get(".button--secondary").click();
    cy.get(".modal-container").should("not.exist");
  });
});

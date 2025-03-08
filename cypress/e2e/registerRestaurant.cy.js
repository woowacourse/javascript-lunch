import RestaurantData from "../../src/domain/RestaurantData";

it("정상적으로 음식점을 등록한다.", () => {
  cy.visit("http://localhost:5173");
  cy.viewport(1280, 720);

  cy.get(".restaurant-list li").then(($list) => {
    const initialLength = $list.length;

    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
    cy.get("#category").select("한식");
    cy.get("#name").type("더휴");
    cy.get("#distance").select("5분 내");
    cy.get("#description").type("이집맛집임");
    cy.get("#link").type("https://www.naver.com");

    cy.get(".button--add").click();
    cy.get(".modal-container").should("not.exist");

    cy.get(".restaurant-list li").should("have.length", initialLength + 1);
    cy.get(".restaurant-list li").last().should("contain.text", "더휴");
  });
});

describe("필드 값을 제대로 채우지 못하면 경고 문구가 발생한다.", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
    cy.viewport(1280, 720);
  });

  it("카테고리를 입력하지 않고 제출하기 버튼을 누르면 경고 문구가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".button--add").click();
    cy.get("#category").then(($select) => {
      expect($select[0].checkValidity()).to.be.false;
    });
  });

  it("이름을 입력하지 않고 제출하기 버튼을 누르면 경고 문구가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get(".button--add").click();
    cy.get("#name").then(($input) => {
      expect($input[0].checkValidity()).to.be.false;
    });
  });

  it("거리를 입력하지 않고 제출하기 버튼을 누르면 경고 문구가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("더휴");
    cy.get(".button--add").click();
    cy.get("#distance").then(($select) => {
      expect($select[0].checkValidity()).to.be.false;
    });
  });

  it("음식점 이름을 두 글자 이하를 입력했을 때, alert 창으로 경고 문구가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("더");
    cy.get("#distance").select("5분 내");
    cy.get(".button--add").click();
    cy.on("window:alert", (text) => {
      expect(text).to.equal(RestaurantData.ERROR_MASSAGE.nameLength);
    });
  });
});

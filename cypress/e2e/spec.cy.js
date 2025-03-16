describe("The Home Page", () => {
  it("페이지가 정상적으로 로드된다.", () => {
    cy.visit("http://localhost:5173/");
    cy.get("header").should("be.visible");
  });
});

describe("Modal Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더에서 버튼을 눌러 모달창을 띄운다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("모달창을 열고 아무것도 입력하지 않은 상태로 취소하기 버튼으로 닫으면 모달이 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.get("#modal-close-btn").click();
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("모달의 모든 입력창에 값을 작성해서 추가하기 버튼을 누르면 새 식당이 등록되고, 목록에 식당이 보여진다", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("한식");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("5");
    cy.get("#description").type("맛있는 한식당입니다.");
    cy.get("#link").type("https://www.google.com/");
    cy.get("#modal-submit-btn").click();
    cy.get(".restaurant-list").contains("한식당").should("be.visible");
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("모달의 필수 입력창에 값을 작성해서 추가하기 버튼을 누르면 새 식당이 등록되고, 목록에 식당이 보여진다", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("한식");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("5");
    cy.get("#modal-submit-btn").click();
    cy.get(".restaurant-list").contains("한식당").should("be.visible");
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("필수 사항을 입력하지 않고 추가하기 버튼을 클릭하면 에러가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("");
    cy.get("#modal-submit-btn").click();
    cy.get("#restaurant-add-dialog").should("exist");
  });
});

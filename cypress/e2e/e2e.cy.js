//e2e 테스트 추가
describe("E2E Test Group", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.viewport(1920, 1080);
    cy.get(".gnb__button").click();
    cy.get("#category").select("한식");
    cy.get("#name").type("한식가게이름");
    cy.get("#distance").select("5");
  });

  it("사용자가 카메고리, 이름, 이용시간을 정상적으로 입력한 경우 화면에 list가 추가된다.", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").should("exist").and("be.visible");
    cy.get(".restaurant__category").should("exist").and("be.visible");
    cy.get(".restaurant__name").should("exist").contains("한식가게이름");
    cy.get(".restaurant__info").should("exist").and("be.visible");
    cy.get(".restaurant__distance")
      .should("exist")
      .contains("캠퍼스부터 5분 내");
    cy.get(".restaurant__description").should("exist").and("be.visible");
  });

  it("사용자가 카메고리, 이름, 이용시간, 설명, URL을 정상적으로 입력한 경우 화면에 list가 추가된다.", () => {
    cy.get("#description").type("한식가게이름에 대한 설명글입니다.");
    cy.get("#link").type("https://www.naver.com/");

    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant").should("exist").and("be.visible");
    cy.get(".restaurant__category").should("exist").and("be.visible");
    cy.get(".restaurant__name").should("exist").contains("한식가게이름");
    cy.get(".restaurant__info").should("exist").and("be.visible");
    cy.get(".restaurant__distance")
      .should("exist")
      .contains("캠퍼스부터 5분 내");
    cy.get(".restaurant__description")
      .should("exist")
      .contains("한식가게이름에 대한 설명글입니다.");
  });

  it("이미 list가 추가된 상황에서 한번 더 폼 입력을 했을 때 리스트가 추가된다. ", () => {
    cy.get(".button-container button").eq(1).click();

    cy.get(".gnb__button").click();
    cy.get("#category").select("중식");
    cy.get("#name").type("중식가게이름");
    cy.get("#distance").select("15");
    cy.get(".button-container button").eq(1).click();

    cy.get(".restaurant")
      .should("have.length", 2) // 요소가 정확히 2개인지 확인
      .each(($el) => {
        cy.wrap($el).should("be.visible"); // 각 요소가 보이는지 확인
      });
  });
});

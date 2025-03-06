import { ERROR_MESSAGE } from "../../src/settings/settings.js";

it("모달 열기 닫기 테스트, 음식점 추가(카테고리, 이름, 거리 입력)", () => {
  cy.visit("http://localhost:5173/");

  // 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  // 모달 닫기
  cy.get(".cancel-button").click();
  cy.get(".modal").should("not.be.visible");

  // 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  // 폼 데이터 입력
  cy.get("#category").select("중식");
  cy.get("#name").type("마담밍");
  cy.get("#distance").select("20");

  // 폼 제출
  cy.get(".restaurant-add-form").submit();
  cy.get(".restaurant").should("have.length", 1);
});

it("모달 열기 테스트, 음식점 추가(음식점 이름을 15자를 입력하여 경고창을 발생시킨다.)", () => {
  cy.visit("http://localhost:5173/");

  // 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  cy.get("#category").select("한식");
  cy.get("#name").type("대충이름이긴한식부페같은것마아앙");
  cy.get("#distance").select("5");

  cy.get(".restaurant-add-form").submit();

  cy.on("window:alert", (alertText) => {
    expect(alertText).to.equal(ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH);
  });

  cy.get("#name").clear();
  cy.get("#name").type("더휴웨딩몰");
  cy.get(".restaurant-add-form").submit();
  cy.get(".restaurant").should("have.length", 1);
});

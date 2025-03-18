import type { Restaurant } from "../../src/types/type";

function addRestaurant({ category, name, distance }: Restaurant) {
  // 음식점 추가 모달 띄우기
  cy.get(".gnb__button").click();
  cy.get(".modal").should("be.visible");
  cy.get(".restaurant-add-form").should("exist");

  // 폼 데이터 입력
  cy.get("#category").select(category);
  cy.get("#name").type(name);
  cy.get("#distance").select(String(distance));

  // 폼 제출
  cy.get(".restaurant-add-form").submit();
}

export default addRestaurant;

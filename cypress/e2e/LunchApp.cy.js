import { RESTAURANTS_INFOS } from "../fixtures/restaurantInfos";

describe("LunchApp(점심 뭐 먹지) E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    localStorage.setItem("restaurants", JSON.stringify(RESTAURANTS_INFOS));
  });
});

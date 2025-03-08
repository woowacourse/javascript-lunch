import { RestaurantData } from "../../src/constants/RestaurantData.js";

describe("레스트랑 목록 컴포넌트 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("레스토랑 아이템을 확인할 수 있다.", () => {
    cy.get(".restaurant__category").should("exist");
  });
  it("화면에서 레스토랑 데이터 갯수만큼 확인할 수 있다.", () => {
    const length = RestaurantData.length;
    cy.get(".restaurant__category").should("have.length", length);
  });
});

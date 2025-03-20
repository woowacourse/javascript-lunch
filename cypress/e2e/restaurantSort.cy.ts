import { mockRestaurantList } from "../mock-data/restaurantList";
import addRestaurant from "../utils/addRestaurant";

describe("음식점 정렬 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    mockRestaurantList.forEach((item) => {
      addRestaurant(item);
    });
  });

  it("음식점을 이름순으로 정렬한다", () => {
    cy.get("#sorting-filter").select("거리순");
    cy.get("#sorting-filter").select("이름순");
    cy.get(".restaurant").first().contains("아시안 20분");
  });

  it("음식점을 거리순으로 정렬한다", () => {
    cy.get("#sorting-filter").select("거리순");
    cy.get(".restaurant").first().contains("한식 5분");
  });
});

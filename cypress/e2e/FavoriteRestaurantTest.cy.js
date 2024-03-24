const FAVORITE_TOGGLE = ".favorite-toggle";
const FILLED_STAR = "#filled-star";
const RESTAURANT = ".restaurant";

describe("자주가는 음식점 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });

  it("음식점에 즐겨찾기 버튼 클릭 시 버튼 색이 채워지는지 확인", () => {
    cy.get(FAVORITE_TOGGLE).first().click();
    cy.get(FAVORITE_TOGGLE).first().should("have.attr", "id", "filled-star");
  });

  it("음식점에 즐겨찾기 버튼 클릭 시 자주가는 음식점 목록에 추가되는지 확인", () => {
    cy.get(FAVORITE_TOGGLE).first().click();
    cy.get(".favorite-restaurants").click();
    cy.get(".restaurant-list").should("have.length", 1);
  });

  it("자주가는 음식점에서 즐겨찾기 취소 시 제거되는지 확인", () => {
    cy.get(FAVORITE_TOGGLE).first().click();
    cy.get(".favorite-restaurants").click();

    cy.get(restaurant).then((restaurants) => {
      const initialCount = restaurants.length;

      cy.get(FAVORITE_TOGGLE).first().click();

      cy.get(RESTAURANT).should((restaurantsAfterDelete) => {
        expect(restaurantsAfterDelete.length).to.eq(initialCount - 1);
      });
    });
  });

  it("음식점에 즐겨찾기 버튼 클릭 시 디테일 모달에도 반영이 되는지 확인", () => {
    cy.get(FAVORITE_TOGGLE).first().click();
    cy.get(RESTAURANT).first().click();

    cy.get(FILLED_STAR).should("exist");
  });

  it("디테일 모달의 즐겨찾기 버튼 클릭 시 기존 목록에도 반영이 되는지 확인", () => {
    cy.get(RESTAURANT).first().click();
    cy.get(FAVORITE_TOGGLE).first().click();

    cy.get("#close-modal").click({ force: true });
    cy.get(FILLED_STAR).should("exist");
  });
});

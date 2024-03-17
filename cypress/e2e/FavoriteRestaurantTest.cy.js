describe("자주가는 음식점 테스트", () => {
  it("음식점에 즐겨찾기 버튼 클릭 시 버튼 색이 채워지는지 확인", () => {
    cy.visit("http://localhost:8082/");

    cy.get(".favorite-toggle").first().click();
    cy.get(".favorite-toggle").first().should("have.attr", "id", "filled-star");
  });

  it("음식점에 즐겨찾기 버튼 클릭 시 자주가는 음식점 목록에 추가되는지 확인", () => {
    cy.visit("http://localhost:8082/");

    cy.get(".favorite-toggle").first().click();
    cy.get(".favorite-restaurants").click();
    cy.get(".restaurant-list").should("have.length", 1);
  });

  it("자주가는 음식점에서 즐겨찾기 취소 시 제거되는지 확인", () => {
    cy.visit("http://localhost:8082/");
    cy.get(".favorite-toggle").first().click();
    cy.get(".favorite-restaurants").click();

    cy.get(".restaurant").then((restaurants) => {
      const initialCount = restaurants.length;

      cy.get(".favorite-toggle").first().click();

      cy.get(".restaurant").should((restaurantsAfterDelete) => {
        expect(restaurantsAfterDelete.length).to.eq(initialCount - 1);
      });
    });
  });

  it("음식점에 즐겨찾기 버튼 클릭 시 디테일 모달에도 반영이 되는지 확인", () => {
    cy.visit("http://localhost:8082/");

    cy.get(".favorite-toggle").first().click();
    cy.get(".restaurant").first().click();

    cy.get("#filled-star").should("exist");
  });

  it("디테일 모달의 즐겨찾기 버튼 클릭 시 기존 목록에도 반영이 되는지 확인", () => {
    cy.visit("http://localhost:8082/");

    cy.get(".restaurant").first().click();
    cy.get(".favorite-toggle").first().click();

    cy.get("#close-modal").click({ force: true });
    cy.get("#filled-star").should("exist");
  });
});

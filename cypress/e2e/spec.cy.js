describe("점심 뭐 먹지 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("https://dev-dino22.github.io/javascript-lunch/");
    cy.get("#openStoreModalBtn").click();
    cy.get("#category").select("korean");
    cy.get("#name").type("파양콩 할마니");
    cy.get("#distance").select("10");
    cy.get("#description").type("맛있는 콩 요리 전문점");
    cy.get("#link").type("https://example.com");
    cy.get('button[type="submit"]').click();
    cy.get("modal modal--open").should("not.exist");

    cy.get("#openStoreModalBtn").click();
    cy.get("#category").select("japanese");
    cy.get("#name").type("잇쇼우");
    cy.get("#distance").select("20");
    cy.get("#description").type("맛있는 일식 요리집");
    cy.get("#link").type("https://example.com");
    cy.get('button[type="submit"]').click();
    cy.get("modal modal--open").should("not.exist");
  });

  it("네 번째 테스트(즐겨찾기 테스트) - 즐겨찾기를 등록한 음식점이 자주 가는 음식점에 제대로 등록이 됐는가?", () => {
    cy.get('.restaurant[data-index="0"] .star-button-container').click();
    cy.get('button[value="1"]').click();
    cy.get("#restaurantFavoriteSection").within(() => {
      cy.contains("파양콩 할마니").should("be.visible");
      cy.contains("잇쇼우").should("not.exist");
    });
    cy.get("#restaurantFavoriteSection")
      .contains("파양콩 할마니")
      .parents(".restaurant")
      .find(".star-button-container")
      .click();
    cy.get("#restaurantFavoriteSection").within(() => {
      cy.contains("파양콩 할마니").should("not.exist");
    });
  });

  it("첫 번째 테스트 - 음식점이 입력한대로 올바르게 추가되는지 확인", () => {
    cy.get("#restaurantListBox").contains("파양콩 할마니").should("be.visible");
    cy.get("#restaurantListBox").within(() => {
      cy.contains("10분 내").should("be.visible");
      cy.contains("맛있는 콩 요리 전문점").should("be.visible");
    });
  });

  it("두 번째 테스트 - 선택한 음식점이 삭제되는지 확인", () => {
    cy.get('.restaurant[data-index="1"]').click();
    cy.get("#storeDeleteBtn").click();
    cy.get('.restaurant[data-index="1"]').should("not.exist");
  });

  it("세 번째 테스트(필터 테스트) - 거리순으로 정렬이 되고 카테고리별로 잘 보여지는지 확인", () => {
    cy.get("#sortFilter").select("distance");
    cy.get(".restaurant-list li").eq(1).contains("잇쇼우");
    cy.get("#cartegoryFilter").select("korean");
    cy.get(".restaurant-list").contains("파양콩 할마니").should("be.visible");
    cy.get('.restaurant[data-index="1"]').should("not.exist");
  });
});

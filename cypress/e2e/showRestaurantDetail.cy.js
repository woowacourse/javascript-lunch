import { CATEGORY_ASSETS } from "../../src/constants";

const formData = {
  category: "한식",
  name: "얌샘 김밥",
  distance: "10",
  description: "맛있는 김밥",
  link: "링크 테스트용 텍스트",
};

describe("음식점 상세 정보 바텀 시트 보기 플로우 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();

    // given
    cy.openForm();
    cy.fillForm(formData);
    cy.clickAddButton();
  });

  it("음식점 목록에서 특정 음식점 클릭 시 해당 음식점에 대한 상세 정보가 보인다.", () => {
    // given
    // when
    cy.openDetailModal();

    // then

    // favorite button
    cy.checkFavoriteButtonInDetailModal();

    // category
    cy.get(".restaurant-detail__category .category-icon")
      .should("exist")
      .and("be.visible")
      .should("have.attr", "src", CATEGORY_ASSETS["한식"]);

    // name
    cy.get(".restaurant-detail__name")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "얌샘 김밥");

    // distance
    cy.get(".restaurant-detail__distance")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "캠퍼스부터 10분 내");

    // description
    cy.get(".restaurant-detail__description")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "맛있는 김밥");

    // link
    cy.get(".restaurant-detail__link")
      .should("exist")
      .and("be.visible")
      .and("contain.text", "링크 테스트용 텍스트");
  });
});

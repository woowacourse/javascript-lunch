import { FAVORITE_ASSETS } from "../../src/constants";

const formData = {
  category: "한식",
  name: "얌샘 김밥",
  distance: "10",
  description: "맛있는 김밥",
  link: "링크 테스트용 텍스트",
};

describe("자주 가는 음식점 추가 및 해제 플로우 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();

    // given
    cy.openForm();
    cy.fillForm(formData);
    cy.clickAddButton();
  });

  it("모든 음식점 목록에서 특정 음식점을 자주 가는 음식점으로 추가하면 자주 가는 음식점 목록에 해당 음식점이 추가된다.", () => {
    // given
    // when
    // 자주 가는 음식점 해제되어 있는지 확인
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.lined);

    // 자주 가는 음식점 추가
    cy.get(".favorite-button")
      .should("exist")
      .and("be.visible")
      .first()
      .click();

    // then
    // 자주 가는 음식점 목록 들어가기
    cy.clickFavoriteRestaurantTab();

    // 자주 가는 음식점 목록에 추가되었는지 확인
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.filled);
  });

  it("자주 가는 음식점 목록에서 특정 음식점을 자주 가는 음식점에서 해제하면 자주 가는 음식점 목록에 해당 음식점이 삭제된다.", () => {
    // given

    // 초기에 자주 가는 음식점 추가해두기
    cy.clickFavoriteButtonInRestaurantList();

    // when
    // 자주 가는 음식점 목록 들어가기
    cy.clickFavoriteRestaurantTab();

    // 자주 가는 음식점 추가되어 있는지 확인
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.filled);

    // 자주 가는 음식점 해제
    cy.get(".favorite-button")
      .should("exist")
      .and("be.visible")
      .first()
      .click();

    // then
    // 자주 가는 음식점 목록에서 존재하지 않는지 확인
    cy.checkNotExistRestaurant();
  });

  it("특정 음식점에 대한 상세 정보 바텀 시트에서 자주 가는 음식점으로 추가하면 자주 가는 음식점 목록에 해당 음식점이 추가된다.", () => {
    // given
    // when
    // 상세정보 탭 열기
    cy.openDetailModal();
    cy.isDetailModalOpen();

    // 자주 가는 음식점 해제 되어있는지 확인
    cy.get(".favorite-icon").should("have.attr", "src", FAVORITE_ASSETS.lined);

    // 자주 가는 음식점 추가
    cy.checkFavoriteButtonInDetailModal().first().click();

    // then
    // 상세정보 탭에서 filled인지
    cy.checkFavoriteButtonInDetailModal()
      .first()
      .find(".favorite-icon")
      .should("have.attr", "src", FAVORITE_ASSETS.filled);

    // 닫기 버튼 클릭
    cy.clickCloseButton();

    // 모든 음식점 목록에서 filled인지
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.filled);

    // 자주가는 음식점 목록에서 filled인지
    cy.clickFavoriteRestaurantTab();
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.filled);
  });

  it("특정 음식점에 대한 상세 정보 바텀 시트에서 자주 가는 음식점을 해제하면 자주 가는 음식점 목록에 해당 음식점이 삭제된다.", () => {
    // given
    // 초기에 자주 가는 음식점 추가해두기
    cy.clickFavoriteButtonInRestaurantList();

    // when
    // 상세정보 탭 열기
    cy.openDetailModal();
    cy.isDetailModalOpen();

    // 자주 가는 음식점 추가 되어있는지 확인
    cy.get(".favorite-icon").should("have.attr", "src", FAVORITE_ASSETS.filled);

    // 자주 가는 음식점 해제
    cy.checkFavoriteButtonInDetailModal().first().click();

    // then
    // 상세정보 탭에서 lined인지
    cy.checkFavoriteButtonInDetailModal()
      .first()
      .find(".favorite-icon")
      .should("have.attr", "src", FAVORITE_ASSETS.lined);

    // 닫기 버튼 클릭
    cy.clickCloseButton();

    // 모든 음식점 목록에서 lined인지
    cy.checkFavoriteIconSrc(FAVORITE_ASSETS.lined);

    // 자주 가는 음식점 목록에서 존재하지 않는지 확인
    cy.clickFavoriteRestaurantTab();
    cy.checkNotExistRestaurant();
  });
});

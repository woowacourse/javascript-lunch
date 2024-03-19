const FILTERING_TEST_DATA = [
  {
    category: "한식",
    expectedRestaurantName: "피양콩 할마니",
  },
  {
    category: "아시안",
    expectedRestaurantName: "호아빈 삼성점",
  },
  {
    category: "일식",
    expectedRestaurantName: "잇쇼우",
  },
  {
    category: "중식",
    expectedRestaurantName: "친친",
  },

  {
    category: "양식",
    expectedRestaurantName: "이태리키친",
  },
  {
    category: "기타",
    expectedRestaurantName: "도스타코스 선릉점",
  },
];

describe("음식점 목록 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("사용자가 처음 방문할 경우 기본 제공 음식점 목록이 렌더링된다", () => {
    const EXPECTED_RESTAURANT_LENGTH = 6;
    cy.get(".restaurant-list-container").children().should("have.length", EXPECTED_RESTAURANT_LENGTH);
  });

  it("사용자가 처음 방문할 경우 기본 제공 음식점 목록이 이름순으로 정렬된 상태로 보여진다", () => {
    const EXPECTED_NAME_SEQUENCE = ["도스타코스 선릉점", "이태리키친", "잇쇼우", "친친", "피양콩 할마니", "호아빈 삼성점"];

    cy.get(".restaurant-list-container")
      .children()
      .each((element, index) => {
        cy.wrap(element.attr("name")).should("equal", EXPECTED_NAME_SEQUENCE[index]);
      });
  });

  it("사용자가 선택한 카테고리에 맞는 음식점 목록이 보여져야 한다.", () => {
    FILTERING_TEST_DATA.forEach(({ category, expectedRestaurantName }) => {
      const FILTERED_RESTAURANT_LIST = 1;

      cy.get("select#category-option-select").select(category);

      cy.get(".restaurant-list-container").children().should("have.length", FILTERED_RESTAURANT_LIST);
      cy.get(".restaurant-list-container").children().last().should("have.attr", "name", expectedRestaurantName);
    });

    const EXPECTED_RESTAURANT_LENGTH = 6;
    cy.get("select#category-option-select").select("전체");
    cy.get(".restaurant-list-container").children().should("have.length", EXPECTED_RESTAURANT_LENGTH);
  });

  it("사용자가 거리순 정렬 옵션을 선택할 경우, 거리순으로 목록이 정렬된다", () => {
    const EXPECTED_NAME_SEQUENCE = ["도스타코스 선릉점", "친친", "잇쇼우", "피양콩 할마니", "호아빈 삼성점", "이태리키친"];

    cy.get("select#sort-option-select").select("거리순");

    cy.get(".restaurant-list-container")
      .children()
      .each((element, index) => {
        cy.wrap(element.attr("name")).should("equal", EXPECTED_NAME_SEQUENCE[index]);
      });
  });

  it("사용자가 이름순 정렬 옵션을 선택할 경우, 이름순으로 음식점 목록이 정렬된다", () => {
    const EXPECTED_NAME_SEQUENCE = ["도스타코스 선릉점", "이태리키친", "잇쇼우", "친친", "피양콩 할마니", "호아빈 삼성점"];

    cy.get("select#sort-option-select").select("이름순");

    cy.get(".restaurant-list-container")
      .children()
      .each((element, index) => {
        cy.wrap(element.attr("name")).should("equal", EXPECTED_NAME_SEQUENCE[index]);
      });
  });

  it("사용자가 별 아이콘을 클릭하면, 자주 가는 음식점 탭에서 확인할 수 있다.", () => {
    const EXPECTED_FAVORITE_RESTAURANT_LENGTH = 2;

    cy.get("favorite-icon").first().click();
    cy.get("favorite-icon").last().click();

    cy.get("restaurant-tab[text='자주 가는 음식점']").click();

    cy.get(".restaurant-list-container").children().should("have.length", EXPECTED_FAVORITE_RESTAURANT_LENGTH);
  });

  it("자주 가는 음식점 탭에서 별 아이콘을 클릭하면, 모든 음식점에서 탭에서만 확인할 수 있다.", () => {
    const EMPTY_FAVORITE_RESTAURANT_LENGTH = 0;

    cy.get("favorite-icon").first().click();
    cy.get("favorite-icon").last().click();

    cy.get("restaurant-tab[text='자주 가는 음식점']").click();

    cy.get("favorite-icon").first().click();
    cy.get("favorite-icon").last().click();

    cy.get("restaurant-tab[text='자주 가는 음식점']").click();

    cy.get(".restaurant-list-container").children().should("have.length", EMPTY_FAVORITE_RESTAURANT_LENGTH);
  });
});

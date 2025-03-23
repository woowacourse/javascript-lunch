const koreanFormData = {
  category: "한식",
  name: "얌샘 김밥",
  distance: "10",
  description: "맛있는 김밥",
  link: "링크 테스트용 텍스트",
};

const asianFormData = {
  category: "아시안",
  name: "메콩타이",
  distance: "15",
  description: "맛있는 쌀국수",
  link: "링크 테스트용 텍스트",
};

const additionalKoreanFormData = {
  category: "한식",
  name: "피양콩 할마니",
  distance: "5",
  description: "맛있는 비지찌개",
  link: "링크 테스트용 텍스트",
};

describe("카테고리 필터링 및 이름순/거리순 정렬 플로우 테스트", () => {
  beforeEach(() => {
    cy.initializeTestEnvironment();

    // given
    cy.openForm();
    cy.fillForm(koreanFormData);
    cy.clickAddButton();

    cy.openForm();
    cy.fillForm(asianFormData);
    cy.clickAddButton();
  });

  describe("음식점 목록에서 사용자가 원하는 카테고리로 필터링 시 해당 카테고리에 대한 음식점 목록만 보인다.", () => {
    const testCases = [
      {
        category: "전체",
        visibleRestaurants: ["얌샘 김밥", "메콩타이"],
        hiddenRestaurants: [],
      },
      {
        category: "한식",
        visibleRestaurants: ["얌샘 김밥"],
        hiddenRestaurants: ["메콩타이"],
      },
      {
        category: "아시안",
        visibleRestaurants: ["메콩타이"],
        hiddenRestaurants: ["얌샘 김밥"],
      },
    ];

    testCases.forEach(({ category, visibleRestaurants, hiddenRestaurants }) => {
      it(`${category} 카테고리로 필터링 시 해당 카테고리의 음식점 목록만 보인다.`, () => {
        // given
        // when
        cy.get("#category-filter").select(category);

        // then
        visibleRestaurants.forEach((restaurant) => {
          cy.contains(".restaurant-list .restaurant", restaurant)
            .should("exist")
            .and("be.visible");
        });

        hiddenRestaurants.forEach((restaurant) => {
          cy.contains(".restaurant-list .restaurant", restaurant).should(
            "not.exist"
          );
        });
      });
    });
  });

  describe("음식점 목록에서 이름순/거리순으로 정렬 시 해당 카테고리에 대하여 음식점의 이름순/거리순으로 정렬된다.", () => {
    beforeEach(() => {
      // 한식 메뉴 추가
      cy.openForm();
      cy.fillForm(additionalKoreanFormData);
      cy.clickAddButton();
    });

    const sortingTestCases = [
      {
        sortType: "이름순",
        testCases: [
          {
            category: "전체",
            sortedRestaurants: ["메콩타이", "얌샘 김밥", "피양콩 할마니"],
          },
          {
            category: "한식",
            sortedRestaurants: ["얌샘 김밥", "피양콩 할마니"],
          },
        ],
      },
      {
        sortType: "거리순",
        testCases: [
          {
            category: "전체",
            sortedRestaurants: ["피양콩 할마니", "얌샘 김밥", "메콩타이"],
          },
          {
            category: "한식",
            sortedRestaurants: ["피양콩 할마니", "얌샘 김밥"],
          },
        ],
      },
    ];

    sortingTestCases.forEach(({ sortType, testCases }) => {
      describe(`음식점 목록에서 ${sortType}으로 정렬 시`, () => {
        testCases.forEach(({ category, sortedRestaurants }) => {
          it(`${category} 카테고리에서 ${sortType}으로 정렬 시 올바르게 정렬된다.`, () => {
            // given
            cy.get("#category-filter").select(category);

            // when
            cy.get("#sort-filter").select(sortType);

            // then
            sortedRestaurants.forEach((restaurant, index) => {
              cy.get(".restaurant-list .restaurant")
                .eq(index)
                .should("contain.text", restaurant);
            });
          });
        });
      });
    });
  });
});

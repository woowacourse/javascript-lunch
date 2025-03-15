import MOCK_ITEM from "../../src/mockItem.js";

describe("LunchInfoCard 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("초기 LunchInfoCard는 6개가 있다.", () => {
    cy.get(".restaurant-list").children(".restaurant").should("have.length", 6);
  });

  it("LunchInfoCard에는 점심 음식점 이름이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__name")
      .should("have.text", MOCK_ITEM.restaurantList[5].name);
  });

  it("LunchInfoCard에는 캠퍼스에서 음식점까지의 거리가 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__distance")
      .should("have.text", "캠퍼스부터 5분 내");
  });

  it("LunchInfoCard에는 점심 음식점 설명이 들어있다.", () => {
    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__description")
      .should("contain.text", "멕시칸 캐주얼 그릴");
  });

  it("카테고리 선택 시 올바르게 필터링된다.", () => {
    cy.get(
      ".restaurant-filter-container select[id=category-filter] option"
    ).then((options) => {
      const optionTexts = [...options].map((option) => option.textContent);

      expect(optionTexts).to.deep.equal([
        "선택해 주세요",
        "한식",
        "중식",
        "일식",
        "양식",
        "아시안",
        "기타",
      ]);
    });

    cy.get(".restaurant-filter-container select[id=category-filter]")
      .select("한식")
      .should("have.value", "한식");

    cy.get(".restaurant-list")
      .children(".restaurant")
      .eq(0)
      .find(".restaurant__name")
      .should("have.text", "피양콩할마니");
  });

  it("이름순/거리순으로 올바르게 정렬된다.", () => {
    cy.get(
      ".restaurant-filter-container select[id=sorting-filter] option"
    ).then((options) => {
      const optionTexts = [...options].map((option) => option.textContent);

      expect(optionTexts).to.deep.equal(["이름순", "거리순"]);

      cy.get(".restaurant-filter-container select[id=sorting-filter]")
        .select("이름순")
        .should("have.value", "name");

      cy.get(".restaurant-list .restaurant__name").then(($names) => {
        const nameArray = [...$names].map((el) => el.textContent.trim());

        expect(nameArray).to.deep.equal([
          "도스타코스 선릉점",
          "이태리키친",
          "잇쇼우",
          "친친",
          "피양콩할마니",
          "호야빈 삼성점",
        ]);
      });

      cy.get(".restaurant-filter-container select[id=sorting-filter]")
        .select("거리순")
        .should("have.value", "distance");

      cy.get(".restaurant-list .restaurant__name").then(($names) => {
        const nameArray = [...$names].map((el) => el.textContent.trim());

        expect(nameArray).to.deep.equal([
          "도스타코스 선릉점",
          "친친",
          "잇쇼우",
          "피양콩할마니",
          "호야빈 삼성점",
          "이태리키친",
        ]);
      });
    });
  });
});

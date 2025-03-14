describe("음식점 필터링에 대한 E2E 테스트", () => {
  let initialRestaurantList = [];
  let categoryCounts = {};

  before(() => {
    cy.visit("http://localhost:5173");

    // 음식점 목록을 객체 배열로 저장 (name, distance 추출)
    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        initialRestaurantList = Cypress.$($elements)
          .map((_, el) => {
            const name = Cypress.$(el).find(".restaurant__name").text().trim();
            // "캠퍼스부터 10분 내" → split by space → parts[1] is "10분"
            const distanceText = Cypress.$(el)
              .find(".restaurant__distance")
              .text()
              .trim(); // e.g., "캠퍼스부터 10분 내"
            const parts = distanceText.split(" ");
            // parts[1] should be "10분", remove "분" and parse
            const distance = parseInt(parts[1].replace("분", ""));
            return { name, distance };
          })
          .get();
      });

    // 카테고리별 음식점 개수를 렌더링된 UI에서 가져오기 (alt 속성 사용)
    cy.get('[data-testid="restaurant-category"]').each(($el) => {
      const category = $el.attr("alt");
      if (category) {
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });
  });

  beforeEach(() => {
    cy.visit("http://localhost:5173");

    cy.get('[data-testid="restaurant-list"]')
      .should("exist")
      .children()
      .should("have.length.greaterThan", 0);
  });

  it("카테고리 전체 선택 시, 이름 순으로 정렬된 목록이 보인다.", () => {
    cy.get('[data-testid="category-filter"]').select("전체");
    cy.get('[data-testid="sorting"]').select("name");

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        const sortedByName = [...initialRestaurantList].sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        cy.wrap($elements).each(($el, index) => {
          cy.wrap($el).should("contain.text", sortedByName[index].name);
        });
      });
  });

  const categories = ["한식", "중식", "일식", "아시안", "양식", "기타"];

  categories.forEach((category) => {
    it(`"${category}" 선택 시, 해당 카테고리의 음식점만 렌더링된다.`, () => {
      // 카테고리에 해당하는 음식점이 없으면 테스트 스킵
      if (!categoryCounts[category] || categoryCounts[category] === 0) return;

      cy.get('[data-testid="category-filter"]').select(category);
      cy.get('[data-testid="sorting"]').select("name");

      cy.get('[data-testid="restaurant-list"]')
        .children()
        .should("have.length", categoryCounts[category])
        .each(($el) => {
          cy.wrap($el)
            .find('[data-testid="restaurant-category"]')
            .should("have.attr", "alt", category);
        });
    });
  });

  it("카테고리 전체 선택 시, 거리 순으로 정렬된 목록이 보인다.", () => {
    cy.get('[data-testid="category-filter"]').select("전체");
    cy.get('[data-testid="sorting"]').select("distance");

    cy.get('[data-testid="restaurant-list"]')
      .children()
      .then(($elements) => {
        const sortedByDistance = [...initialRestaurantList].sort((a, b) => {
          const diff = a.distance - b.distance;
          return diff !== 0 ? diff : a.name.localeCompare(b.name, "ko");
        });

        cy.wrap($elements).each(($el, index) => {
          cy.wrap($el).should("contain.text", sortedByDistance[index].name);
        });
      });
  });

  categories.forEach((category) => {
    it(`"${category}" 선택 후 거리순 정렬 시, 해당 카테고리의 음식점만 렌더링된다.`, () => {
      // 카테고리에 해당하는 음식점이 없으면 테스트 스킵
      if (!categoryCounts[category] || categoryCounts[category] === 0) return;

      cy.get('[data-testid="category-filter"]').select(category);
      cy.get('[data-testid="sorting"]').select("distance");

      cy.get('[data-testid="restaurant-list"]')
        .children()
        .should("have.length", categoryCounts[category])
        .each(($el) => {
          cy.wrap($el)
            .find('[data-testid="restaurant-category"]')
            .should("have.attr", "alt", category);
        });
    });
  });
});

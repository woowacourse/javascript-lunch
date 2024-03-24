const SORT_FILTER = "#sort-filter";
const CATEGORY_FILTER = "#category-filter";

describe("필터링 옵션 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });

  afterEach(() => {
    cy.get(CATEGORY_FILTER).select("전체");
  });

  it("한식 클릭 시 한식 카테고리를 가진 음식점만 남는다.", () => {
    cy.get(CATEGORY_FILTER).select("한식");

    cy.get(".restaurant-list")
      .children()
      .each(($el) => {
        cy.wrap($el).find(".category-icon").should("have.attr", "alt", "한식");
      });
  });
});

describe("정렬 옵션 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8081/");
  });

  afterEach(() => {
    cy.get(SORT_FILTER).select("이름순");
  });

  it("거리순 정렬", () => {
    cy.get(SORT_FILTER).select("거리순");

    const distances = [];

    cy.get(".restaurant__distance")
      .each(($el) => {
        const distanceNumber = parseInt($el.text().match(/\d+/)[0], 10);
        distances.push(distanceNumber);
      })
      .then(() => {
        distances === distances.sort((a, b) => a - b);
      });
  });

  it("이름순 정렬", () => {
    cy.get(SORT_FILTER).select("이름순");

    const names = [];

    cy.get(".restaurant__name")
      .each(($el) => {
        names.push($el.text());
      })
      .then(() => {
        names === names.sort((a, b) => (a.name < b.name ? -1 : 1));
      });
  });
});

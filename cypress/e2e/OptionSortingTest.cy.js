describe("필터링 옵션 테스트", () => {
  it("한식 클릭 시 한식 카테고리를 가진 음식점만 남는다.", () => {
    cy.visit("http://localhost:8082/");

    cy.get("#category-filter").select("한식");

    cy.get(".restaurant-list")
      .children()
      .each(($el) => {
        cy.wrap($el).find(".category-icon").should("have.attr", "alt", "한식");
      });
  });
});

describe("정렬 옵션 테스트", () => {
  it("거리순 정렬", () => {
    cy.visit("http://localhost:8082/");

    cy.get("#sort-filter").select("거리순");

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
    cy.visit("http://localhost:8082/");

    cy.get("#sort-filter").select("이름순");

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

describe("필터 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("선택한 카테고리 별로 필터링 되어 음식점이 로드 되야 한다.", () => {
    // when
    cy.get(".restaurant-filter-container #category").select("중식");

    // then
    cy.get(".restaurant-list")
      .children()
      .each(($el) => {
        const categoryAlt = $el.find(".category-icon").attr("alt");
        expect(categoryAlt).to.contain("chinese");
      });
  });

  it("옵션이 이름순이면 이름순으로 필터링 되어 음식점이 로드 되야 한다.", () => {
    // when
    cy.get(".restaurant-filter-container #sorting").select("이름순");

    // then
    cy.get(".restaurant-list")
      .children()
      .then(($els) => {
        const names = Cypress.$($els)
          .map((index, el) => {
            return Cypress.$(el).find(".restaurant__name").text().trim();
          })
          .get();

        const sortedNames = names.sort();

        expect(names).to.deep.equal(sortedNames);
      });
  });

  it("옵션이 거리순이면 거리순으로로 필터링 되어 음식점이 로드 되야 한다.", () => {
    // when
    cy.get(".restaurant-filter-container #sorting").select("거리순");

    // then
    cy.get(".restaurant-list")
      .children()
      .then(($els) => {
        const distances = Cypress.$($els)
          .map((index, el) => {
            return Number(
              Cypress.$(el)
                .find(".restaurant__distance")
                .text()
                .trim()
                .replace(/[^0-9]/g, "")
            );
          })
          .get();

        const sortedDistance = distances.sort((a, b) => a - b);

        expect(distances).to.deep.equal(sortedDistance);
      });
  });

  it("선택한 즐겨찾기 탭별로 필터링 되어 음식점이 로드 되야 한다.", () => {
    // when
    const index = 1;
    cy.get(`#restaurant__info__${index} .restaurant__favorite-mark`).click();
    cy.get("#favorite").click();

    // then
    cy.get(`#restaurant__info__${index} .restaurant__name`)
      .invoke("text")
      .then((text) => {
        cy.get(".restaurant-list").should("contain.text", text);
      });
  });
});

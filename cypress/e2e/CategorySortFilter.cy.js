import { SELECT_CATEGORY_MODAL } from "../../src/constants/constant.ts";

describe("category / sort 필터링 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });
  SELECT_CATEGORY_MODAL.forEach((category) => {
    it(`"${category}" 카테고리를 선택하면 해당 카테고리를 지닌 음식점만 보여진다.`, () => {
      cy.get("select#category-filter").select(category);

      cy.get("li.restaurant").each((el) => {
        cy.wrap(el).find(".restaurant__category img").should("have.attr", "alt", category);
      });
    });
  });

  it("이름순에 맞춰 음식점이 정렬된다.", () => {
    cy.get("select#sorting-filter").select("이름순");

    cy.get("li.restaurant .restaurant__name").then((names) => {
      const nameArray = names.map((_, el) => Cypress.$(el).text()).get();
      const sorted = [...nameArray].sort();

      expect(nameArray).to.deep.equal(sorted);
    });
  });

  it("거리순에 맞춰 음식점이 정렬된다.", () => {
    cy.get("select#sorting-filter").select("거리순");

    cy.get("li.restaurant .restaurant__distance").then((distances) => {
      const distanceArray = distances.map((_, el) => parseInt(Cypress.$(el).text().match(/\d+/)?.[0] || "0")).get();

      const sorted = [...distanceArray].sort((a, b) => a - b);

      expect(distanceArray).to.deep.equal(sorted);
    });
  });
});

describe("음식점 목록 필터 및 정렬 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("카테고리 필터링: '한식'을 선택하면 한식 음식점만 표시된다.", () => {
    // 필터 드롭다운에서 '한식' 선택
    cy.get('[data-testid="filter-category"]').select("한식");

    // 아이콘 이미지 alt 속성이 'KOREAN'인지 확인
    cy.get('[data-testid="restaurant-list"] li').each(($el) => {
      cy.wrap($el)
        .find("img.category-icon")
        .should("have.attr", "alt", "KOREAN");
    });
  });

  it("정렬: 이름순 정렬 선택 시 음식점 목록이 가나다 순으로 정렬된다.", () => {
    cy.get('[data-testid="filter-sortBy"]').select("NAME");

    cy.get('[data-testid="restaurant-list"] li').then(($items) => {
      const names = $items.toArray().map((el) => {
        return (
          el
            .querySelector('[data-testid="restaurant-item-name"]')
            ?.textContent?.trim() || ""
        );
      });
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sortedNames);
    });
  });

  it("정렬: 거리순 정렬 선택 시 음식점 목록이 거리 오름차순으로 정렬된다.", () => {
    cy.get('[data-testid="filter-sortBy"]').select("DISTANCE");
    cy.get('[data-testid="restaurant-list"] li').then(($items) => {
      const distances = $items.toArray().map((el) => {
        const span = el.querySelector(
          '[data-testid="restaurant-item-distance"]'
        );
        return span ? Number(span.getAttribute("data-distance")) : NaN;
      });
      const sortedDistances = [...distances].sort((a, b) => a - b);
      expect(distances).to.deep.equal(sortedDistances);
    });
  });

  it("필터와 정렬 조합: '한식' 필터와 'NAME' 정렬 선택 시, 한식 음식점이 이름 순으로 정렬되어 표시된다.", () => {
    // '한식', '이름' 옵션 선택
    cy.get('[data-testid="filter-category"]').select("한식");
    cy.get('[data-testid="filter-sortBy"]').select("NAME");

    // 음식점 목록에서 이름을 추출하여 가나다 순으로 정렬되었는지 확인
    cy.get('[data-testid="restaurant-list"] li').then(($items) => {
      const names = $items.toArray().map((el) => {
        return (
          el
            .querySelector('[data-testid="restaurant-item-name"]')
            ?.textContent?.trim() || ""
        );
      });
      const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
      expect(names).to.deep.equal(sortedNames);
    });

    // 음식점 목록에서 아이콘 이미지 alt 속성이 'KOREAN'인지 확인
    cy.get('[data-testid="restaurant-list"] li').each(($el) => {
      cy.wrap($el)
        .find("img.category-icon")
        .should("have.attr", "alt", "KOREAN");
    });
  });
});

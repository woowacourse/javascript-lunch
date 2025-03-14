describe("Filter 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("카테고리 중 하나를 선택하면 해당하는 카테고리의 음식점만 표시된다.", () => {
    const selectedCategory = "한식";
    cy.get("select[id='category-filter']").select(selectedCategory);
    cy.get(".restaurant__category > img").should(
      "have.attr",
      "alt",
      selectedCategory
    );
  });

  it("정렬 기준을 이름순으로 선택하면 이름순으로 정렬된 음식점 목록이 표시된다.", () => {
    const selectedSorting = "이름순";
    cy.get("select[id='sorting-filter']").select(selectedSorting);
    cy.get(".restaurant__name").then((names) => {
      const nameTextList = [...names].map((name) => name.textContent);
      expect(nameTextList).to.deep.equal([
        "도스타코스 선릉점",
        "이태리키친",
        "잇쇼우",
        "친친",
        "피양콩할마니",
        "호야빈 삼성점",
      ]);
    });
  });

  it("정렬 기준을 거리순으로 선택하면 거리순으로 정렬된 음식점 목록이 표시된다.", () => {
    const selectedSorting = "거리순";
    cy.get("select[id='sorting-filter']").select(selectedSorting);
    cy.get(".restaurant__distance").then((distances) => {
      const distanceTextList = [...distances].map(
        (distance) => distance.textContent
      );
      expect(distanceTextList).to.deep.equal([
        "캠퍼스부터 5분 내",
        "캠퍼스부터 5분 내",
        "캠퍼스부터 10분 내",
        "캠퍼스부터 10분 내",
        "캠퍼스부터 15분 내",
        "캠퍼스부터 20분 내",
      ]);
    });
  });
});

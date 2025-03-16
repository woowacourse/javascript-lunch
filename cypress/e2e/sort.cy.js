describe("sorting 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("초기 10개 레스토랑의 이름이 이름순과 거리순으로 정렬할 수 있어야 한다.", () => {
    const expectedNameByDistance = [
      "수라간",
      "잇쇼우",
      "BBQ치킨",
      "비스트로루카",
      "스시히로바",
      "친친",
      "피양콩할마니",
      "홍콩반점0410",
      "이태리키친",
      "타이팟",
    ];
    const expectedName = [
      "비스트로루카",
      "수라간",
      "스시히로바",
      "이태리키친",
      "잇쇼우",
      "친친",
      "타이팟",
      "피양콩할마니",
      "홍콩반점0410",
      "BBQ치킨",
    ];

    // 이름순 정렬 확인
    cy.get("#sorting-filter").select("distance");
    cy.get("#restaurant-list")
      .children()
      .each(($el, index) => {
        if (index < 10) {
          cy.wrap($el)
            .find(".restaurant__name.text-subtitle")
            .invoke("text")
            .then((text) => {
              const expected = expectedNameByDistance[index]; // 예상된 이름 리스트에서 가져오기

              expect(text.trim()).to.eq(expected);
            });
        }
      });

    // 거리순 정렬 확인
    cy.get("#sorting-filter").select("name");
    cy.get("#restaurant-list")
      .children()
      .each(($el, index) => {
        if (index < 10) {
          cy.wrap($el)
            .find(".restaurant__name.text-subtitle")
            .invoke("text")
            .then((text) => {
              const expected = expectedName[index]; // 예상된 거리 정렬 리스트에서 가져오기

              expect(text.trim()).to.eq(expected);
            });
        }
      });
  });
});

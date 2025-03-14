const RESTAURANT_NAMES = [
  "피양콩할마니",
  "친친",
  "잇쇼우",
  "이태리키친",
  "수라간",
  "홍콩반점0410",
  "스시히로바",
  "타이팟",
  "비스트로루카",
  "BBQ치킨",
];
describe("필터링 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("초기 10개 레스토랑의 이름이 올바르게 표시되는지 확인", () => {
    cy.get("#restaurant-list")
      .children()
      .each(($el, index) => {
        if (index < 10) {
          cy.wrap($el)
            .find(".restaurant__name.text-subtitle")
            .invoke("text")
            .then((text) => {
              const expectedName = RESTAURANT_NAMES[index]; // 순수 배열에서 가져온 예상 이름
              cy.log(
                `레스토랑 ${
                  index + 1
                }: ${text.trim()} (Expected: ${expectedName})`
              );
              expect(text.trim()).to.eq(expectedName); // 실제 UI와 비교
            });
        }
      });
  });

  it("초기 10개 레스토랑에서 즐겨찾기를 선택하고 필터링이 정상적으로 동작하는지 확인", () => {
    cy.get(
      '[id="잇쇼우"] > .restaurant__info > .restaurant__header > .favorite-icon'
    ).click();
    cy.get(
      '[id="수라간"] > .restaurant__info > .restaurant__header > .favorite-icon'
    ).click();
    cy.get(
      '[id="스시히로바"] > .restaurant__info > .restaurant__header > .favorite-icon'
    ).click();
    cy.get(
      '[id="비스트로루카"] > .restaurant__info > .restaurant__header > .favorite-icon'
    ).click();

    cy.get('[for="filter-favorite"]').click();

    cy.get("#restaurant-list").children().should("have.length", 4);

    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("비스트로루카");
      });

    cy.get("#restaurant-list")
      .children()
      .eq(1)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("수라간");
      });

    cy.get("#restaurant-list")
      .children()
      .eq(2)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("스시히로바");
      });

    cy.get("#restaurant-list")
      .children()
      .eq(3)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("잇쇼우");
      });
  });
  it("한식을 골랐을떄, 수라간이 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("한식");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("수라간");
      });
  });
  it("중식을 골랐을떄, 친친이 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("중식");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("친친");
      });
  });

  it("일식을 골랐을떄, 스시히로바가 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("일식");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("스시히로바");
      });
  });

  it("양식을 골랐을떄, 비스트로루카가 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("양식");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("비스트로루카");
      });
  });

  it("아시안을 골랐을떄, 타이팟이 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("아시안");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("타이팟");
      });
  });

  it("기타을 골랐을떄, BBQ치킨이 첫 요소로 있어야함", () => {
    cy.get("#category-filter").select("기타");
    cy.get("#restaurant-list")
      .children()
      .eq(0)
      .find(".restaurant__name.text-subtitle")
      .invoke("text")
      .then((text) => {
        expect(text.trim()).to.eq("BBQ치킨");
      });
  });
});

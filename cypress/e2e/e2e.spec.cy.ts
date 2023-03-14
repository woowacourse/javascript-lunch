describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(365, 945);
  });

  const addNewRestaurant = (
    name: string,
    distance: "5" | "10" | "15" | "20" | "30"
  ) => {
    cy.get(".gnb__button").click();
    cy.get("#category").select("일식");
    cy.get("#name").type(name);
    cy.get("#distance").select(distance);
    cy.get("#description").type("비싸지만 맛있음!");
    cy.get("#new-restaurant-form").submit();
  };

  it("새로운 음식점을 추가하면 화면에 해당 음식점이 추가된다.", () => {
    addNewRestaurant("스노우 폭스", "5");

    cy.get(".restaurant-list").children().should("contain.text", "스노우 폭스");
  });

  it("음식점을 삭제하면 화면에서 해당 음식점이 사라진다.", () => {
    cy.get(".restaurant-list-container #restaurant이태리키친").click();
    cy.get(".restaurant-info-modal-button .button--secondary").click();
    cy.get(".restaurant-list")
      .children()
      .should("not.contain.text", "이태리키친");
  });

  it("즐겨찾는 음식점 탭 버튼을 클릭하면 화면에서 즐겨찾는 음식점만 정렬된다.", () => {
    cy.get(".restaurant-list-container #restaurant친친 .favorite-icon").click();
    cy.get("#tab-button2").click();
    cy.get(".restaurant-list").children().should("contain.text", "친친");
    cy.get(".restaurant-list").children().should("have.length", "1");
  });

  it("카테고리를 선택하면(전체 제외) 선택한 카테고리의 음식점만 정렬된다.", () => {
    cy.get("#category-filter").select("일식");
    cy.get(".restaurant-list").children().should("contain.text", "잇쇼우");
  });

  it("거리순을 선택하면 거리순으로 음식점들이 정렬된다.", () => {
    addNewRestaurant("ㄱ", "20");

    cy.get(".restaurant-list").children().first().should("contain.text", "ㄱ");
    cy.get("#sorting-filter").select("거리순");
    cy.get(".restaurant-list")
      .children()
      .first()
      .should("contain.text", "도스타코스 선릉점");
  });
});

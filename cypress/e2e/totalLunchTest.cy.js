describe("점심 뭐 먹지 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(420, 930);
  });

  it("식당 정보 입력 후 목록에 추가할 수 있다.", () => {
    restaurantInput(
      "일식",
      "타쿠미",
      "5",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ",
      "http://patrick-site.com"
    );
    cy.get(".restaurant__name").should("have.text", "타쿠미");
    cy.get(".restaurant__distance").should("contain.text", "5");
    cy.get(".restaurant__description").should(
      "have.text",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ"
    );
  });

  it("식당 목록에서 즐겨찾기 버튼을 누르면 즐겨찾기 탭에서 확인할 수 있다.", () => {
    restaurantInput(
      "양식",
      "도넛",
      "30",
      "도넛 먹고싶당 ㅎㅎ",
      "http://도넛.com"
    );

    cy.get(".restaurant_favorite0").click();
    cy.get(".favorite-restaurant").click();
    cy.get(".restaurant__name").should("contain", "도넛");
  });

  it("식당을 카테고리별 필터링을 할 수 있다.", () => {
    restaurantInput(
      "일식",
      "타쿠미",
      "5",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ",
      "http://patrick-site.com"
    );

    cy.get("#category-filter").select("한식");
    cy.get(".restaurant-list").should("not.contain", "타쿠미");

    cy.get("#category-filter").select("일식");
    cy.get(".restaurant-list").should("contain", "타쿠미");
  });

  it("식당을 이름순으로 정렬할 수 있다.", () => {
    restaurantInput(
      "일식",
      "타쿠미",
      "5",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ",
      "http://patrick-site.com"
    );
    restaurantInput(
      "한식",
      "할머니보쌈",
      "15",
      "선릉캠퍼스 근처 보쌈 맛집",
      "http://보쌈.com"
    );
    restaurantInput(
      "양식",
      "도넛",
      "30",
      "도넛 먹고싶당 ㅎㅎ",
      "http://도넛.com"
    );

    cy.get(".restaurant-list")
      .first()
      .find(".restaurant__name")
      .should("contain", "도넛");
  });

  it("식당을 클릭하면 식당의 상세 정보를 확인할 수 있다.", () => {
    restaurantInput(
      "일식",
      "타쿠미",
      "5",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ",
      "http://patrick-site.com"
    );

    cy.get(".restaurant").click();
    cy.get(".modal-detail-restaurant__name").should("contain", "타쿠미");
  });

  it("식당 상세정보 창에서 즐겨찾기 버튼 클릭 시 즐겨찾기 탭에서 확인할 수 있다.", () => {
    restaurantInput(
      "양식",
      "도넛",
      "30",
      "도넛 먹고싶당 ㅎㅎ",
      "http://도넛.com"
    );

    cy.get(".restaurant").click();
    cy.get(".modla--restaurant_image").click();
    cy.get(".button--close").click();
    cy.get(".favorite-restaurant").click();

    cy.get(".restaurant__name").should("contain", "도넛");
  });

  it("식당 상세정보 창에서 삭제하기 버튼 클릭 시 목록에서 삭제할 수 있다.", () => {
    restaurantInput(
      "양식",
      "도넛",
      "30",
      "도넛 먹고싶당 ㅎㅎ",
      "http://도넛.com"
    );
    cy.get(".restaurant__name").should("contain", "도넛");

    cy.contains("도넛").click();
    cy.get(".button--delete").click();

    cy.get(".restaurant-list").should("not.contain", "도넛");
  });

  it("새로고침 후에도 정보를 유지할 수 있다.", () => {
    restaurantInput(
      "일식",
      "타쿠미",
      "5",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ",
      "http://patrick-site.com"
    );

    cy.reload();

    cy.get(".restaurant__name").should("have.text", "타쿠미");
    cy.get(".restaurant__distance").should("contain.text", "5");
    cy.get(".restaurant__description").should(
      "have.text",
      "타쿠미와 스노우보드 타고 일본 라면 먹으러 갔던 기억이 생생하다. 다시 만나면 그때처럼 놀고싶다 ㅎㅎ"
    );

    it("즐겨찾기 목록에 추가하고 새로고침 정보를 유지할 수 있다.", () => {
      restaurantInput(
        "양식",
        "도넛",
        "30",
        "도넛 먹고싶당 ㅎㅎ",
        "http://도넛.com"
      );

      cy.get(".restaurant_favorite0").click();

      cy.reload();

      cy.get(".favorite-restaurant").click();
      cy.get(".restaurant__name").should("contain", "도넛");
    });
  });
});

function restaurantInput(category, name, distance, description, link) {
  cy.get(".gnb__button").click();
  cy.get("#category").select(category);
  cy.get("#name").type(name);
  cy.get("#distance").select(distance);
  cy.get("#description").type(description);
  cy.get("#link").type(link);
  cy.contains("추가하기").click();
}

/// <reference types="cypress" />

describe("탭바 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("자주가는 음식점 탭바가 선택될 시, 모든 음식점 목록이 사라진다.", () => {
    //when
    cy.get(":nth-child(2).tab-bar__item").click();

    //then
    cy.get("#restaurant-list-ul").should("be.hidden");
  });

  it("자주가는 음식점 탭바가 선택될 시, 카테고리 셀렉트박스들이 사라진다.", () => {
    //when
    cy.get(":nth-child(2).tab-bar__item").click();

    //then
    cy.get("#filter-container").should("be.hidden");
  });

  it("모든 음식점 탭바가 선택될 시, 자주가는 음식점 목록이 사라진다.", () => {
    //when
    cy.get(":nth-child(2).tab-bar__item").click();
    cy.get(":nth-child(1).tab-bar__item").click();

    //then
    cy.get("#favorite-restaurant-list-ul").should("be.hidden");
  });
});

describe("음식점 추가 및 삭제", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("새로운 음식점을 추가할 수 있다.", () => {
    //given

    const category = "한식";
    const name = "가정식";
    const distance = "5";
    const descript = "가정식을 먹을 수 있는 곳";
    const url = "delicious.com";

    //when
    const addButton = cy.get("#add-restaurant-button > img");
    addButton.click();

    cy.get(":nth-child(1) > .select-box").select(category);
    cy.get("#name").type(name);
    cy.get(":nth-child(3) > .select-box").select(distance);
    cy.get("#description").type(descript);
    cy.get("#link").type(url);
    cy.get(".button--primary").click();

    //then
    // TODO: 카테고리 이미지 확인
    cy.get(
      "#restaurant-list-ul > :nth-child(1) > .restaurant__info > .restaurant__name"
    ).should("have.text", name);
    cy.get(
      "#restaurant-list-ul > :nth-child(1) > .restaurant__info > .restaurant__distance"
    ).should("have.text", `캠퍼스로부터 ${distance}분 내`);
    cy.get(
      "#restaurant-list-ul > :nth-child(1) > .restaurant__info > .restaurant__description"
    ).should("have.text", descript);
  });
});

describe("즐겨찾기 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });
  it("모든 음식점에서 자주 가는 음식점을 등록할 수 있다.", () => {
    //given
    cy.get(".tab-bar__item--on").click();
    const favoriteTargets = [
      cy.get(":nth-child(1) > .favorite-button > img"),
      cy.get(":nth-child(3) > .favorite-button > img"),
      cy.get(":nth-child(5) > .favorite-button > img"),
    ];

    //when
    favoriteTargets.forEach((favorite) => favorite.click());

    //then
    cy.get(".tab-bar__item--off").click();

    cy.get(
      "#favorite-restaurant-list-ul > :nth-child(1) > .restaurant__info > .restaurant__name"
    ).should("have.text", "도쿄라면");
    cy.get(
      "#favorite-restaurant-list-ul > :nth-child(2) > .restaurant__info > .restaurant__name"
    ).should("have.text", "방콕맛집");
    cy.get(
      "#favorite-restaurant-list-ul > :nth-child(3) > .restaurant__info > .restaurant__name"
    ).should("have.text", "프렌치빌");
  });
});

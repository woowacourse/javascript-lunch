import { ERROR_MESSAGE } from "../../../src/settings/errorMessages";

describe("안되는 시나리오(경고창 나오는지 테스트)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
    cy.wait(2000);
  });

  it("모달 열기 테스트, 음식점 추가(음식점 이름을 15자를 입력하여 경고창을 발생시킨다.)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력(이름 12글자 초과)
    cy.get("#category").select("한식");
    cy.get("#name").type("대충이름이긴한식부페같은것마아앙");
    cy.get("#distance").select("5");
    cy.get(".restaurant-add-form").submit();
    // 경고창 확인

    cy.get(".toast")
      .should("be.visible")
      .should("contain", ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH);

    // 재입력(올바른 입력 테스트)
    cy.get("#name").clear();
    cy.get("#name").type("더휴웨딩몰");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);
  });
  it("모달 열기 테스트, 음식점 추가(음식점 이름이 중복된다는 경고창을 발생시킨다.)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력(이름 12글자 초과)
    cy.get("#category").select("일식");
    cy.get("#name").type("잇쇼우");
    cy.get("#distance").select("5");
    cy.get(".restaurant-add-form").submit();
    // 경고창 확인

    cy.get(".toast")
      .should("be.visible")
      .should("contain", ERROR_MESSAGE.DUPLICATE_RESTAURANT);

    // 재입력(올바른 입력 테스트)
    cy.get("#name").clear();
    cy.get("#name").type("더휴웨딩몰");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);
  });
  it("모달 열기 테스트, 음식점 추가(음식점 설명이 300자를 초과해서 경고창을 발생시킨다.)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력(설명 300글자 초과)
    cy.get("#category").select("한식");
    cy.get("#name").type("안녕하세요");
    cy.get("#distance").select("5");
    cy.get("#description").type(
      Array.from({ length: 301 }, () => "a").join("")
    );
    cy.get(".restaurant-add-form").submit();
    // 경고창 확인
    cy.get(".toast")
      .should("be.visible")
      .should("contain", ERROR_MESSAGE.INVALID_RESTAURANT_DESCRIPTION_LENGTH);

    // 재입력(올바른 입력 테스트)
    cy.get("#description").clear();
    cy.get("#description").type("강추!");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);
  });

  it("모달 열기 테스트, 음식점 추가(음식점 링크가 300자를 초과해서 경고창을 발생시킨다.)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");
    cy.get(".restaurant-add-form").submit();
    // 폼 데이터 입력(링크 300글자 초과)
    cy.get("#category").select("한식");
    cy.get("#name").type("맛집");
    cy.get("#distance").select("10");
    cy.get("#link").type(Array.from({ length: 301 }, () => "a").join(""));
    cy.get(".restaurant-add-form").submit();
    // 경고창 확인
    cy.get(".toast")
      .should("be.visible")
      .should("contain", ERROR_MESSAGE.INVALID_RESTAURANT_LINK_LENGTH);

    // 재입력(올바른 입력 테스트)
    cy.get("#link").clear();
    cy.get("#link").type("강추!");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 11);
  });
});

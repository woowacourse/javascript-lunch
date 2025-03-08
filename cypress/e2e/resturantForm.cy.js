import { ERROR_MESSAGE } from "../../src/settings/settings.js";

describe("음식점 추가가 잘 되는지 확인하는 시나리오", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("모달 열기 닫기 테스트, 음식점 추가(카테고리, 이름, 거리 입력)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 모달 닫기
    cy.get(".cancel-button").click();
    cy.get(".modal").should("not.be.visible");

    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("중식");
    cy.get("#name").type("마담밍");
    cy.get("#distance").select("20");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 1);
  });

  it("모달 열기 테스트, 음식점 추가 2개", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("양식");
    cy.get("#name").type("타코집");
    cy.get("#distance").select("10");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 1);

    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력
    cy.get("#category").select("일식");
    cy.get("#name").type("잇쇼우");
    cy.get("#distance").select("15");

    // 폼 제출
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 2);
  });
});

describe("안되는 시나리오(경고창 나오는지 테스트)", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.window().then((win) => {
      cy.stub(win, "alert").as("alertStub");
    });
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

    // 경고창 확인
    cy.get(".restaurant-add-form").submit();
    cy.get("@alertStub").should(
      "have.been.calledOnceWith",
      ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH
    );

    // 재입력(올바른 입력 테스트)
    cy.get("#name").clear();
    cy.get("#name").type("더휴웨딩몰");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 1);
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

    // 경고창 확인
    cy.get(".restaurant-add-form").submit();
    cy.get("@alertStub").should(
      "have.been.calledOnceWith",
      ERROR_MESSAGE.INVALID_RESTAURANT_DESCRIPTION_LENGTH
    );

    // 재입력(올바른 입력 테스트)
    cy.get("#description").clear();
    cy.get("#description").type("강추!");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 1);
  });

  it("모달 열기 테스트, 음식점 추가(음식점 링크가 300자를 초과해서 경고창을 발생시킨다.)", () => {
    // 모달 띄우기
    cy.get(".gnb__button").click();
    cy.get(".modal").should("be.visible");
    cy.get(".restaurant-add-form").should("exist");

    // 폼 데이터 입력(링크 300글자 초과)
    cy.get("#category").select("한식");
    cy.get("#name").type("맛집");
    cy.get("#distance").select("10");
    cy.get("#link").type(Array.from({ length: 301 }, () => "a").join(""));

    // 경고창 확인
    cy.get(".restaurant-add-form").submit();
    cy.get("@alertStub").should(
      "have.been.calledOnceWith",
      ERROR_MESSAGE.INVALID_RESTAURANT_LINK_LENGTH
    );

    // 재입력(올바른 입력 테스트)
    cy.get("#link").clear();
    cy.get("#link").type("강추!");
    cy.get(".restaurant-add-form").submit();
    cy.get(".restaurant").should("have.length", 1);
  });
});

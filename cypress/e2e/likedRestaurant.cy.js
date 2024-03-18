/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import LocalStorageService from "../../src/services/localStorageService";

describe("즐겨찾기 기능 테스트", () => {
  context("즐겨찾기 추가/취소 확인 (리스트, 모달내)", () => {
    const data = [
      {
        id: 0,
        category: "한식",
        name: "피양콩할마니",
        distance: 10,
        description:
          "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. ",
        link: "http://naver.com",
        isLike: false,
      },
      {
        id: 1,
        category: "아시안",
        name: "호아빈 삼성점",
        distance: 5,
        description: "푸짐한 양에 국물이 일품인 쌀국수",
        link: "http://naver.com",
        isLike: true,
      },
    ];
    beforeEach(() => {
      cy.visit("http://localhost:8080/");
      LocalStorageService.setData(data);
    });

    it("즐겨찾기 추가 기능 테스트 (리스트)", () => {
      cy.get(".restaurant#0").find(".restaurant__like-button").get(".unliked");

      cy.get(".restaurant#0").find(".restaurant__like-button").click();

      cy.get(".restaurant#0").find(".restaurant__like-button").get(".liked");
    });

    it("즐겨찾기 취소 기능 테스트 (리스트)", () => {
      cy.get(".restaurant#1").find(".restaurant__like-button").get(".liked");

      cy.get(".restaurant#1").find(".restaurant__like-button").click();

      cy.get(".restaurant#1").find(".restaurant__like-button").get(".unliked");
    });

    it("즐겨찾기 추가 기능 테스트 (모달 내, 리스트)", () => {
      cy.get(".restaurant#0").click();
      cy.get(".modal__like-button").get(".unliked");
      cy.get(".restaurant#0").find(".restaurant__like-button").get(".unliked");

      cy.get(".modal__like-button").click();

      cy.get(".modal__like-button").get(".liked");
      cy.get(".restaurant#0").find(".restaurant__like-button").get(".liked");
    });

    it("즐겨찾기 취소 기능 테스트 (모달 내, 리스트)", () => {
      cy.get(".restaurant#1").click();
      cy.get(".modal__like-button").get(".liked");
      cy.get(".restaurant#1").find(".restaurant__like-button").get(".liked");

      cy.get(".modal__like-button").click();

      cy.get(".modal__like-button").get(".unliked");
      cy.get(".restaurant#1").find(".restaurant__like-button").get(".unliked");
    });
  });
});

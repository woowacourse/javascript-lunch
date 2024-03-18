/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import LocalStorageService from "../../src/services/localStorageService";

describe("즐겨찾기 탭 테스트", () => {
  context("전체/즐겨찾기 리스트 필터링 확인", () => {
    const data = [
      {
        id: 0,
        category: "한식",
        name: "피양콩할마니",
        distance: 10,
        description:
          "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점 피양콩 할마니. 두부를 빼지 않은 되비지를 맛볼 수 있는 곳으로, ‘피양’은 평안도 사투리로 ‘평양’을 의미한다. 딸과 함께 운영하는 이곳에선 맷돌로 직접 간 콩만을 사용하며, 일체의 조미료를 넣지 않은 건강식을 선보인다. ",
        link: "http://naver.com",
        isLike: true,
      },
      {
        id: 1,
        category: "아시안",
        name: "호아빈 삼성점",
        distance: 5,
        description: "푸짐한 양에 국물이 일품인 쌀국수",
        link: "http://naver.com",
        isLike: false,
      },
    ];
    beforeEach(() => {
      cy.visit("http://localhost:8080/");
      LocalStorageService.setData(data);
    });

    it("탭 전환 확인 (전체 -> 즐겨찾기)", () => {
      cy.get(".tab-item.current")
        .invoke("attr", "data-tab")
        .should("eq", "all");

      cy.get(".tab-item:not(.current)").click();

      cy.get(".tab-item.current")
        .invoke("attr", "data-tab")
        .should("eq", "liked");
    });

    it("탭 전환 확인 (즐겨찾기 -> 전체)", () => {
      cy.get(".tab-item:not(.current)").click();
      cy.get(".tab-item.current")
        .invoke("attr", "data-tab")
        .should("eq", "liked");

      cy.get(".tab-item:not(.current)").click();
      cy.get(".tab-item.current")
        .invoke("attr", "data-tab")
        .should("eq", "all");
    });

    it("즐겨찾기 탭 내부 데이터 확인", () => {
      cy.get(".tab-item:not(.current)").click();
      cy.get(".tab-item.current")
        .invoke("attr", "data-tab")
        .should("eq", "liked");

      cy.get(".restaurant").each(($restaurantItem) => {
        cy.wrap($restaurantItem)
          .find(".restaurant__like-button")
          .find("img")
          .then(($likeButton) => {
            expect($likeButton).to.have.class("liked");
            expect($likeButton).not.to.have.class("unliked");
          });
      });
    });
  });
});

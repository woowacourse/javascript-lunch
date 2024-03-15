/* eslint-disable max-lines-per-function */
/* eslint-disable no-undef */
import LocalStorageService from "../../src/services/localStorageService";

describe("레스토랑 정보 확인 테스트", () => {
  context("모달 내 입력 폼 확인", () => {
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
        distance: 15,
        description: "푸짐한 양에 국물이 일품인 쌀국수",
        link: "http://naver.com",
        isLike: true,
      },
    ];
    beforeEach(() => {
      cy.visit("http://localhost:8080/");
      LocalStorageService.setData(data);
    });

    it("레스토랑 리스트 데이터 확인", () => {
      cy.get(".restaurant").each(($restaurantItem) => {
        cy.wrap($restaurantItem).find(".restaurant__category").should("exist"); // 레스토랑 이름이 있는지 확인
        cy.wrap($restaurantItem).find(".restaurant__name").should("exist"); // 레스토랑 이름이 있는지 확인
        cy.wrap($restaurantItem).find(".restaurant__distance").should("exist"); // 위치가 있는지 확인
      });
    });

    it("레스토랑 디테일 모달 창 열기", () => {
      // when
      cy.get(".restaurant#0").click();

      // then
      cy.get(".detail-modal-container").should("be.visible");
    });

    it("레스토랑 디테일 모달 창 닫기 (닫기 버튼)", () => {
      // given
      cy.get(".restaurant#0").click();

      // when
      cy.get("button").contains("닫기").click();

      // then
      cy.get(".detail-modal-container").should("not.exist");
    });

    it("레스토랑 디테일 모달 창 닫기 (다이머)", () => {
      // given
      cy.get(".restaurant#0").click();

      // when
      cy.get(".detail-modal-backdrop").click({ force: true });

      // then
      cy.get(".detail-modal-container").should("not.exist");
    });

    it("레스토랑 디테일 모달 정보 확인", () => {
      cy.get(".restaurant#0").click();

      cy.get(".detail-modal")
        .find(".category-icon")
        .should("have.attr", "alt", data[0].category);
      cy.get(".detail-modal")
        .find(".restaurant__name")
        .should("have.text", data[0].name);
      cy.get(".detail-modal")
        .find(".restaurant__distance")
        .should("contain.text", data[0].distance);
      cy.get(".detail-modal")
        .find(".restaurant__description")
        .should("have.text", data[0].description);
      cy.get(".detail-modal")
        .find(".restaurant__link")
        .should("have.text", data[0].link);
    });

    it("레스토랑 삭제 기능 확인", () => {
      cy.get(".restaurant#0").click();

      cy.get("button").contains("삭제하기").click();

      cy.get(".detail-modal-container").should("not.exist");
      cy.contains(data[0].name).should("not.exist");
    });
  });
});

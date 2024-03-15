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

    it("카테고리 필터링 기능 테스트 (한식)", () => {
      cy.get("select[id=category-filter]").select("한식");

      cy.contains(data[0].name).should("exist");
      cy.contains(data[1].name).should("not.exist");
    });

    it("카테고리 필터링 기능 테스트 (아시안)", () => {
      cy.get("select[id=category-filter]").select("아시안");

      cy.contains(data[0].name).should("not.exist");
      cy.contains(data[1].name).should("exist");
    });

    it("이름순 솔팅 기능 테스트", () => {
      cy.get("select[id=sorting-filter]").select("이름순");

      const names = [];
      cy.get(".restaurant__name")
        .each(($restaurantName) => {
          names.push($restaurantName.text().trim());
        })
        .then(() => {
          const sortedNames = [...names].sort((a, b) => a.localeCompare(b));
          expect(names).to.deep.equal(sortedNames);
        });
    });

    it("거리순 솔팅 기능 테스트", () => {
      cy.get("select[id=sorting-filter]").select("거리순");

      const distances = [];
      cy.get(".restaurant__distance")
        .each(($restaurantDistance) => {
          const distanceText = $restaurantDistance.text().trim();
          distances.push(parseFloat(distanceText.match(/\d+/)));
        })
        .then(() => {
          const sortedDistances = [...distances].sort((a, b) => a - b);
          expect(distances).to.deep.equal(sortedDistances);
        });
    });
  });
});

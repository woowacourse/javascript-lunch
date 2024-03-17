import { RESTAURANTS_INFOS } from "../fixtures/restaurantInfos";

describe("LunchApp(점심 뭐 먹지) E2E 테스트", () => {
  beforeEach(() => {
    cy.viewport(550, 1000);
    cy.visit("http://localhost:8080/");
    localStorage.setItem("restaurants", JSON.stringify(RESTAURANTS_INFOS));
  });

  context("첫 방문 시 동작 확인", () => {
    it("처음 방문했을 때 기본 요소(header와 main 태그)가 존재한다.", () => {
      cy.get("header").should("be.visible");
      cy.get("main").should("be.visible");
    });

    it("처음 방문했을 때 header에 '점심 뭐 먹지'라는 텍스트가 존재한다.", () => {
      cy.get("header").contains("점심 뭐 먹지");
    });

    it("처음 방문했을 때 음식점 등록 모달과 음식점 상세 정보 모달이 보이지 않는다.", () => {
      cy.get("restaurant-form").should("not.be.visible");
      cy.get("restaurant-detail").should("not.be.visible");
    });

    it("처음 방문했을 때 로컬 스토리지에 저장된 데이터의 수 만큼 restaurant item이 존재한다.", () => {
      cy.get("restaurant-item").should("have.length", RESTAURANTS_INFOS.length);
    });
  });

  context("요소 클릭 시 동작 확인", () => {
    it("첫번째 restaurant item을 클릭하면 해당 레스토랑의 정보가 모달로 나타난다.", () => {
      cy.get("restaurant-item").first().click();
      cy.get("restaurant-detail").should("be.visible");

      cy.get("restaurant-detail").contains(RESTAURANTS_INFOS[0].name);
      cy.get("restaurant-detail").contains(RESTAURANTS_INFOS[0].description);
      cy.get("restaurant-detail").contains(RESTAURANTS_INFOS[0].link);
    });

    it("음식점 등록 버튼을 클릭하면 음식점 등록 모달이 나타난다.", () => {
      cy.get("#add-button").click();
      cy.get("restaurant-form").should("be.visible");
    });

    it("카테고리 필터에서 한식을 선택하면 한식 카테고리에 해당하는 음식점만 보여진다.", () => {
      cy.get("#category-filter-select").select("한식");
      cy.get("restaurant-item").should("have.length", 2);
    });

    it("정렬 필터에서 거리순을 선택하면 거리순으로 음식점이 정렬된다.", () => {
      cy.get("#sorting-filter-select").select("거리순");
      cy.get("restaurant-item").first().contains(RESTAURANTS_INFOS[5].name);
    });
  });

  context("자주 가는 음식점 관련 기능 확인", () => {
    it("자주 가는 음식점이 등록되지 않은 상태에서 자주 가는 음식점 탭을 클릭하면 restaurant item이 나타나지 않는다.", () => {
      cy.get("#tab-item-favorite").click();
      cy.get("restaurant-item").should("not.exist");
    });

    it("별 아이콘을 클릭하면 해당 음식점의 별 아이콘이 색칠된다.", () => {
      cy.get("restaurant-item").first().find(".favorite-icon-img").click();
      cy.get("restaurant-item")
        .first()
        .find(".favorite-icon-img")
        .should("have.attr", "src", "./filled-favorite-icon.png");
    });

    it("별 아이콘을 두 번 클릭하면 해당 음식점의 별 아이콘이 색칠이 해제된다.", () => {
      cy.get("restaurant-item").first().find(".favorite-icon-img").click();
      cy.get("restaurant-item").first().find(".favorite-icon-img").click();
      cy.get("restaurant-item")
        .first()
        .find(".favorite-icon-img")
        .should("have.attr", "src", "./blank-favorite-icon.png");
    });

    it("자주 가는 음식점을 등록하면 자주 가는 음식점 탭에 해당 음식점이 추가된다.", () => {
      cy.get("restaurant-item").first().find(".favorite-icon-img").click();
      cy.get("#tab-item-favorite").click();
      cy.get("restaurant-item").should("have.length", 1);
    });

    it("자주 가는 음식점을 등록하면 해당 정보는 새로고침 후에도 유지된다.", () => {
      cy.get("restaurant-item").first().find(".favorite-icon-img").click();
      cy.reload();
      cy.get("restaurant-item")
        .first()
        .find(".favorite-icon-img")
        .should("have.attr", "src", "./filled-favorite-icon.png");
    });
  });

  context("음식점 정보 조작 관련 기능 확인", () => {
    it("음식점을 등록하면 등록한 음식점이 restaurant item에 추가된다.", () => {
      cy.get("#add-button").click();
      cy.get("restaurant-form").should("be.visible");

      cy.get(".category-select").select("한식");
      cy.get("#restaurant-name").type("새로운 음식점");
      cy.get(".time-to-reach-select").select("10");
      cy.get("#description").type("맛있는 음식점입니다.");
      cy.get("#link").type("https://www.naver.com/newrestaurant");

      cy.get("button").contains("추가하기").click();
      cy.get("restaurant-item").should(
        "have.length",
        RESTAURANTS_INFOS.length + 1
      );
    });

    it("음식점을 삭제하면 삭제한 음식점 정보를 담은 restaurant item이 사라진다.", () => {
      const restaurantName = RESTAURANTS_INFOS[0].name;

      cy.get("restaurant-item").first().contains(restaurantName);

      cy.get("restaurant-item").first().click();
      cy.get("button").contains("삭제하기").click();

      cy.get("restaurant-item").should("not.contain", restaurantName);
    });
  });
});

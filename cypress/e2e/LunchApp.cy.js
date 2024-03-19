import { RESTAURANTS_INFOS } from "../fixtures/restaurantInfos";

describe("LunchApp(점심 뭐 먹지) E2E 테스트", () => {
  beforeEach(() => {
    cy.viewport(550, 1000);
    cy.visit("http://localhost:8080/");
    localStorage.setItem("restaurants", JSON.stringify(RESTAURANTS_INFOS));
  });

  context("첫 방문 시 동작 확인", () => {
    it("웹사이트가 정상적으로 로드된다.", () => {
      cy.get("header").should("be.visible");
      cy.get("main").should("be.visible");
      cy.get("header").contains("점심 뭐 먹지");
    });

    it("음식점 등록 모달과 음식점 상세 정보 모달이 보이지 않는다.", () => {
      cy.get("restaurant-form").should("not.be.visible");
      cy.get("restaurant-detail").should("not.be.visible");
    });

    it("로컬 스토리지에 저장된 데이터의 수 만큼 restaurant item이 존재한다.", () => {
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
      const sortedRestaurants = RESTAURANTS_INFOS.sort(
        (a, b) => a.timeToReach - b.timeToReach
      );

      cy.get("#sorting-filter-select").select("거리순");
      cy.get("restaurant-item").each(($element, index) => {
        cy.wrap($element).contains(sortedRestaurants[index].name);
      });
    });
  });

  context("음식점 상세 정보 모달과의 상호작용 기능 확인", () => {
    it("backdrop을 클릭하여 모달을 닫을 수 있다.", () => {
      cy.get("restaurant-item").first().click();
      cy.get("restaurant-detail").should("be.visible");

      cy.get(".modal-backdrop").filter(":visible").click();
      cy.get("restaurant-detail").should("not.be.visible");
    });

    it("닫기 버튼을 클릭하여 모달을 닫을 수 있다.", () => {
      cy.get("restaurant-item").first().click();
      cy.get("restaurant-detail").should("be.visible");

      cy.get("button").contains("닫기").click();
      cy.get("restaurant-detail").should("not.be.visible");
    });

    it("삭제하기 버튼을 클릭하여 해당 음식점을 삭제할 수 있다.", () => {
      cy.get("restaurant-item").first().click();
      cy.get("button").contains("삭제하기").click();
      cy.on("window:confirm", () => true);
      cy.get("restaurant-item").should(
        "have.length",
        RESTAURANTS_INFOS.length - 1
      );
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
  });

  context("로컬 스토리지에 데이터가 없는 경우", () => {
    beforeEach(() => {
      cy.viewport(550, 1000);
      cy.visit("http://localhost:8080/");
      localStorage.removeItem("restaurants");
    });

    it("음식점 항목이 존재하지 않는다.", () => {
      cy.get("restaurant-item").should("not.exist");
    });

    it("등록된 음식점이 없다는 메시지가 보인다.", () => {
      cy.get(".no-restaurant-item-message").should("be.visible");
    });

    it("자주 가는 음식점 탭을 클릭하면 등록된 음식점이 없다는 메시지가 보인다.", () => {
      cy.get("#tab-item-favorite").click();
      cy.get(".no-restaurant-item-message").should("be.visible");
    });
  });
});

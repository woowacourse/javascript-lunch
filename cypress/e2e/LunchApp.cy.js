import restaurantDetailJson from "../fixtures/test.json";

describe("e2e 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    window.localStorage.setItem(
      "restaurants",
      JSON.stringify(restaurantDetailJson)
    );
  });

  context("초기 접속 테스트", () => {
    it("RestaurantHeader는 접속 시 렌더링이 된다", () => {
      cy.get("restaurant-header").should("be.visible");
    });
    it("HeaderTab은 접속 시 렌더링이 된다", () => {
      cy.get("header-tab").should("be.visible");
    });
    it("filterBar는 접속 시 렌더링이 된다", () => {
      cy.get("filter-bar").should("be.visible");
    });
    it("모달은 접속 시 렌더링이 되지 않는다", () => {
      cy.get("modal-box").should("not.be.visible");
    });
    it("로컬 스토리지 데이터를 잘 가져오는지 확인한다.", () => {
      cy.contains("한식당1").should("be.visible");
      cy.contains("한식당2").should("be.visible");
      cy.contains("중식당1").should("be.visible");
      cy.contains("중식당2").should("be.visible");
      cy.contains("일식당1").should("be.visible");
    });
  });

  context("FilterBar 렌더링 테스트", () => {
    it("FilterBar는 자주 가는 음식점 탭에서는 보이지 않는다", () => {
      cy.get("#selectFavoriteRestaurant").click();
      cy.get("filter-bar").should("not.be.visible");
    });
  });

  context("새로운 레스토랑 추가하기", () => {
    it("RestaurantHeader의 아이콘을 클릭하면 레스토랑을 추가하는 모달창이 생긴다", () => {
      cy.get("#add-button").click();
      cy.get("restaurant-form").should("be.visible");
    });

    it("레스토랑의 이름을 채우지 않으면 레스토랑 추가가 안된다", () => {
      cy.get("#add-button").click();
      cy.get("restaurant-form form").submit();
      cy.get("form").should("exist");
    });

    it("레스토랑의 거리를 선택하지 않으면 레스토랑 추가가 안된다", () => {
      cy.get("#add-button").click();
      cy.get("#name").type("삼겹살 전문점");
      cy.get("restaurant-form form").submit();
      cy.get("form").should("exist");
    });

    it("한식 카테고리의 새로운 식당을 추가한다", () => {
      cy.get("#add-button").click();
      cy.get("#name").type("삼겹살 전문점");
      cy.get("#time-to-reach").select(1);
      cy.get("restaurant-form form").submit();
      cy.get("li.restaurant[data-name='삼겹살 전문점']").should("be.visible");
    });

    it("중식 카테고리의 모든 정보가 입력된 식당을 추가한다", () => {
      cy.get("#add-button").click();
      cy.get("#name").type("짜장면 전문점");
      cy.get("#description").type("진짜 맛있는 짜장면집입니다.");
      cy.get("#link").type("https://naver.com");
      cy.get("#time-to-reach").select(3);
      cy.get("restaurant-form form").submit();
      cy.get("li.restaurant[data-name='짜장면 전문점']").should("be.visible");
      cy.get(
        "li.restaurant[data-name='짜장면 전문점'] .restaurant__description"
      ).should("contain", "진짜 맛있는 짜장면집입니다.");
    });

    context("정렬 기능 테스트", () => {
      it("한식으로 필터링 시 한식당만 보이는지 확인한다", () => {
        cy.get("#category-select").select(1);
        cy.contains("한식당1").should("be.visible");
        cy.contains("한식당2").should("be.visible");
        cy.contains("중식당1").should("not.exist");
        cy.contains("중식당2").should("not.exist");
        cy.contains("일식당1").should("not.exist");
      });

      it("중식으로 필터링 시 중식당만 보이는지 확인한다", () => {
        cy.get("#category-select").select(2);
        cy.contains("한식당1").should("not.exist");
        cy.contains("한식당2").should("not.exist");
        cy.contains("중식당1").should("be.visible");
        cy.contains("중식당2").should("be.visible");
        cy.contains("일식당1").should("not.exist");
      });
    });
  });
});

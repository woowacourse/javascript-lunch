import restaurantDetailJson from "../fixtures/test.json";

describe("점심 뭐먹지 UI 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
    window.localStorage.setItem(
      "restaurants",
      JSON.stringify(restaurantDetailJson)
    );
  });

  context("최초 접속 시 정상 동작 테스트", () => {
    it("최초 접속 시 앱의 헤더가 보인다", () => {
      cy.get("restaurant-header").should("be.visible");
    });
    it("최초 접속 시 '모든 음식점', '자주 가는 음식점'을 선택할 수 있는 탭바가 보인다", () => {
      cy.get("header-tab").should("be.visible");
    });
    it("최초 접속 시 필터링 및 정렬 기능을 하는 박스가 보인다", () => {
      cy.get("filter-bar").should("be.visible");
    });
    it("모달은 접속 시 보이지 않는다", () => {
      cy.get("modal-box").should("not.be.visible");
    });
    it("로컬 스토리지의 데이터를 잘 가져오는지 확인한다.", () => {
      cy.contains("한식당1").should("be.visible");
      cy.contains("한식당2").should("be.visible");
      cy.contains("중식당1").should("be.visible");
      cy.contains("중식당2").should("be.visible");
      cy.contains("일식당1").should("be.visible");
    });
  });

  context("FilterBar UI 렌더링 테스트", () => {
    it("FilterBar는 자주 가는 음식점 탭에서는 보이지 않는다", () => {
      cy.get("#selectFavoriteRestaurant").click();
      cy.get("filter-bar").should("not.be.visible");
    });
  });

  context("새로운 레스토랑 추가하기", () => {
    it("앱의 헤더 우측의 아이콘을 클릭하면 레스토랑을 추가하는 모달창이 생긴다", () => {
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

      it("이름순으로 정렬 시 이름의 오름차순으로 정렬이 된다.", () => {
        cy.get("#sorting-filter").select(0);
        cy.get("restaurant-item").then(($items) => {
          const names = [...$items].map(
            (item) => item.querySelector(".restaurant__name").textContent
          );
          const sortedNames = [...names].sort();

          expect(names).to.deep.equal(sortedNames);
        });
      });
    });

    context("레스토랑 상세 내용 보기", () => {
      it("레스토랑 리스트를 클릭하면 클릭된 레스토랑의 상세 내용을 확인할 수 있다.", () => {
        cy.get("li.restaurant[data-name='중식당1']").click();
        cy.get(".restaurant-detail").should("be.visible");
        cy.get(".restaurant-detail").contains("중식당1");
        cy.get(".restaurant-detail").contains("중국집");
        cy.get(".restaurant-detail").contains("http://example.com/3");
      });

      it("레스토랑 상세 내역에서 닫기를 누르면 모달창이 닫힌다", () => {
        cy.get("li.restaurant[data-name='중식당1']").click();
        cy.get(".restaurant-detail").should("be.visible");
        cy.get("#close-detail-button").click();
        cy.get(".restaurant-detail").should("not.be.visible");
      });

      it("레스토랑 상세 내역에서 삭제하기 버튼을 누르면 모달창이 닫히고 해당 레스토랑이 사라지고 리랜더링이 된다.", () => {
        cy.get("li.restaurant[data-name='중식당1']").click();
        cy.get("#remove-restaurant-button").click();
        cy.get(".restaurant-detail").should("not.be.visible");
        cy.contains("중식당1").should("not.be.visible");
      });

      it("레스토랑 상세 내역에서 삭제하기 버튼을 누르면 로컬 스토리지에서 제거된다.", () => {
        cy.window().then((win) => {
          cy.get("li.restaurant[data-name='중식당1']").click();
          cy.get("#remove-restaurant-button")
            .click()
            .then(() => {
              cy.window().then((win) => {
                const restaurants = JSON.parse(win.localStorage.restaurants);
                expect(restaurants.length).to.equal(
                  restaurantDetailJson.length - 1
                );
              });
            });
        });
      });
    });
  });

  context("즐겨찾기 추가/삭제 테스트", () => {
    it("별 아이콘을 클릭하면 채워진 별 이미지로 변경 되지만 다시 별 아이콘을 클릭하면 빈 별 이미지로 변경 된다.", () => {
      cy.get("restaurant-item").first().find("star-button>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-button>img")
        .invoke("attr", "alt")
        .should("equal", "filled");

      cy.get("restaurant-item").first().find("star-button>img").click();

      cy.get("restaurant-item")
        .first()
        .find("star-button>img")
        .invoke("attr", "alt")
        .should("equal", "lined");
    });

    it("일식당1을 즐겨찾기에 추가하면 '자주 가는 음식점' 탭에서 추가한 일식당1을 찾을 수 있다.", () => {
      cy.get("restaurant-item").first().find("star-button>img").click();
      cy.get("header-tab").contains("자주 가는 음식점").click();
      cy.contains("일식당").should("be.visible");
      cy.contains("일본 음식").should("be.visible");

      cy.contains("중식당1").should("not.exist");
      cy.contains("중식당2").should("not.exist");
    });

    it("레스토랑 상세 내용 모달에서 즐겨찾기 추가하면 실시간으로 모달 밖의 즐겨찾기 버튼이 실시간으로 변경된다.", () => {
      cy.get("restaurant-item").first().click();
      cy.get("restaurant-detail").find("star-button>img").click();

      cy.get("restaurant-detail")
        .find("star-button>img")
        .invoke("attr", "alt")
        .should("equal", "filled");

      cy.get("restaurant-item")
        .first()
        .find("star-button>img")
        .invoke("attr", "alt")
        .should("equal", "filled");
    });
  });
});

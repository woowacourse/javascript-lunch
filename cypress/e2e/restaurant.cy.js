describe("간단한 음식점 홈페이지 동작 테스트", () => {
  const newRestaurant = {
    category: "양식",
    name: "양식당",
    distance: "5분 내",
    description: "맛있는 스테이크",
    url: "http://example4.com",
  };

  const restaurants = [
    {
      category: "한식",
      name: "한식당1",
      distance: "30분 내",
      description: "맛있는 김치찌개",
      url: "http://example1.com",
    },
    {
      category: "중식",
      name: "중식당1",
      distance: "15분 내",
      description: "시원한 짬뽕",
      url: "http://example2.com",
    },
    {
      category: "일식",
      name: "일식당1",
      distance: "20분 내",
      description: "신선한 초밥",
      url: "http://example3.com",
    },
  ];

  const addOneRestaurantItem = () => {
    cy.get("#gnb-button").click();

    const newRestaurant = {
      category: "양식",
      name: "양식당",
      distance: "5분 내",
      description: "맛있는 스테이크",
      url: "http://example4.com",
    };

    cy.get("#category").select(newRestaurant.category);
    cy.get("#name").type(newRestaurant.name);
    cy.get("#distance").select(newRestaurant.distance);
    cy.get("#description").type(newRestaurant.description);
    cy.get("#url").type(newRestaurant.url);

    cy.get("#restaurant-add-form").submit();
  };

  const addThreeRestaurantItems = () => {
    restaurants.forEach((restaurant) => {
      cy.get("#gnb-button").click();
      cy.get("#category").select(restaurant.category);
      cy.get("#name").type(restaurant.name);
      cy.get("#distance").select(restaurant.distance);
      cy.get("#description").type(restaurant.description);
      cy.get("#url").type(restaurant.url);
      cy.get("form#restaurant-add-form").submit();
    });
  };

  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("GNB 버튼을 눌렀을 때 음식점 추가 모달 등장", () => {
    cy.get("#gnb-button").click();
    cy.get("restaurant-add-modal").should("have.class", "modal--open");
  });

  it("음식점 추가 모달에서 취소하기를 눌렀을 때 모달 닫기", () => {
    cy.get("#gnb-button").click();
    cy.get("#modal-cancel-button").click();

    cy.get("restaurant-add-modal").should("not.have.class", "modal--open");
  });

  it("음식점 추가 모달에서 음식점 정보를 추가했을 때 모달 닫고 전체 리스트에 정보 추가", () => {
    cy.get("#gnb-button").click();

    cy.get("#category").select(newRestaurant.category);
    cy.get("#name").type(newRestaurant.name);
    cy.get("#distance").select(newRestaurant.distance);
    cy.get("#description").type(newRestaurant.description);
    cy.get("#url").type(newRestaurant.url);

    cy.get("#restaurant-add-form").submit();

    cy.get("restaurant-add-modal").should("not.have.class", "modal--open");
    cy.get(".restaurant-list-container").should("contain", newRestaurant.name);
  });

  it("'중식' 카테고리 필터", () => {
    addThreeRestaurantItems();

    cy.get("#category-filter").select("중식");

    cy.get(".restaurant-list-container")
      .should("have.length", 1)
      .contains("중식당1")
      .should("exist");
  });

  it("이름순 정렬", () => {
    addThreeRestaurantItems();

    cy.get("#sorting-filter").select("이름순");

    const sortedRestaurants = restaurants.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // NOTE: 페이지에 표시된 각 레스토랑의 이름이 정렬된 순서와 일치하는지 확인
    sortedRestaurants.forEach((restaurant, index) => {
      cy.get(".restaurant-list-container .restaurant")
        .eq(index)
        .should("contain", restaurant.name);
    });
  });

  it("거리순 정렬", () => {
    addThreeRestaurantItems();

    cy.get("#sorting-filter").select("거리순");

    // NOTE: 거리 정보를 숫자로 변환하는 함수
    const distanceToNumber = (distanceStr) => {
      const numStr = distanceStr.trim().split(" ")[0]; // "30분 내"에서 숫자 부분만 추출
      return Number(numStr);
    };

    cy.get(".restaurant-list-container .restaurant").then(($restaurants) => {
      const restaurants = $restaurants
        .toArray()
        .map((el) => {
          const distance = Cypress.$(el).find(".restaurant__distance").text();
          return { el, distance };
        })
        .sort(
          (a, b) => distanceToNumber(a.distance) - distanceToNumber(b.distance)
        );

      restaurants.forEach((restaurant, index) => {
        cy.wrap(restaurant.el)
          .invoke("text")
          .then((text) => {
            expect(text).to.contain(restaurant.distance.trim()); // 공백 제거 추가
          });
      });
    });
  });

  it("즐겨찾기 버튼을 눌렀을 때 버튼 활성화", () => {
    addOneRestaurantItem();

    cy.get(`#${newRestaurant.name}-favorite-button`).click();

    // NOTE: 버튼의 이미지 소스(src)에 'filled' 문자열이 포함되어 있는지 확인
    cy.get(`#${newRestaurant.name}-favorite-button`)
      .invoke("attr", "src")
      .should("include", "filled");
  });

  it("음식점 아이템을 눌렀을 때 해당 음식점의 정보 모달 등장", () => {
    addOneRestaurantItem();

    cy.get("li.restaurant").click();

    cy.get("restaurant-info-modal").should("have.class", "modal--open");
    cy.get(".restaurant__name").should("contain", newRestaurant.name);
  });
});

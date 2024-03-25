describe("간단한 음식점 홈페이지 동작 테스트", () => {
  const restaurant = {
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

  const fillAndSubmitRestaurantForm = (restaurant) => {
    cy.get("#gnb-button").click();

    cy.get("#category").select(restaurant.category);
    cy.get("#name").type(restaurant.name);
    cy.get("#distance").select(restaurant.distance);
    cy.get("#description").type(restaurant.description);
    cy.get("#url").type(restaurant.url);

    cy.get("#restaurant-add-form").submit();
  };

  const addOneRestaurantItem = () => {
    cy.get("#gnb-button").click();

    cy.get("#category").select(restaurant.category);
    cy.get("#name").type(restaurant.name);
    cy.get("#distance").select(restaurant.distance);
    cy.get("#description").type(restaurant.description);
    cy.get("#url").type(restaurant.url);

    cy.get("#restaurant-add-form").submit();
  };

  beforeEach(() => {
    cy.visit("http://localhost:8080/");
  });

  it("GNB 버튼을 눌렀을 때 음식점 추가 모달 등장", () => {
    cy.get("#gnb-button").click();

    cy.get("restaurant-add-modal").should("have.class", "modal--open");
  });

  it("음식점 추가 모달에서 취소하기를 누르면 모달 닫힘", () => {
    cy.get("#gnb-button").click();

    cy.get("#modal-cancel-button").click();

    cy.get("restaurant-add-modal").should("not.have.class", "modal--open");
  });

  it("음식점 추가 모달에서 음식점 정보를 추가하면 모달이 닫히고, 전체 리스트에 추가한 정보 렌더링", () => {
    fillAndSubmitRestaurantForm(restaurant);

    cy.get("restaurant-add-modal").should("not.have.class", "modal--open");
    cy.get(".restaurant-list-container").should("contain", restaurant.name);
  });

  it("'중식' 카테고리를 선택한 경우 중식에 속하는 음식점만 렌더링", () => {
    // given
    restaurants.forEach((restaurant) =>
      fillAndSubmitRestaurantForm(restaurant)
    );

    // when
    cy.get("#category-filter").select("중식");

    // then
    cy.get(".restaurant-list-container")
      .find(".restaurant")
      .should("have.length", 1)
      .and("contain", "중식당1");
  });

  it("이름순 정렬을 선택한 경우 이름순으로 정렬한 음식점 정보들을 렌더링", () => {
    // given
    restaurants.forEach((restaurant) =>
      fillAndSubmitRestaurantForm(restaurant)
    );

    const sortedRestaurants = [...restaurants].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // when
    cy.get("#sorting-filter").select("이름순");

    // then
    sortedRestaurants.forEach((restaurant, index) => {
      cy.get(".restaurant-list-container .restaurant")
        .eq(index)
        .should("contain", restaurant.name);
    });
  });

  it("거리순 정렬을 선택한 경우 거리순으로 정렬한 음식점 정보들을 렌더링", () => {
    // given
    const distanceToNumber = (distanceStr) => {
      const numStr = distanceStr.trim().split(" ")[0];
      return Number(numStr);
    };

    const getSortedRestaurantsByDistance = ($restaurants) => {
      return $restaurants
        .toArray()
        .map((el) => {
          const distance = Cypress.$(el).find(".restaurant__distance").text();
          return { el, distance };
        })
        .sort(
          (a, b) => distanceToNumber(a.distance) - distanceToNumber(b.distance)
        );
    };

    restaurants.forEach((restaurant) =>
      fillAndSubmitRestaurantForm(restaurant)
    );

    // when
    cy.get("#sorting-filter").select("거리순");

    // then
    cy.get(".restaurant-list-container .restaurant").then(($restaurants) => {
      const sortedRestaurants = getSortedRestaurantsByDistance($restaurants);

      sortedRestaurants.forEach((restaurant) => {
        cy.wrap(restaurant.el)
          .invoke("text")
          .then((text) => {
            expect(text).to.contain(restaurant.distance.trim());
          });
      });
    });
  });

  it("즐겨찾기 버튼을 눌렀을 때 버튼 활성화", () => {
    // given
    addOneRestaurantItem();

    // when
    cy.get(`#${restaurant.name}-favorite-button`).click();

    // then
    cy.get(`#${restaurant.name}-favorite-button`)
      .invoke("attr", "src")
      .should("include", "filled");
  });

  it("음식점 아이템을 클릭하면 해당 음식점의 정보 모달 등장", () => {
    // given
    addOneRestaurantItem();

    // when
    cy.get("li.restaurant").click();

    // then
    cy.get("restaurant-info-modal").should("have.class", "modal--open");
    cy.get(".restaurant__name").should("contain", restaurant.name);
  });
});

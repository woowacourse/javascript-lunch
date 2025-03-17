describe("restaurantDetailModal 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/", {
      onBeforeLoad(win) {
        win.localStorage.setItem(
          "restaurantList",
          JSON.stringify([
            {
              category: "한식",
              name: "라",
              distance: 10,
              description: "😠",
              link: "https://www.naver.com/",
              favorite: false,
            },
            {
              category: "한식",
              name: "가",
              distance: 10,
              description: "😠",
              link: "https://www.naver.com/",
              favorite: false,
            },
            {
              category: "한식",
              name: "나",
              distance: 5,
              description: "😆",
              link: "https://www.naver.com/",
              favorite: false,
            },
            {
              category: "한식",
              name: "다",
              distance: 10,
              description: "💖",
              link: "https://www.naver.com/",
              favorite: false,
            },
          ])
        );
      },
    });
  });

  it("LunchInfoCard의 별 아이콘 클릭 시 아이콘이 바뀐다", () => {
    cy.get("#restaurant_가")
      .find("button")
      .find("img")
      .should("have.attr", "src", "./favorite-icon-lined.png");
    cy.get("#restaurant_가").find("button").click();
    cy.get("#restaurant_가")
      .find("button")
      .find("img")
      .should("have.attr", "src", "./favorite-icon-filled.png");
    cy.get("#restaurant_가").find("button").click();
    cy.get("#restaurant_가")
      .find("button")
      .find("img")
      .should("have.attr", "src", "./favorite-icon-lined.png");
  });

  it("LunchInfoCard의 별 아이콘 클릭 시 자주 가는 음식점 탭에 추가된다", () => {
    cy.get("#restaurant_가").find("button").click();
    cy.get("#button_자주\\ 가는\\ 음식점").click();
    cy.get("#restaurant_가").should("be.visible");
  });

  it("LunchInfoCard의 별 아이콘 두 번 클릭 시 자주 가는 음식점 탭에서 사라진다", () => {
    cy.get("#restaurant_가").find("button").click();
    cy.get("#button_자주\\ 가는\\ 음식점").click();
    cy.get("#restaurant_가").should("be.visible");
    cy.get("#restaurant_가").find("button").click();
    cy.get("#restaurant_가").should("not.exist");
  });

  it("음식점 상세 모달의 별 아이콘 클릭 시 자주 가는 음식점 탭에 추가된다", () => {
    cy.get("#restaurant_가").click();
    cy.get("#restaurantModal_가").find("button").first().click();
    cy.get("body").type("{esc}");
    cy.get("#button_자주\\ 가는\\ 음식점").click();
    cy.get("#restaurant_가").should("be.visible");
  });
});

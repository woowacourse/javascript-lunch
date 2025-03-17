const data = [
  {
    category: "한식",
    name: "얌샘김밥",
    distance: "15",
    description: "김밥집",
    link: "https://kimchi-house.com",
    bookmark: false,
    id: 1741948864486,
  },
  {
    category: "일식",
    name: "Sushi World",
    distance: "5",
    description: "신선한 초밥과 사시미",
    link: "https://sushiworld.jp",
    bookmark: true,
    id: 1741948864487,
  },
  {
    category: "양식",
    name: "Pasta Heaven",
    distance: "20",
    description: "정통 이탈리안 파스타 전문점",
    link: "https://pastaheaven.com",
    bookmark: false,
    id: 1741948864488,
  },
  {
    category: "아시안",
    name: "Thai Express",
    distance: "10",
    description: "정통 태국 요리 레스토랑",
    link: "https://thaiexpress.com",
    bookmark: true,
    id: 1741948864489,
  },
  {
    category: "기타",
    name: "Fusion Delight",
    distance: "30",
    description: "다양한 글로벌 퓨전 요리",
    link: "https://fusiondelight.com",
    bookmark: false,
    id: 1741948864490,
  },
];

describe("음식점 필터 플로우 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174/", {
      onBeforeLoad: (window) => {
        window.localStorage.setItem("restaurantList", JSON.stringify(data));
      },
    });
    cy.viewport(1536, 960);
  });

  it("로컬스토리지에 저장된 식당 목록을 이름순으로 정렬된 식당 리스트로 보인다.", () => {
    cy.get(".restaurant-list .restaurant__name").then(($items) => {
      const texts = [...$items].map((item) => item.textContent);

      const expectedOrder = data
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        )
        .map((x) => x.name);

      expect(texts).to.deep.equal(expectedOrder);
    });
  });

  it("자주 가는 음식점 탭을 선택하면 북마크한 식당 리스트만 보인다.", () => {
    cy.contains("button", "자주 가는 음식점").should("exist").click();

    data
      .filter((restaurant) => restaurant.bookmark)
      .forEach((restaurant) =>
        cy.contains("h3", restaurant.name).should("exist")
      );
  });

  it("거리순 정렬버튼을 누르면 거리순으로 정렬된다.", () => {
    cy.get('.restaurant-filter-container select[name="sorting"]')
      .should("be.visible")
      .select("거리순");

    cy.get(".restaurant-list .restaurant__name").then(($items) => {
      const texts = [...$items].map((item) => item.textContent);

      const expectedOrder = data
        .sort((a, b) => a.distance - b.distance)
        .map((x) => x.name);

      expect(texts).to.deep.equal(expectedOrder);
    });
  });

  it("한식 정렬 버튼을 누르면 한식 카테고리에 해당되는 식당만 보인다.", () => {
    const category = "한식";
    cy.get('.restaurant-filter-container select[name="category"]')
      .should("be.visible")
      .select(category);

    data
      .filter((restaurant) => restaurant.category === category)
      .forEach((restaurant) =>
        cy.contains("h3", restaurant.name).should("exist")
      );
  });

  it("모든 음식점 탭에서 북마크되지 않은 식당에 북마크 버튼을 누르고 자주 가는 음식점 탭을 누르면 추가되어있다.", () => {
    const notBookmarkName = data[0].name;

    cy.contains("h3.restaurant__name.text-subtitle", notBookmarkName)
      .closest("li")
      .find("button")
      .click();

    cy.contains("button", "자주 가는 음식점").should("exist").click();

    const origin = data.filter((restaurant) => restaurant.bookmark);
    const newItem = data.find(
      (restaurant) => restaurant.name === notBookmarkName
    );

    [...origin, newItem].forEach((restaurant) =>
      cy.contains("h3", restaurant.name).should("exist")
    );
  });
});

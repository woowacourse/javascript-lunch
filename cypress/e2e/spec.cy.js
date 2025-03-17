describe("The Home Page", () => {
  it("페이지가 정상적으로 로드된다.", () => {
    cy.visit("http://localhost:5173/");
    cy.get("header").should("be.visible");
  });
});

describe("Add Restaurant Modal Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("헤더에서 버튼을 눌러 모달창을 띄운다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-container").should("be.visible");
  });

  it("모달창을 열고 아무것도 입력하지 않은 상태로 취소하기 버튼으로 닫으면 모달이 닫힌다.", () => {
    cy.get(".gnb__button").click();
    cy.get("#modal-close-btn").click();
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("모달의 모든 입력창에 값을 작성해서 추가하기 버튼을 누르면 새 식당이 등록되고, 목록에 식당이 보여진다", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("한식");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("5");
    cy.get("#description").type("맛있는 한식당입니다.");
    cy.get("#link").type("https://www.google.com/");
    cy.get("#modal-submit-btn").click();
    cy.get(".restaurant-list").contains("한식당").should("be.visible");
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("모달의 필수 입력창에 값을 작성해서 추가하기 버튼을 누르면 새 식당이 등록되고, 목록에 식당이 보여진다", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("한식");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("5");
    cy.get("#modal-submit-btn").click();
    cy.get(".restaurant-list").contains("한식당").should("be.visible");
    cy.get("#restaurant-add-dialog").should("not.be.visible");
  });

  it("필수 사항을 입력하지 않고 추가하기 버튼을 클릭하면 에러가 발생한다.", () => {
    cy.get(".gnb__button").click();
    cy.viewport(1024, 768);
    cy.get("#category").select("");
    cy.get("#name").type("한식당");
    cy.get("#distance").select("");
    cy.get("#modal-submit-btn").click();
    cy.get("#restaurant-add-dialog").should("exist");
  });
});

const initialRestaurantsData = [
  {
    category: "한식",
    name: "불고기 정식",
    distance: 10,
    description: "신선한 재료로 만든 불고기와 다양한 반찬이 제공되는 한식당.",
    isFavorite: false,
    id: "restaurant-1",
  },
  {
    category: "한식",
    name: "김치찌개 명가",
    distance: 30,
    description: "전통 방식으로 끓인 깊은 맛의 김치찌개를 맛볼 수 있는 곳.",
    isFavorite: false,
    id: "restaurant-2",
  },
  {
    category: "중식",
    name: "짜장면 명가",
    distance: 5,
    description: "깊은 맛의 짜장면과 함께 신선한 만두를 즐길 수 있는 중식당.",
    isFavorite: false,
    id: "restaurant-3",
  },
  {
    category: "아시안",
    name: "팟타이 하우스",
    distance: 5,
    description: "태국의 대표 요리 팟타이를 전문으로 하는 레스토랑.",
    isFavorite: false,
    id: "restaurant-4",
  },
  {
    category: "아시안",
    name: "쌀국수 하우스",
    distance: 30,
    description: "풍미 가득한 국물과 쫄깃한 면발의 쌀국수를 즐길 수 있는 곳.",
    isFavorite: false,
    id: "restaurant-5",
  },
];

describe("View Restaurant List Test", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173", {
      onBeforeLoad: (win) => {
        win.localStorage.setItem(
          "restaurants",
          JSON.stringify(initialRestaurantsData)
        );
      },
    });
  });

  it("모든 음식점 탭을 누르면 등록된 모든 음식점 목록이 뜬다.", () => {
    cy.get(".restaurant-list").contains("김치찌개 명가").should("be.visible");
    cy.get(".restaurant-list").contains("짜장면 명가").should("be.visible");
  });

  it("자주 가는 음식점 탭을 누르면 즐겨찾기한 음식점 목록이 뜬다.", () => {
    cy.get(".restaurant-list li")
      .first()
      .within(() => {
        cy.get(".favorite-icon").click();
      });
    cy.get(".tab__subTitle").click();
    cy.get(".restaurant-list li").should("have.length.greaterThan", 0);
  });

  it("자주 가는 음식점 목록 탭을 누르면 카테고리와 정렬 셀렉트 요소가 보이지 않는다.", () => {
    cy.get(".tab__subTitle").click();
    cy.get(".restaurant-filter-container").should("have.class", "hidden");
  });

  it("모든 음식점 목록에서 아시안을 누르고 거리순을 누르면 모든 필터에 해당하는 순으로 음식점이 보여진다", () => {
    cy.get(".tab__title").click();
    cy.get("#category-filter").select("아시안");
    cy.get("#sorting-filter").select("distance");
    cy.get(".restaurant-list li").then((items) => {
      expect(items).to.have.length(2);
      cy.wrap(items[0]).contains("팟타이 하우스");
      cy.wrap(items[1]).contains("쌀국수 하우스");
    });
  });

  it("목록에서 음식점을 클릭하면 해당 음식점의 상세 정보 모달이 뜨고, 닫기를 누르면 모달이 닫힌다", () => {
    cy.get(".restaurant-list li").first().click();
    cy.get(".detail-modal-content").should("be.visible");
    cy.contains("닫기").click();
    cy.get(".detail-modal-content").should("not.be.visible");
  });

  it("음식점의 상세 정보 모달에서 삭제하기를 클릭하면 음식점이 목록에서 삭제된다.", () => {
    cy.get(".restaurant-list li").then((items) => {
      const initialCount = items.length;
      cy.get(".restaurant-list li").first().click();
      cy.contains("삭제하기").click();
      cy.get(".restaurant-list li").should("have.length", initialCount - 1);
    });
  });

  it("즐겨찾기 아이콘을 클릭하면 자주 가는 음식점 목록에 등록된다.", () => {
    cy.get(".restaurant-list li")
      .first()
      .within(() => {
        cy.get(".favorite-icon").click();
      });
    cy.get(".tab__subTitle").click();
    cy.get(".restaurant-list li").should("have.length.greaterThan", 0);
  });
});

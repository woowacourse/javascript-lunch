describe("헤더 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("헤더에 '점심 뭐 먹지' 텍스트가 표시되는지 확인한다.", () => {
    cy.get(".text-title").should("contain", "점심 뭐 먹지");
  });
  it("헤더에 모달 버튼이 표시되는지 확인한다.", () => {
    cy.get("#gnb-button").should("exist");
  });
  it("헤더에 모달 버튼이 클릭되는지 확인한다", () => {
    cy.get("#gnb-button").click();
  });
});

describe("Body 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "restaurants",
        JSON.stringify([
          {
            category: "korean",
            categoryValue: "한식",
            nameValue: "한식집",
            distanceValue: "5",
            descriptionValue: "한식집입니다.",
            link: "https://www.naver.com",
            favorite: true,
          },
        ])
      );
    });

    cy.reload();
  });

  it("Body에 레스토랑 아이콘이 표시되는지 확인한다.", () => {
    cy.wait(500);
    cy.get(".restaurant__category").should("exist");
  });

  it("Body에 레스토랑 title이 표시되는지 확인한다.", () => {
    cy.wait(500);
    cy.get(".restaurant__name").should("exist");
  });

  it("Body에 레스토랑 소요시간이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__distance").should("exist");
  });

  it("Body에 레스토랑 설명이 표시되는지 확인한다.", () => {
    cy.get(".restaurant__description").should("exist");
  });
});

describe("새로운 음식점 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });
  it("모달이 표시될 때 배경이 어두워지는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get(".modal-backdrop").should(
      "have.css",
      "background-color",
      "rgba(0, 0, 0, 0.35)"
    );
  });

  it("모달의 제목이 새로운 음식점으로 표시되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get(".modal-title").should("have.text", "새로운 음식점");
  });

  it("카테고리(Category) Dropdown을 클릭했을 때 한식, 중식 ,일식 ,아시안 ,양식 ,기타 항목이 표시되는지 확인한다", () => {
    cy.get("#gnb-button").click();
    cy.get("select#category")
      .find("option")
      .should("contain", "한식")
      .should("contain", "중식")
      .should("contain", "일식")
      .should("contain", "아시안")
      .should("contain", "양식")
      .should("contain", "기타");
  });

  it("이름(Name)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#name").type("tester").should("have.value", "tester");
  });

  it("거리(Distance) Dropdown**을 클릭했을 때 5분, 10분, 15분, 20분, 30분 항목이 표시되는지 확인한다: ", () => {
    cy.get("#gnb-button").click();
    cy.get("select#distance")
      .find("option")
      .should("contain", "5분 내")
      .should("contain", "10분 내")
      .should("contain", "15분 내")
      .should("contain", "20분 내")
      .should("contain", "30분 내");
  });

  it("설명(description)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#description").type("tester").should("have.value", "tester");
  });

  it("참고 링크(link)이 입력되는지 확인한다.", () => {
    cy.get("#gnb-button").click();
    cy.get("#link").type("tester").should("have.value", "tester");
  });

  it("모달 하단에 '취소하기' 버튼 '추가하기' 버튼이 표시되는지 확인한다", () => {
    cy.get("#gnb-button").click();
    cy.get(".button--secondary").should("contain", "취소하기");
    cy.get(".button--primary").should("contain", "추가하기");
  });
});
describe("새로운 음식점 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("음식점 정보를 입력하고 추가하기를 누르면 음식점 리스트에 추가된다.", () => {
    cy.get("#gnb-button").click();

    cy.get(".modal-container").invoke("css", "position", "relative");
    cy.get("#category").select("한식");

    cy.get("#name").type("tester");
    cy.get("#distance").select("5");
    cy.get(".button--primary").click();

    cy.get(".restaurant").should("contain", "tester");
  });
});

describe("자주 가는 음식점 즐겨찾기 아이콘 클릭 시 자주 가는 음식점 으로 추가", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "restaurants",
        JSON.stringify([
          {
            category: "korean",
            categoryValue: "한식",
            nameValue: "한식집",
            distanceValue: "5",
            descriptionValue: "한식집입니다.",
            link: "https://www.naver.com",
            favorite: true,
          },
          {
            category: "western",
            categoryValue: "양식",
            nameValue: "파스타 맛집",
            distanceValue: "15",
            descriptionValue: "이탈리아 파스타 레스토랑입니다.",
            link: "https://www.google.com",
            favorite: false,
          },
        ])
      );
    });

    cy.reload();
  });

  it("음식점 즐겨찾기 아이콘 클릭 시 즐겨찾기로 추가되는지 확인한다.", () => {
    cy.get(".restaurant-favorite-star").eq(0).click();
    cy.get(".restaurant-favorite-star")
      .eq(0)
      .should("have.attr", "src", "./favorite-icon-filled.png");
  });

  it("음식점 즐겨찾기 아이콘 클릭 시 즐겨찾기 해제되는지 확인한다.", () => {
    cy.get(".restaurant-favorite-star").eq(1).click();
    cy.get(".restaurant-favorite-star")
      .eq(1)
      .should("have.attr", "src", "./favorite-icon-lined.png");
  });
});

describe("모든 음식점 및 자주 가는 음식점 카테고리 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "restaurants",
        JSON.stringify([
          {
            category: "korean",
            categoryValue: "한식",
            nameValue: "한식집",
            distanceValue: "5",
            descriptionValue: "한식집입니다.",
            link: "https://www.naver.com",
            favorite: true,
          },
          {
            category: "western",
            categoryValue: "양식",
            nameValue: "파스타 맛집",
            distanceValue: "15",
            descriptionValue: "이탈리아 파스타 레스토랑입니다.",
            link: "https://www.google.com",
            favorite: false,
          },
        ])
      );
    });

    cy.reload();
  });

  it("모든 음식점 버튼을 클릭하면 모든 음식점이 표시된다.", () => {
    cy.get("#all-button").click();
    cy.get(".restaurant").should("exist");

    cy.get(".restaurant-favorite-star")
      .eq(0)
      .should("have.attr", "src", "./favorite-icon-lined.png");

    cy.get(".restaurant-favorite-star")
      .eq(1)
      .should("have.attr", "src", "./favorite-icon-filled.png");
  });

  it("자주가는 음식점 카테고리에서 즐겨찾기 버튼을 누르면 즐겨찾기가 해제된다.", () => {
    cy.get("#favorite-button").click();
    cy.get(".restaurant").should("exist");
    cy.get(".restaurant").should("length", 1);

    cy.get(".restaurant-favorite-star").should(
      "have.attr",
      "src",
      "./favorite-icon-filled.png"
    );
  });
});

describe("레스토랑 상세 정보 모달 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");

    cy.window().then((win) => {
      win.localStorage.setItem(
        "restaurants",
        JSON.stringify([
          {
            category: "korean",
            categoryValue: "한식",
            nameValue: "한식집",
            distanceValue: "5",
            descriptionValue: "한식집입니다.",
            link: "https://www.naver.com",
            favorite: true,
          },
          {
            category: "western",
            categoryValue: "양식",
            nameValue: "파스타 맛집",
            distanceValue: "15",
            descriptionValue: "이탈리아 파스타 레스토랑입니다.",
            link: "https://www.google.com",
            favorite: false,
          },
        ])
      );
    });

    cy.reload();
  });

  it("한 레스토랑 선택 시 레스토랑 상세 정보 모달이 띄어진다.", () => {
    cy.get(".restaurant-info-header").eq(0).should("exist").click();
    cy.get(".restaurant-detail-modal").should("exist");
    cy.get(".restaurant-detail-modal-info").should("exist");
  });

  it("레스토랑 상세 정보 모달에서 close버튼을 누르면 모달이 꺼진다.", () => {
    cy.get(".restaurant-info-header").eq(0).should("exist").click();
    cy.get(".restaurant-detail-modal-close-button").click();
    cy.get(".restaurant-detail-modal").should("not.exist");
  });

  it("레스토랑 상세 정보 모달에서 delete버튼을 누르면 모달이 꺼지고 해당 레스토랑이 제거된다.", () => {
    cy.get(".restaurant-info-header").eq(0).should("exist").click();
    cy.get(".restaurant-detail-modal-delete-button").click();
    cy.get(".restaurant-detail-modal").should("not.exist");
    cy.get(".restaurant").should("length", 1);
  });
});

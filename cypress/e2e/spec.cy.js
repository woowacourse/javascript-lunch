const restaurants = [
  {
    category: "한식",
    name: "한식집1",
    distance: "5",
    like: "true",
    description:
      "한식집1 더미 설명입니다. 한식집1 더미 설명입니다. 한식집1 더미 설명입니다.",
    link: "",
    id: "1",
  },
  {
    category: "한식",
    name: "한식집2",
    distance: "10",
    like: "true",
    description:
      "한식집2 더미 설명입니다. 한식집2 더미 설명입니다. 한식집2 더미 설명입니다.",
    link: "",
    id: "2",
  },
  {
    category: "중식",
    name: "중식집1",
    distance: "15",
    like: "false",
    description:
      "중식집1 더미 설명입니다. 중식집1 더미 설명입니다. 중식집1 더미 설명입니다.",
    link: "",
    id: "3",
  },
  {
    category: "양식",
    name: "양식집1",
    distance: "20",
    like: "true",
    description:
      "양식집1 더미 설명입니다. 양식집1 더미 설명입니다. 양식집1 더미 설명입니다.",
    link: "",
    id: "4",
  },
  {
    category: "일식",
    name: "일식집1",
    distance: "30",
    like: "false",
    description:
      "일식집1 더미 설명입니다. 일식집1 더미 설명입니다. 일식집1 더미 설명입니다.",
    link: "",
    id: "5",
  },
];

beforeEach(() => {
  cy.visit("http://localhost:8080/", {
    onBeforeLoad(win) {
      win.localStorage.setItem("restaurants", JSON.stringify(restaurants));
    },
  });
});

describe("음식점 추가 모달 기능 테스트", () => {
  it("값 입력 후 제출시 화면에 추가된 음식점이 렌더링 된다.", () => {
    cy.contains("한식집3").should("not.exist");

    cy.get(".gnb__button").click();

    cy.get("#category").select("한식");
    cy.get("#name").type("한식집3");
    cy.get("#distance").select("5");
    cy.get("#description").type(
      "한식집3 더미 설명입니다. 한식집3 더미 설명입니다. 한식집3 더미 설명입니다."
    );

    cy.get("form").submit();

    cy.contains("한식집3").should("be.visible");
  });

  it("필수 값을 입력하지 않고 제출시 모달이 열린채로 유지되며, 제출되지 않는다.", () => {
    cy.get(".gnb__button").click();

    cy.get("#name").type("한식집3");
    cy.get("#distance").select("5");
    cy.get("#description").type(
      "한식집3 더미 설명입니다. 한식집3 더미 설명입니다. 한식집3 더미 설명입니다."
    );

    cy.get(".submit-button").click();

    cy.get("form").should("be.visible");
    cy.contains("한식집3").should("not.exist");
  });
});

describe("음식점 리스트 렌더링 테스트", () => {
  it("카테고리 필터 선택시 해당하는 카테고리를 가진 음식점만 렌더링 된다.", () => {
    cy.get("#category-filter").select("한식");

    cy.get(".restaurant-list").should((elem) =>
      elem.children().each((_, li) => {
        expect(li.getAttribute("category")).to.equal("한식");
      })
    );
  });

  it("정렬 필터 선택시 해당 정렬 기준에 의해 렌더링 된다.", () => {
    const sortedTitleByDistance = [
      "한식집1",
      "한식집2",
      "중식집1",
      "양식집1",
      "일식집1",
    ];
    const sortedTitleByName = [
      "양식집1",
      "일식집1",
      "중식집1",
      "한식집1",
      "한식집2",
    ];

    cy.get("#sorting-filter").select("distance");

    cy.get(".restaurant-list").should((elem) => {
      elem.children().each((index, li) => {
        expect(li.querySelector(".restaurant__name").innerText).to.equal(
          sortedTitleByDistance[index]
        );
      });
    });

    cy.get("#sorting-filter").select("name");

    cy.get(".restaurant-list").should((elem) => {
      elem.children().each((index, li) => {
        expect(li.querySelector(".restaurant__name").innerText).to.equal(
          sortedTitleByName[index]
        );
      });
    });
  });

  it("즐겨찾기 탭 클릭시 즐겨찾기한 음식점만 렌더링 된다.", () => {
    cy.get("#like-button").click();

    cy.get(".restaurant-list").should((elem) =>
      elem.children().each((_, li) => {
        expect(li.getAttribute("like")).to.equal("true");
      })
    );
  });
});

describe("음식점 상세 모달 기능 테스트", () => {
  it("음식점 카드 클릭시 해당 음식점의 상세 모달이 렌더링 된다.", () => {
    cy.contains("일식집1").click();

    cy.get("form").should("not.be.visible");
    cy.get(".modal-detail").should("be.visible");
    cy.get(".modal-detail").contains("일식집1").should("be.visible");
  });

  it("삭제하기 버튼 클릭시 음식점 리스트에서 해당 항목이 삭제된다.", () => {
    cy.contains("일식집1").click();

    cy.contains("삭제하기").click();

    cy.get(".restaurant-list").contains("한식집1").should("be.visible");
    cy.get(".restaurant-list").contains("한식집2").should("be.visible");
    cy.get(".restaurant-list").contains("양식집1").should("be.visible");
    cy.get(".restaurant-list").contains("중식집1").should("be.visible");
    cy.get(".restaurant-list").contains("일식집1").should("not.exist");
  });
});

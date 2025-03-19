describe("사용자 E2E 시나리오 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("헤더 동작 확인", () => {
    it("헤더에 '점심 뭐 먹지' 텍스트가 표시된다.", () => {
      cy.get(".text-title").should("contain", "점심 뭐 먹지");
    });

    it("모달 버튼이 존재하고 클릭하면 모달이 열린다.", () => {
      cy.get("#gnb-button").should("exist").click();
      cy.get(".modal-container").should("be.visible");
    });
  });

  describe("새로운 음식점 추가 기능", () => {
    it("음식점 정보를 입력하고 추가하기를 누르면 음식점 리스트에 추가된다.", () => {
      cy.get("#gnb-button").click();

      cy.get(".modal-container").invoke("css", "position", "relative");
      cy.get("#category").select("한식");

      cy.get("#name").type("테스트 음식점");
      cy.get("#distance").select("5");

      cy.get(".button--primary").click();

      cy.get(".restaurant").should("contain", "테스트 음식점");
    });
  });

  describe("즐겨찾기 기능", () => {
    beforeEach(() => {
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
              favorite: false,
            },
          ])
        );
      });

      cy.reload();
    });

    it("즐겨찾기 버튼을 클릭하면 음식점이 즐겨찾기에 추가된다.", () => {
      cy.get(".restaurant-favorite-star").click();

      cy.get(".restaurant-favorite-star").should(
        "have.attr",
        "src",
        "./favorite-icon-filled.png"
      );

      cy.get("#favorite-button").click();
      cy.get(".restaurant").should("contain", "한식집");
    });

    it("즐겨찾기 버튼을 다시 클릭하면 해제된다.", () => {
      cy.get(".restaurant-favorite-star").click();
      cy.get(".restaurant-favorite-star").click();

      cy.get(".restaurant-favorite-star").should(
        "have.attr",
        "src",
        "./favorite-icon-lined.png"
      );
    });
  });

  describe("음식점 삭제 기능", () => {
    beforeEach(() => {
      cy.window().then((win) => {
        win.localStorage.setItem(
          "restaurants",
          JSON.stringify([
            {
              category: "western",
              categoryValue: "양식",
              nameValue: "스테이크 하우스",
              distanceValue: "15",
              descriptionValue: "스테이크 전문점입니다.",
              link: "https://www.google.com",
              favorite: false,
            },
          ])
        );
      });

      cy.reload();
    });

    it("사용자가 음식점을 삭제하면 리스트에서 제거된다.", () => {
      cy.get(".restaurant-info-header").click();
      cy.get(".restaurant-detail-modal-delete-button").click();

      cy.get(".restaurant").should("not.exist");
    });
  });

  describe("음식점 필터링 및 카테고리 테스트", () => {
    beforeEach(() => {
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

    it("자주 가는 음식점 필터를 클릭하면 즐겨찾기만 표시된다.", () => {
      cy.get("#favorite-button").click();
      cy.get(".restaurant").should("have.length", 1);
      cy.get(".restaurant").should("contain", "한식집");
    });

    it("모든 음식점 필터를 클릭하면 전체 음식점이 표시된다.", () => {
      cy.get("#all-button").click();
      cy.get(".restaurant").should("have.length", 2);
    });
  });

  describe("레스토랑 상세 정보 모달 테스트", () => {
    beforeEach(() => {
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

    it("레스토랑을 클릭하면 상세 정보 모달이 열린다.", () => {
      cy.get(".restaurant-info-header").click();
      cy.get(".restaurant-detail-modal").should("be.visible");
    });

    it("상세 정보 모달에서 닫기 버튼을 클릭하면 모달이 닫힌다.", () => {
      cy.get(".restaurant-info-header").click();
      cy.get(".restaurant-detail-modal-close-button").click();
      cy.get(".restaurant-detail-modal").should("not.exist");
    });

    it("상세 정보 모달에서 삭제 버튼을 클릭하면 리스트에서 삭제된다.", () => {
      cy.get(".restaurant-info-header").click();
      cy.get(".restaurant-detail-modal-delete-button").click();
      cy.get(".restaurant").should("not.exist");
    });
  });
});

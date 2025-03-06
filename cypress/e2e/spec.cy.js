context("공통 설정", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  describe("음식점 추가 모달 기능 정상 동작 테스트", () => {
    it("목록 추가 아이콘 클릭 시 음식점 추가 모달이 화면에 보인다.", () => {
      cy.get(".modal-container").should("not.be.visible");
      cy.get(".gnb__button > img").click();
      cy.get(".modal-container").should("be.visible");
    });

    it("음식점 추가 모달에서 추가하기 버튼 클릭 시 restaurantList에 추가된다.", () => {
      cy.get(".restaurant").then(($items) => {
        const initialLength = $items.length;

        cy.get(".gnb__button > img").click();
        cy.get("#category").select("한식");
        cy.get("#name").type("테스트음식점");
        cy.get("#distance").select("10");
        cy.get("#add-button").click();
        cy.get(".restaurant-list").should("contain", "테스트음식점");
        cy.get(".restaurant").should("have.length", initialLength + 1);
      });
    });
  });

  describe("음식점 추가 모달 기능 실패 동작 테스트", () => {
    it("필수입력 값이 입력되지 않으면 alert가 작동한다", () => {
      cy.get(".gnb__button > img").click();
      cy.get("#category").select("한식");
      cy.get("#distance").select("10");

      cy.window().then((win) => {
        cy.spy(win, "alert").as("alertSpy");
      });

      cy.get("#add-button").click();

      cy.get("@alertSpy").should(
        "have.been.calledOnceWith",
        "필수 입력 항목을 모두 작성해주세요."
      );
    });
  });
});

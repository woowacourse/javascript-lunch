describe("음식점 관리 기능 테스트", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
      cy.viewport(1280, 720);
    });
  
    describe("음식점 목록이 정상적으로 렌더링 되는 경우", () => {
      it("음식점 목록을 확인할 수 있다.", () => {
        cy.get(".restaurant").should("have.length.at.least", 1);
      });
    });
  
    describe("음식점 상세 정보 모달을 여는 경우", () => {
      beforeEach(() => {
        cy.get(".restaurant").first().click();
      });
  
      it("음식점 상세 정보 모달이 열린다.", () => {
        cy.get(".modal-container").should("be.visible");
      });
  
      it("음식점 상세 정보를 확인할 수 있다.", () => {
        cy.get(".restaurant__name").should("exist");
        cy.get(".restaurant__category").should("exist");
        cy.get(".restaurant__distance").should("exist");
        cy.get(".restaurant__description").should("exist");
        cy.get(".restaurant__info").should("exist");
      });
  
      it("음식점 삭제 버튼 클릭 시 목록에서 제거된다.", () => {
        cy.get(".button--secondary").click();
        cy.get(".modal-container").should("not.exist");
        cy.get(".restaurant").should("have.length.lessThan", 3);
      });
  
      it("음식점 상세 정보 모달을 닫는다.", () => {
        cy.get(".button--primary").click();
        cy.get(".modal-container").should("not.exist");
      });
    });
  
    describe("음식점 즐겨찾기(★) 기능을 테스트하는 경우", () => {
      it("음식점 목록에서 즐겨찾기 버튼 클릭 시 추가 가능", () => {
        cy.get(".restaurant").first().as("targetRestaurant");
  
        cy.get("@targetRestaurant").find(".restaurant-star").click();
        cy.get("@targetRestaurant").find(".restaurant-star").should("have.class", "active");  
      });

      it("음식점 목록에서 즐겨찾기 버튼 클릭 시 삭제 가능", () => {
        cy.get(".restaurant").first().as("targetRestaurant");  

        cy.get("@targetRestaurant").find(".restaurant-star").click();
        cy.get("@targetRestaurant").find(".restaurant-star").should("have.class", "active");  
        cy.get("@targetRestaurant").find(".restaurant-star").click();
        cy.get("@targetRestaurant").find(".restaurant-star").should("not.have.class", "active");
      });
    });
  });
  
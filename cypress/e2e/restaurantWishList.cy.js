describe("음식점 상세 정보 및 즐겨찾기 기능 테스트", () => {
    beforeEach(() => {
      cy.visit("http://localhost:5173");
      cy.viewport(1280, 720);
    });
    
    it("카테고리 필터링을 클릭한 경우", () => {
    });

    it("이름순/거리순 정렬을 클릭한 경우", () => {
    });

    describe("음식점 상세 정보 모달을 여는 경우", () => {
        it("음식점 상세 정보 모달이 열린다.", () => {
          cy.get(".restaurant-item").first().click();
          cy.get(".modal").should("be.visible");
        });
          
          it("음식점 상세 정보가 보인다.", () => {
              cy.get(".modal .restaurant-name").should("exist");

          });

          it("음식점 삭제 버튼 클릭한다.", () => {
            cy.get(".restaurant-item").first().as("targetRestaurant");
            cy.get("@targetRestaurant").find(".delete-button").click();
            cy.get("@targetRestaurant").should("not.exist");
          });

          it("음식점 상제 정보 모달을 닫는다.", () => {
              cy.get(".modal .close-button").click();
              cy.get(".modal").should("not.exist");
          });

    });

  
    it("음식점 삭제 버튼 클릭 시 목록에서 제거되는지 확인", () => {
      cy.get(".restaurant-item").first().as("targetRestaurant");
      cy.get("@targetRestaurant").find(".delete-button").click();
      cy.get("@targetRestaurant").should("not.exist");
    });
  
    it("음식점 목록에서 즐겨찾기(★) 버튼 클릭 시 추가 및 삭제 동작 확인", () => {
      cy.get(".restaurant-item").first().as("targetRestaurant");
  
      cy.get("@targetRestaurant").find(".favorite-button").click(); // 즐겨찾기 추가
      cy.get("@targetRestaurant").find(".favorite-button").should("have.class", "active");
  
      cy.get("@targetRestaurant").find(".favorite-button").click(); // 즐겨찾기 제거
      cy.get("@targetRestaurant").find(".favorite-button").should("not.have.class", "active");
    });
  
    it("음식점 상세 정보 모달에서 즐겨찾기(★) 추가가 가능한지 확인", () => {
      cy.get(".restaurant-item").first().click();
      cy.get(".modal .favorite-button").click();
      cy.get(".modal .favorite-button").should("have.class", "active");
    });
  
    it("자주 가는 음식점 탭에서 추가한 음식점이 정상적으로 유지되는지 확인", () => {
      cy.get(".restaurant-item").first().find(".favorite-button").click();
      cy.get(".tab-favorites").click();
      cy.get(".restaurant-item").should("have.length.greaterThan", 0);
    });
  });
  
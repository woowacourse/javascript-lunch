describe("즐겨찾기 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("ALL 탭에서 도스타코스 선릉점 즐겨찾기 등록 후, 상세 모달에서 즐겨찾기 아이콘이 채워진 상태로 표시된다.", () => {
    // ALL 탭에서 도스타코스 선릉점 아이템을 찾아 즐겨찾기 버튼 클릭하여 등록
    cy.contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .find('[data-testid="favorite-button"]')
      .click();

    // 도스타코스 선릉점 아이템을 클릭해 상세 모달을 연다.
    cy.contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .click();

    // 모달 내부의 즐겨찾기 버튼의 이미지 src가 'favorite-icon-filled.png'인지 확인
    cy.get('[data-testid="restaurant-detail-modal"]')
      .find('[data-testid="favorite-button"] img')
      .should("have.attr", "src")
      .and("include", "favorite-icon-filled.png");
  });

  it("ALL 탭에서 도스타코스 선릉점 즐겨찾기 등록 후, FAVORITE 탭에서 해당 음식점이 리스트에 나타난다.", () => {
    // ALL 탭에서 도스타코스 선릉점 아이템의 즐겨찾기 버튼 클릭하여 등록
    cy.contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .find('[data-testid="favorite-button"]')
      .click();

    // FAVORITE 탭 버튼 클릭
    cy.get('[data-testid="favorite-tab"]').click();

    // FAVORITE 탭에 도스타코스 선릉점이 존재하는지 확인
    cy.get('[data-testid="restaurant-list"]').within(() => {
      cy.contains("li", "도스타코스 선릉점").should("exist");
    });
  });

  it("ALL 탭에서 도스타코스 선릉점 모달 내에서 즐겨찾기 등록 시, 모달 외부 리스트에도 반영된다.", () => {
    // ALL 탭에서 도스타코스 선릉점 아이템 클릭하여 모달 열기
    cy.contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .click();

    // 모달 내 즐겨찾기 버튼 클릭하여 즐겨찾기 등록
    cy.get('[data-testid="restaurant-detail-modal"]')
      .find('[data-testid="favorite-button"]')
      .should("exist")
      .click();

    // ALL 탭의 도스타코스 선릉점 아이템 즐겨찾기 버튼의 이미지 src가 'favorite-icon-filled.png'로 변경되었는지 확인
    cy.contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .find('[data-testid="favorite-button"] img')
      .should("have.attr", "src")
      .and("include", "favorite-icon-filled.png");
  });

  it("즐겨찾기 등록 -> FAVORITE 탭 전환 -> 즐겨찾기 취소 -> ALL 탭 및 FAVORITE 탭 상태 확인", () => {
    // ALL 탭에서 "도스타코스 선릉점" 즐겨찾기 등록
    cy.get('[data-testid="restaurant-list"] li')
      .contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .find('[data-testid="favorite-button"]')
      .click();

    // FAVORITE 탭으로 전환
    cy.get('[data-testid="favorite-tab"]').click();

    // FAVORITE 탭에서 "도스타코스 선릉점"이 존재하는지 확인
    cy.get('[data-testid="restaurant-list"]').within(() => {
      cy.contains("li", "도스타코스 선릉점").should("exist");
    });

    // FAVORITE 탭에서 "도스타코스 선릉점" 즐겨찾기 버튼 클릭하여 취소
    cy.get('[data-testid="restaurant-list"] li')
      .contains('[data-testid="restaurant-item-name"]', "도스타코스 선릉점")
      .parents("li")
      .find('[data-testid="favorite-button"]')
      .click();

    // FAVORITE 탭에서는 "도스타코스 선릉점"이 아직 존재해야 함
    cy.get('[data-testid="restaurant-list"]').within(() => {
      cy.contains("li", "도스타코스 선릉점").should("exist");
    });

    // ALL 탭으로 전환
    cy.get('[data-testid="all-tab"]').click();

    // 다시 FAVORITE 탭으로 전환하면, "도스타코스 선릉점"은 즐겨찾기 목록에 나타나지 않아야 함
    cy.get('[data-testid="favorite-tab"]').click();
    cy.get('[data-testid="restaurant-list"]').within(() => {
      cy.contains("li", "도스타코스 선릉점").should("not.exist");
    });
  });
});

describe("식당 목록", () => {
  it("첫 화면에서 식당 리스트가 보인다.", () => {
    cy.visit("http://localhost:5174");
    cy.get(".restaurant-list");
  });
});
describe("식당 추가", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5174");

    cy.get(".gnb__button").click();
  });

  it("추가 버튼을 누르면 모달이 보인다.", () => {
    cy.get(".modal");
  });
  it("모달창에는 카테고리, 이름, 거리, 설명, 참고 링크 input UI가 있어야한다.", () => {
    cy.get("#category");
    cy.get("#name");
    cy.get("#distance");
    cy.get("#description");
    cy.get("#link");
  });
  it("각 값을 입력하여 ‘추가하기’ 버튼을 누르면 식당 리스트가 추가된다.", () => {
    cy.get("#category").select("일식");
    cy.get("#name").type("이름입니다");
    cy.get("#distance").select("10");
    cy.get("#description").type("설명입니다");

    cy.get("#modal-add").click();

    cy.contains("이름입니다");
    cy.contains("10");
    cy.contains("설명입니다");
  });
  it("취소 버튼을 누르면 메인 화면으로 돌아간다.", () => {
    cy.get("#modal-cancel").click();

    cy.contains("새로운 음식점");
  });
});

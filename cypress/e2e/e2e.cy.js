describe("선호 버튼 클릭 시 선호식당 목록에 추가", () => {
  beforeEach(() => {
    cy.viewport(720, 1280);
    cy.visit("http://localhost:8080/");
  });

  it("아무것도 선호 버튼을 누르지 않았을 경우 빈 목록", () => {
    cy.get(".likeList").click();
    cy.get(".restaurant-list").children().should("have.length", 0);
  });

  it("첫 번째 식당의 선호 버튼을 누른 경우 목록에 하나 추가", () => {
    cy.get("#1 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get(".likeList").click();
    cy.get("#1").should("exist");
  });

  it("두 개 식당의 선호 버튼을 누른 경우 목록에 두 개 추가", () => {
    cy.get("#2 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get("#3 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get(".likeList").click();
    cy.get(".restaurant-list").children().should("have.length", 2);
  });
});

describe("선호 가게 목록에서 선호 버튼 클릭 시 선호 해제", () => {
  beforeEach(() => {
    cy.viewport(720, 1280);
    cy.visit("http://localhost:8080/");
    cy.get("#2 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get("#3 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get(".likeList").click();
  });

  it("선호 목록에 있는 모든 가게의 선호 버튼을 누른 경우 빈 목록", () => {
    cy.get("#2 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get("#3 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get(".restaurant-list").children().should("have.length", 0);
  });

  it("선호 목록에 있는 한 가게의 선호 버튼을 누른 경우 한 가게만 남음", () => {
    cy.get("#2 > .restaurant__info > .restaurant__main > .likeImg").click();
    cy.get(".restaurant-list").children().should("have.length", 1);
  });
});

describe("새로운 레스토랑 추가", () => {
  beforeEach(() => {
    cy.viewport(720, 1280);
    cy.visit("http://localhost:8080/");
    cy.get(".gnb__button").click();
  });

  it("추가창 버튼을 누르면 바텀시트 등장", () => {
    cy.get(".bottomSheet").should("exist");
  });

  it("추가창에서 필수항목을 입력하지 않고 버튼을 누르는 경우 입력되지 않음", () => {
    cy.get(".button--primary").click();
    cy.get(".bottomSheet").should("exist");
  });

  it("추가창에서 필수항목만 입력하고 버튼을 누르는 경우 가게 추가됨", () => {
    const name = "수아";
    cy.get("#category").select(1);
    cy.get("#name").type(name);
    cy.get("#takeTime").select(1);
    cy.get(".button--primary").click();

    cy.get("h3").contains("수아");
  });

  it("추가창에서 올바르지 않은 링크를 입력 시 가게 추가가 되지 않음", () => {
    const name = "수아";
    cy.get("#category").select(1);
    cy.get("#name").type(name);
    cy.get("#takeTime").select(1);
    cy.get("#link").type(name);
    cy.get(".button--primary").click();

    cy.get(".bottomSheet").should("exist");
  });
});

describe("레스토랑 목록을 누르면 bottom sheet가 등장", () => {
  beforeEach(() => {
    cy.viewport(720, 1280);
    cy.visit("http://localhost:8080/");
    cy.get("#1 > .restaurant__info > .restaurant__main").click();
  });

  it("레스토랑 클릭 시 정보 바텀시트 등장", () => {
    cy.get(".info-BottomSheet").should("exist");
  });

  it("정보 바텀시트에서 클릭한 가게의 정보가 맞는 지 확인", () => {
    cy.get("#1").should("exist");
  });
});

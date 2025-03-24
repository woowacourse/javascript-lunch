describe("등록하기 폼 모달창 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("메뉴 추가 버튼을 눌렀을때 모달창이 열린다.", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal-backdrop").should("have.class", "open");
  });

  it("취소하기 버튼을 누르면 모달창이 닫힌다.", () => {
    cy.get(".gnb__button").click();

    cy.get("#cancel-button").click();
    cy.get(".modal-backdrop").should("not.have.class", "open");
  });
});

describe("식당 상세보기 모달창 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("각 식당의 식당명을을 누르면 해당 식당의 디테일 정보 모달창이 열린다.", () => {
    // given
    const index = 4;

    // when
    cy.get(`#restaurant__info__${index} .restaurant__name`).click();

    // then
    cy.get(`#restaurant__info__${index} .restaurant__name`)
      .invoke("text")
      .then((text) => {
        cy.get(".modal-container").should("contain.text", text);
      });

    cy.get(`#restaurant__info__${index} .restaurant__distance`)
      .invoke("text")
      .then((text) => {
        cy.get(".modal-container").should("contain.text", text);
      });

    cy.get(`#restaurant__info__${index} .restaurant__description`)
      .invoke("text")
      .then((text) => {
        cy.get(".modal-container").should("contain.text", text);
      });
  });

  it("닫기 버튼을 누르면 모달창이 닫힌다.", () => {
    // given
    const index = 4;
    cy.get(`#restaurant__info__${index} .restaurant__name`).click();
    // when
    cy.get("#close-button").click();
    // then
    cy.get(".modal-backdrop").should("not.have.class", "open");
  });
});

describe("모달 동작 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("모달 바깥 회색창을 누르면 모달창이 닫힌다.", () => {
    cy.get(".modal-backdrop").invoke("addClass", "open");

    cy.get(".modal-backdrop").click("top");
    cy.get(".modal-backdrop").should("not.have.class", "open");
  });
});

import { HEADER_CONTENTS } from "../../src/contants.js";

describe("header 태그 E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5500");
  });

  it("header 태그가 렌더링이 되었는지 확인한다.", () => {
    cy.get("header").should("exist");
  });

  it("header 컴포넌트 인자가 화면에 표시 되었는지 확인한다.", () => {
    cy.get("header").should("contain", HEADER_CONTENTS.TITLE);
  });

  it("header태그의 모달버튼을 누를시, 모달이 활성화된다.", () => {
    cy.get("header button").click();

    setTimeout(() => {
      cy.get(".modal--open").should("exsit");
    }, 1000);
  });
});

describe("점심 뭐 먹지 - E2E 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("유저가 모달을 열고 닫을 수 있어야 한다", () => {
    cy.get(".modal").should("not.have.class", "modal--open");

    openModal();
    cy.get(".modal").should("have.class", "modal--open");

    closeModal();
    cy.get(".modal").should("not.have.class", "modal--open");

    openModal();
    cy.get(".modal-backdrop").click({ force: true }); // 배경 클릭으로 닫기
    cy.get(".modal").should("not.have.class", "modal--open");

    openModal();
    cy.get("body").type("{esc}"); // ESC 키로 닫기
    cy.get(".modal").should("not.have.class", "modal--open");

    openModal();
    cy.get(".cancel-button").click({ force: true }); // 취소 버튼으로 닫기
    cy.get(".modal").should("not.have.class", "modal--open");
  });

  it("헤더에서 음식점 추가 버튼을 클릭하면 모달이 열려야 한다", () => {
    cy.get(".gnb__button").click();
    cy.get(".modal").should("have.class", "modal--open");
  });

  it("유저가 음식점을 추가하고, 목록에서 확인할 수 있어야 한다", () => {
    openModal();

    fillRestaurantForm({
      category: "한식",
      name: "김찌",
      distance: "10",
      description: "맛도리도리 김치찌개",
      link: "https://kimchi.com",
    });

    submitForm();
    closeModal();

    // 목록에 추가된 음식점이 있는지 확인
    cy.get(".restaurant-list").within(() => {
      cy.get("img")
        .should("exist")
        .should("have.attr", "src")
        .and("include", "category-korean.png");

      cy.contains(".restaurant__name", "김찌").should("exist");
      cy.contains(".restaurant__distance", "캠퍼스부터 10분 내").should(
        "exist"
      );
      cy.contains(".restaurant__description", "맛도리도리 김치찌개").should(
        "exist"
      );
    });
  });

  describe("유저가 음식점 추가 시, 필수 값을 모두 입력하지 않으면 경고창이 나타난다", () => {
    beforeEach(() => {
      openModal();
    });

    it("아무것도 입력하지 않은 경우", () => {
      submitForm();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("카테고리(은)는 필수 값입니다.");
      });
    });

    it("카테고리를 입력하지 않은 경우", () => {
      fillRestaurantForm({ name: "김찌", distance: "5" });
      submitForm();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("카테고리(은)는 필수 값입니다.");
      });
    });

    it("이름을 입력하지 않은 경우", () => {
      fillRestaurantForm({ category:"중식", distance: "5" });
      submitForm();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("이름(은)는 필수 값입니다.");
      });
    });

    it("이름에 공백이 입력된 경우", () => {
      fillRestaurantForm({ category:"중식", name:"  ", distance: "5" });
      submitForm();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("이름(은)는 필수 값입니다.");
      });
    });

    it("거리를 입력하지 않은 경우", () => {
      fillRestaurantForm({ category:"중식", name: "째쟁면" });
      submitForm();
      cy.on("window:alert", (message) => {
        expect(message).to.equal("거리(도보 이동 시간)(은)는 필수 값입니다.");
      });
    });
  });
});

/* 공통 유틸리티 함수 */
const openModal = () => {
  cy.get(".gnb__button").click();
  cy.get(".modal").should("have.class", "modal--open");
};

const closeModal = () => {
  cy.get(".cancel-button").click({ force: true });
  cy.get(".modal").should("not.have.class", "modal--open");
};

const fillRestaurantForm = ({
  category,
  name,
  distance,
  description,
  link,
}) => {
  if (category) cy.get("#category").select(category);
  if (name) cy.get("#name").type(name);
  if (distance) cy.get("#distance").select(distance);
  if (description) cy.get("#description").type(description);
  if (link) cy.get("#link").type(link);
};

const submitForm = () => {
  cy.get(".button--primary").click({ force: true });
};

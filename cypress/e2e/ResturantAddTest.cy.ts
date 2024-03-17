import { ERROR_MESSAGES } from "../../src/constants/menu";

const VALID_TEST_DATA = [
  {
    name: "써니식당",
    category: "한식",
    distance: 5,
    isFavorite: false,
    description: "",
    link: "",
  },
  {
    name: "시루식당",
    category: "아시안",
    distance: 10,
    isFavorite: false,
    description:
      "브리튀시 숏헤어 김시루가 운영하는 식당. 까칠한 고양이 사장님이지만, 맛은 보장된다. 🐈‍⬛",
    link: "",
  },
  {
    name: "해리식당",
    category: "일식",
    distance: 15,
    isFavorite: false,
    description:
      "우아한테크코스 6기 FE 해리가 운영하는 식당. 선릉 캠퍼스와 매우 까우며, 맛집으로 유명하다.",
    link: "https://github.com/hwinkr",
  },
  {
    name: "하루식당",
    category: "중식",
    distance: 20,
    isFavorite: false,
    description:
      "우아한테크코스 웹 프론트엔드 리뷰어 하루가 운영하는 식당. 사장님의 리뷰가 정말 좋은 것으로 유명하다. 😊",
    link: "",
  },
  {
    name: "칙바이칙",
    category: "양식",
    distance: 30,
    isFavorite: false,
    description: "선릉역에서 맛있다고 소문이 난 햄버거집이다. 🍔",
    link: "",
  },
];

export const INVALID_TEST_DATA = [
  {
    invalidData: {
      name: "고양이",
      category: "",
      distance: 5,
      description: "",
      link: "",
    },
    errorMessage: ERROR_MESSAGES.invalidCategory,
  },
  {
    invalidData: {
      name: "",
      category: "한식",
      distance: 10,
      description: "",
      link: "",
    },
    errorMessage: ERROR_MESSAGES.invalidRestaurantName,
  },
  {
    invalidData: {
      name: "점심뭐먹을지고민하지마세요",
      category: "일식",
      distance: 10,
      description: "",
      link: "",
    },
    errorMessage: ERROR_MESSAGES.invalidRestaurantName,
  },
  {
    invalidData: {
      name: "해리식당",
      category: "중식",
      distance: "",
      description: "",
      link: "",
    },
    errorMessage: ERROR_MESSAGES.invalidDistance,
  },
  {
    invalidData: {
      name: "멕시카나",
      category: "양식",
      distance: 5,
      description:
        "멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴멕시칸 캐주얼 그릴",
      link: "",
    },
    errorMessage: ERROR_MESSAGES.invalidDescriptionLength,
  },
];

describe("새로운 음식점 추가 테스트", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("식당 입력값이 유효할 경우, 음식점 목록의 가장 마지막에 추가된다.", () => {
    VALID_TEST_DATA.forEach(
      ({ name, category, distance, description, link }) => {
        cy.get(".gnb__button").click();

        cy.get("select#category-select").select(category);
        cy.get("input#name-input").type(name);
        cy.get("select#distance-select").select(String(distance));
        description && cy.get("textarea#description").type(description);
        link && cy.get("input#link-input").type(link);

        cy.get("#restaurant-add-form").submit();

        cy.get(".restaurant-list-container")
          .children()
          .last()
          .should("have.attr", "name", name)
          .and("have.attr", "category", category)
          .and("have.attr", "distance", distance)
          .and("have.attr", "description", description)
          .and("have.attr", "is-favorite", "false");
      }
    );
  });

  it("새로고침을 해도 새로 추가한 음식점 정보가 유지된다.", () => {
    const { name, category, distance, description, link } = VALID_TEST_DATA[0];
    const EXPECTED_RESTAURANT_LENGTH = 7;

    cy.get(".gnb__button").click();

    cy.get("select#category-select").select(category);
    cy.get("input#name-input").type(name);
    cy.get("select#distance-select").select(String(distance));
    description && cy.get("textarea#description").type(description);
    link && cy.get("input#link-input").type(link);

    cy.get("#restaurant-add-form").submit();

    cy.reload();

    cy.get(".restaurant-list-container")
      .children()
      .should("have.length", EXPECTED_RESTAURANT_LENGTH);

    cy.get(".restaurant-list-container")
      .children()
      .last()
      .should("have.attr", "name", name)
      .and("have.attr", "category", category)
      .and("have.attr", "distance", distance)
      .and("have.attr", "description", description)
      .and("have.attr", "is-favorite", "false");
  });

  it("식당 입력값이 유효하지 않을 경우, alert로 에러 메시지가 확인된다.", () => {
    INVALID_TEST_DATA.forEach(({ invalidData, errorMessage }) => {
      const { name, category, distance, description, link } = invalidData;

      cy.get(".gnb__button").click();

      category && cy.get("select#category-select").select(category);
      name && cy.get("input#name-input").type(name);
      distance && cy.get("select#distance-select").select(String(distance));
      description && cy.get("textarea#description").type(description);
      link && cy.get("input#link-input").type(link);

      const alertStub = cy.stub();
      cy.on("window:alert", alertStub);

      cy.get("#restaurant-add-form")
        .submit()
        .then(() => {
          expect(alertStub).to.be.calledWith(errorMessage);
        });

      cy.reload();
    });
  });
});

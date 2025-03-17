import { FAVORITE_ASSETS } from "../../src/constants/constants";
import { Restaurant } from "./../../types/interfaces";
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// declare global {
//   namespace Cypress {
//     interface Chainable {}
//   }
// }

Cypress.Commands.add("initializeTestEnvironment", () => {
  // 초기 세팅
  cy.visit("http://localhost:5173/");
  cy.viewport(1536, 960);
});

Cypress.Commands.add("openForm", () => {
  // Header의 음식점 추가 바텀 시트 열기 버튼 클릭
  cy.get(".gnb__button").click();
});

Cypress.Commands.add(
  "fillForm",
  (formData: Record<keyof Omit<Restaurant, "id" | "isFavorite">, string>) => {
    // 음식점 폼 입력

    const fieldSelectors = {
      category: `select[name="category"]`,
      name: `input[name="name"]`,
      distance: `select[name="distance"]`,
      description: `textarea[name="description"]`,
      link: `input[name="link"]`,
    };

    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        const selector = fieldSelectors[key];
        cy.get(selector).should("be.visible");

        if (key === "category" || key === "distance") {
          cy.get(selector).select(value).should("have.value", value);
        } else {
          cy.get(selector).type(value).should("have.value", value);
        }
      }
    });
  }
);

Cypress.Commands.add("clickAddButton", () => {
  // 음식점 추가하기 버튼 클릭
  cy.contains("button", "추가하기").should("exist").and("be.visible").click();
});

Cypress.Commands.add("clickCloseButton", () => {
  // 닫기 버튼 클릭
  cy.contains("button", "닫기").should("exist").and("be.visible").click();
});

Cypress.Commands.add("openDetailModal", () => {
  // 상세 정보 바텀 시트 열기
  cy.get(".restaurant-list .restaurant")
    .should("exist")
    .and("be.visible")
    .first()
    .click();
});

Cypress.Commands.add("isSubmitModalOpen", () => {
  // 제출 폼 바텀 시트가 보이는지 확인
  cy.get("#submit-form").should("have.class", "modal--open");
});

Cypress.Commands.add("isSubmitModalClose", () => {
  // 제출 폼 바텀 시트가 보이지 않는지 확인
  cy.get("#submit-form").should("not.have.class", "modal--open");
});

Cypress.Commands.add("isDetailModalOpen", () => {
  // 상세 정보 바텀 시트가 보이는지 확인
  cy.get("#open-detail").should("have.class", "modal--open");
});

Cypress.Commands.add("isDetailModalClose", () => {
  // 상세 정보 바텀 시트가 보이지 않는지 확인
  cy.get("#open-detail").should("not.have.class", "modal--open");
});

Cypress.Commands.add("clickFavoriteButtonInRestaurantList", () => {
  // 음식점 목록에서 자주 가는 음식점 버튼 클릭 (추가, 해제 모두 가능)
  cy.get(".restaurant-list .restaurant .favorite-button")
    .should("exist")
    .and("be.visible")
    .first()
    .click();
});

Cypress.Commands.add("clickFavoriteRestaurantTab", () => {
  // 자주 가는 음식점 목록 들어가기
  cy.get(".restaurant-favorite-menu").click();
});

Cypress.Commands.add("checkNotExistRestaurant", () => {
  // 음식점 목록에 음식점이 존재하지 않는지 확인
  cy.get(".restaurant-list .restaurant").should("not.exist");
});

Cypress.Commands.add("checkFavoriteButtonInDetailModal", () => {
  // 상세 정보 바텀 시트에 자주 가는 음식점 버튼 존재하는지 확인
  cy.get("#open-detail .favorite-button").should("exist").and("be.visible");
});

Cypress.Commands.add(
  "checkFavoriteIconSrc",
  (src: (typeof FAVORITE_ASSETS)[keyof typeof FAVORITE_ASSETS]) => {
    cy.get(".restaurant-list .restaurant")
      .should("exist")
      .and("be.visible")
      .first()
      .find(".favorite-icon")
      .should("have.attr", "src", src);
  }
);

export {};

import { ERROR_MESSAGE } from "../settings/settings.js";
import {
  _validateRestaurantCategory,
  _validateRestaurantName,
  _validateRestaurantDistance,
  _validateRestaurantDescription,
  _validateRestaurantLink,
} from "./restaurantFormValidation.js";

describe("음식 추가하기 폼 테스트", () => {
  describe("카테고리 유효성 검사", () => {
    it("짜장면은 카테고리에 존재하지 않는다.", () => {
      const category = "짜장면";
      expect(() => _validateRestaurantCategory(category)).toThrow(
        ERROR_MESSAGE.INVALID_CATEGORY
      );
    });

    it("한식은 유효한 카테고리이다.", () => {
      const category = "한식";
      expect(() => _validateRestaurantCategory(category)).not.toThrow();
    });
  });

  describe("음식점 이름 유효성 검사", () => {
    it("이름: ''은 유효하지 않은 이름이다. ", () => {
      const restaurantName = "";
      expect(() => _validateRestaurantName(restaurantName)).toThrow(
        ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH
      );
    });

    it("이름: '일이삼사오육칠팔구십일이삼'는 유효하지 않은 이름이다.", () => {
      const restaurantName = "일이삼사오육칠팔구십일이삼";
      expect(() => _validateRestaurantName(restaurantName)).toThrow(
        ERROR_MESSAGE.INVALID_RESTAURANT_NAME_LENGTH
      );
    });

    it("이름: '일이삼사오육칠팔구십일이'는 유효한 이름이다.", () => {
      const restaurantName = "일이삼사오육칠팔구십일이";
      expect(() => _validateRestaurantName(restaurantName)).not.toThrow();
    });
  });

  describe("음식점 거리 유효성 검사", () => {
    it("4분은 유효하지 않는 거리이다.", () => {
      const distance = "4";
      expect(() => _validateRestaurantDistance(distance)).toThrow(
        ERROR_MESSAGE.INVALID_RESTAURANT_DISTANCE
      );
    });

    it("5분은 유효한 거리이다.", () => {
      const distance = "5";
      expect(() => _validateRestaurantDistance(distance)).not.toThrow();
    });
  });

  describe("음식점 설명 유효성 검사", () => {
    it("301자의 텍스트는 유효하지 않다..", () => {
      const description = Array.from({ length: 301 }, (_, idx) => idx).join("");
      expect(() => _validateRestaurantDescription(description)).toThrow(
        ERROR_MESSAGE.INVALID_RESTAURANT_DESCRIPTION_LENGTH
      );
    });

    it("5글자의 텍스트는 유효하다.", () => {
      const description = "안녕하세요";
      expect(() => _validateRestaurantDescription(description)).not.toThrow();
    });
  });

  describe("음식점 링크 유효성 검사", () => {
    it("301자의 텍스트는 유효하지 않다..", () => {
      const link = Array.from({ length: 301 }, (_, idx) => idx).join("");
      expect(() => _validateRestaurantLink(link)).toThrow(
        ERROR_MESSAGE.INVALID_RESTAURANT_LINK_LENGTH
      );
    });

    it("5글자의 텍스트는 유효하다.", () => {
      const link = "안녕하세요";
      expect(() => _validateRestaurantLink(link)).not.toThrow();
    });
  });
});

/**
 * @jest-environment jsdom
 */

import { screen, fireEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";
import RestaurantInfo from "../src/domain/RestaurantInfo";

document.body.innerHTML = `
<form>
    <select name="category" id="category" required>
    <option>일식</option>
    </select>

    <input type="text" name="name" id="name" value="역전우동" required />

    <select name="distance" id="distance" required>
    <option>10</option>
    </select>

    <textarea
        name="description"
        id="description"
        cols="30"
        rows="5"
    >맛있음</textarea>

    <input type="text" name="link" id="link" />
</form>
`;

test("음식점 입력정보를 가져오는 함수 테스트", () => {
  const result = RestaurantInfo.get();
  expect(result).toEqual({
    category: "일식",
    name: "역전우동",
    distance: "10",
    description: "맛있음",
    link: "",
  });
});

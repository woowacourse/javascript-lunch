/**
 * @jest-environment jsdom
 */

import { screen, fireEvent, userEvent } from "@testing-library/dom";
import "@testing-library/jest-dom";

import SelectContainer from "../src/component/disposable/SelectContainer";

describe("unit test", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  test("select 컴포넌트를 생성한다.", () => {
    SelectContainer.render(document.body);

    const comboboxes = screen.getAllByRole("combobox");
    fireEvent.click(comboboxes[0], { target: { value: "한식" } });
    fireEvent.click(comboboxes[1], { target: { value: "거리순" } });

    expect(comboboxes[0]).toHaveValue("한식");
    expect(comboboxes[1]).toHaveValue("거리순");

    expect(screen.getByRole("option", { name: "한식" }).selected).toBe(true);
    expect(screen.getByRole("option", { name: "중식" }).selected).toBe(false);
    expect(screen.getByRole("option", { name: "양식" }).selected).toBe(false);
  });
});

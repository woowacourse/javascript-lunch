/**
 * @jest-environment jsdom
 */

import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { $ } from "../src/util/selector";
import { handleModalCancelButtonClick } from "../src/ui/modal";

describe("모달창 닫기 테스트", () => {
  test("취소하기 버튼을 클릭하면 모달창이 종료된다.", () => {
    const modal = $(".modal");
    handleModalCancelButtonClick();

    expect(getByText(modal, "새로운 음식점")).not.toBeNull();
  });
});

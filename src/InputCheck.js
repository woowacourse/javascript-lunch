import Input from "./Input";
import Alert from "./util/Alert";
import { $ } from "./util/querySelector";

export const checkSelected = () => {
  const categoryAlert = new Alert("#alert-category");
  const nameAlert = new Alert("#alert-name");
  const distanceAlert = new Alert("#alert-distance");
  const linkAlert = new Alert("#alert-link");

  $("#category")?.addEventListener("focusout", () => {
    try {
      Input.checkCategory($("#category").value);
      categoryAlert.hide();
    } catch (e) {
      categoryAlert.show(e.message);
    }
  });

  $("#name")?.addEventListener("focusout", () => {
    try {
      Input.checkName($("#name").value);
      nameAlert.hide();
    } catch (e) {
      nameAlert.show(e.message);
    }
  });

  $("#distance")?.addEventListener("focusout", () => {
    try {
      Input.checkDistance($("#distance").value);
      distanceAlert.hide();
    } catch (e) {
      distanceAlert.show(e.message);
    }
  });

  $("#link")?.addEventListener("focusout", () => {
    try {
      Input.checkLink($("#link").value);
      linkAlert.hide();
    } catch (e) {
      linkAlert.show(e.message);
    }
  });
};

import { LunchList } from "../components/function/LunchList.ts";

function ChangeEvent(lunchList) {
  document.removeEventListener("change", onChange);
  document.addEventListener("change", onChange.bind(this));

  function onChange(event) {
    const target = event.target;
    if (!target) return;

    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case "categoryFilter-change":
        lunchList.updateFilter({ category: target.value });
        break;
      case "sortFilter-change":
        lunchList.updateFilter({ sortOption: target.value });
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }
}

export default ChangeEvent;

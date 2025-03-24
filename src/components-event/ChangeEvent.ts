import { ChangeActions } from "./constants/Events.js";
import { LunchList } from "../components/function/LunchList.js";

function ChangeEvent(lunchList: ReturnType<typeof LunchList>): void {
  document.removeEventListener("change", onChange);
  document.addEventListener("change", onChange);

  function onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case ChangeActions.CATEGORY_FILTER:
        lunchList.updateFilterState({ category: target.value });
        break;
      case ChangeActions.SORT_FILTER:
        lunchList.updateFilterState({
          sortOption: target.value as "name" | "distance",
        });
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }
}

export default ChangeEvent;

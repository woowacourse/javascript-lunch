import { ILunchItem } from "../type";

function ChangeEvent(lunchList: ILunchItem[]): void {
  document.removeEventListener("change", onChange);
  document.addEventListener("change", onChange.bind(this));

  function onChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    if (!target) return;

    const action = target.dataset.action;
    if (!action) return;

    switch (action) {
      case "categoryFilter-change":
        lunchList.updateFilter({ category: target.value });
        break;
      case "sortFilter-change":
        lunchList.updateFilter({
          sortOption: target.value as "name" | "distance",
        });
        break;

      default:
        console.warn(`Unknown action: ${action}`);
    }
  }
}

export default ChangeEvent;

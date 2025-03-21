import { LunchList } from "../components/function/LunchList";
import { ILunchItem } from "../type";
import { getStorage, setStorage } from "../utils/storage";

const getHTML = (id: string): HTMLElement | null => document.getElementById(id);

function SubmitEvent(lunchList: ILunchItem[]) {
  document.addEventListener("submit", onSubmit.bind(this));

  function handleRestaurantSubmit(event: Event, form: HTMLFormElement): void {
    event.preventDefault();
    const formData = new FormData(form);
    const category = formData.get("category") as string;
    const name = formData.get("name") as string;
    const distance = formData.get("distance") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const id = crypto.randomUUID() as string;

    lunchList.addRestaurantItem({
      id,
      category,
      name,
      distance,
      description,
      link,
    });
    closeModal();
  }

  function deleteStore(event: SubmitEvent, form): void {
    const dataID = form.dataset.id;
    console.log("dataID", dataID);
    if (!dataID) return;
    const storageLunchItems = getStorage("lunchItems") as ILunchItem[];

    // storageLunchItems.splice(Number(lunchItemIndex), 1);
    const newStorageLunchItems = storageLunchItems.filter(
      (item) => item.id !== dataID
    );
    console.log("newStorageLunchItems", newStorageLunchItems);

    setStorage("lunchItems", newStorageLunchItems);
    LunchList().render();
    LunchList().renderFavorites();
    closeModal();
  }

  function closeModal(): void {
    const modalBackground = getHTML("modalBackground");
    if (modalBackground) {
      modalBackground.classList.remove("show");
    }
  }

  function onSubmit(event: SubmitEvent): void {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    console.log("form??", form);
    if (!form) return;

    if (form.id === "restaurantForm") {
      handleRestaurantSubmit(event, form);
    }

    if (form.id === "storeDeleteForm") {
      deleteStore(event, form);
    }

    form.reset();
  }
}

export default SubmitEvent;

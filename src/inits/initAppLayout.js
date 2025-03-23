import Modal from "../components/common/Modal";
import modalClose from "../components/common/Modal/modalClose";
import Title from "../components/common/Title";
import Header from "../components/Header";
import RegisterForm from "../components/RegisterForm";
import Tab from "../components/Tab";
import clickAddButton from "../events/clickAddButton";
import renderAllpage from "../ui/renderAllpage";
import renderFavoritesPage from "../ui/renderFavoritesPage";
import { clearInput } from "../utils/clearInput";
import { $ } from "../utils/dom";

export const initAppLayout = (restaurantList) => {
  const app = $("#app");
  app.prepend(Header());

  $("nav").appendChild(
    Tab((selectedTab) => {
      if (selectedTab === "all") {
        renderAllpage(restaurantList);
      } else {
        renderFavoritesPage(restaurantList);
      }
    })
  );

  $("main").appendChild(
    Modal({
      handleClickBackDrop: () => {
        modalClose("#register-modal-backdrop");
        clearInput("#register-form");
      },
      id: "register-modal-backdrop",
      classNames: ["register-modal"],
      contents: [
        Title("새로운 음식점", "h2", "modal-title", "text-title"),
        RegisterForm(restaurantList, clickAddButton),
      ],
    })
  );

  $("main").appendChild(
    Modal({
      id: "restaurant-detail-modal-backdrop",
      classNames: ["restaurant-detail-modal"],
      handleClickBackDrop: () => {
        modalClose("#restaurant-detail-modal-backdrop");
      },
    })
  );
};

import errorContainer from "../../components/errorContainer.js";
import fallbackComponent from "../../components/fallbackComponent.js";
import buttonContainer from "./components/buttonContainer";
import categorySelect from "./components/categorySelect";
import description from "./components/description";
import distanceSelect from "./components/distanceSelect";
import linkInput from "./components/linkInput";
import nameInput from "./components/nameInput";
import restaurantList from "./components/restaurantList";

const renderMainPage = () => {
  errorContainer(() => restaurantList(), fallbackComponent);
  errorContainer(() => buttonContainer(), fallbackComponent);
  errorContainer(() => nameInput(), fallbackComponent);
  errorContainer(() => linkInput(), fallbackComponent);
  errorContainer(() => distanceSelect(), fallbackComponent);
  errorContainer(() => categorySelect(), fallbackComponent);
  errorContainer(() => description(), fallbackComponent);
};

export default renderMainPage;

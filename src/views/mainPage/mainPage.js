import errorContainer from "../../components/errorContainer.js";
import fallbackComponent from "../../components/fallbackComponent.js";
import buttonContainer from "../../components/buttonContainer/buttonContainer.js";
import categorySelect from "../../components/categorySelect/categorySelect.js";
import description from "../../components/description/description.js";
import distanceSelect from "../../components/distanceSelect/distanceSelect.js";
import linkInput from "../../components/linkInput/linkInput.js";
import nameInput from "../../components/nameInput/nameInput.js";
import restaurantList from "../../components/restaurantList/restaurantList.js";

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

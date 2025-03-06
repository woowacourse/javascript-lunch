import buttonContainer from "./components/buttonContainer";
import categorySelect from "./components/categorySelect";
import description from "./components/description";
import distanceSelect from "./components/distanceSelect";
import linkInput from "./components/linkInput";
import nameInput from "./components/nameInput";
import restaurantList from "./components/restaurantList";

const renderMainPage = () => {
  restaurantList();
  buttonContainer();
  nameInput();
  linkInput();
  distanceSelect();
  categorySelect();
  description();
};

export default renderMainPage;

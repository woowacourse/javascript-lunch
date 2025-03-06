import Title from "../../common/title";
import registerIcon from "./registerIcon";

const header = () => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.appendChild(Title("점심 뭐 먹지", "h1", "gnb__title", "text-title"));

  header.appendChild(registerIcon());

  return header;
};

export default header;

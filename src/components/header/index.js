import createElement from "../../utils/createElement/createElement";
import Title from "../common/title";
import registerIcon from "./registerIcon";

const header = () => {
  const header = createElement({
    tagName: "header",
    classNames: ["gnb"],
  });

  header.appendChild(Title("점심 뭐 먹지", "h1", "gnb__title", "text-title"));

  header.appendChild(registerIcon());

  return header;
};

export default header;

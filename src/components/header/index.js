import Title from "../common/title";
import registerIcon from "./registerIcon";

const header = (onRegister) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.appendChild(
    Title({
      text: "점심 뭐 먹지",
      tagName: "h1",
      className: ["gnb__title", "text-title"],
    })
  );

  header.appendChild(registerIcon(onRegister));

  return header;
};

export default header;

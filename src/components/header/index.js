import registerIcon from "./registerIcon";

const header = () => {
  const header = document.createElement("header");
  header.classList.add("gnb");
  header.innerHTML = `
    <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
  `;

  header.appendChild(registerIcon());

  return header;
};

export default header;

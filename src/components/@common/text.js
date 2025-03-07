const text = (props = {}) => {
  const {
    tag = "span",
    size = "medium",
    color = "black",
    children = "",
    className,
  } = props;

  const sizeStyle = {
    large: "text-subtitle",
    medium: "text-body",
  };

  const colorStyle = {
    orange: "primary-color",
    red: "", //TODO: 에러메세지 추가 시 새로 추가
  };

  return `
       <${tag} class="${colorStyle[color] || ""} ${sizeStyle[size] || ""}">
         ${children}
       </${tag}>
    `;
};

export default text;

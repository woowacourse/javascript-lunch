const button = (props) => {
  const { type, onClick, id, className, children } = props;

  const style = {
    primary: "button--primary",
    secondary: "button--secondary",
  };

  return `<button
    type=${type}
    id=${id}
    class="button ${style[className]} text-caption"
  >
    ${children}
  </button>
  `;
};

export default button;

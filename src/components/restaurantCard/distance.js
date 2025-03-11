import createElement from "../../utils/createElement/createElement";

const Distance = (minute) => {
  return createElement({
    tagName: "span",
    classNames: ["restaurant__distance", "text-body"],
    textContent: `캠퍼스부터 ${minute}분 내`,
  });
};

export default Distance;

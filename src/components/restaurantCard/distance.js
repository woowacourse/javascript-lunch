import createElement from "../../utils/createElement/createElement";

const Distance = (minute) =>
  createElement({
    tagName: "span",
    classNames: ["restaurant__distance", "text-body"],
    text: `캠퍼스부터 ${minute}분 내`,
  });

export default Distance;

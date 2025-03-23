import createKeyValuePair from "../../../utils/createKeyValuePair";
import Select from "../../common/Select";

const NameOrDistanceSelector = (handleNameOrDistanceChanged) => {
  const events = {
    change: (e) => handleNameOrDistanceChanged(e),
  };

  return Select({
    name: "sorting",
    required: false,
    options: createKeyValuePair(["name", "distance"], ["이름순", "거리순"]),
    defaultOptionText: "전체",
    events,
  });
};

export default NameOrDistanceSelector;

import Component from "../core/Component";

export default class Filter extends Component {
  template() {
    const { category, sortingWay } = this.props;
    return `
        <select name="category" id="category-filter" class="restaurant-filter">
          <option value="전체" ${category === "전체" ? "selected" : ""}>전체</option>
          <option value="한식" ${category === "한식" ? "selected" : ""}>한식</option>
          <option value="중식" ${category === "중식" ? "selected" : ""}>중식</option>
          <option value="일식" ${category === "일식" ? "selected" : ""}>일식</option>
          <option value="양식" ${category === "양식" ? "selected" : ""}>양식</option>
          <option value="아시안" ${category === "아시안" ? "selected" : ""}>아시안</option>
          <option value="기타" ${category === "기타" ? "selected" : ""}>기타</option>
        </select>

        <select name="sorting" id="sorting-filter" class="restaurant-filter">
          <option value="name" ${sortingWay === "name" ? "selected" : ""}>이름순</option>
          <option value="distance" ${sortingWay === "distance" ? "selected" : ""}>거리순</option>
        </select>
    `;
  }

  setEvent() {
    const { setState } = this.props;
    this.addEvent("change", "#sorting-filter", (e) => {
      setState({ sortingWay: e.target.value });
    });
    this.addEvent("change", "#category-filter", (e) => {
      setState({ category: e.target.value });
    });
  }
}

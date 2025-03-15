import Component from "../core/Component";

class CatagorySelect extends Component {
  template() {
    return ` 
          <select name="category" id="category" required >
            <option value="">선택해 주세요</option>
            <option value="한식">한식</option>
            <option value="중식">중식</option>
            <option value="일식">일식</option>
            <option value="양식">양식</option>
            <option value="아시안">아시안</option>
            <option value="기타">기타</option>
          </select>`;
  }
}

export default CatagorySelect;

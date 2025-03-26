import Component from '../core/Component';

class Select extends Component {
  template() {
    return ` 
          <select name="${this.props.name}" id="${this.props.name}" required >
          <option value="">선택해 주세요</option>
            ${this.props.optionList.map(
              (option) =>
                `<option value="${option}">${this.props.name === 'distance' ? `${option}분 내` : option}</option>`,
            )}
          </select>`;
  }
}

export default Select;

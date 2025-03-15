import Component from '../core/Component';

class Sorter extends Component {
  template() {
    return ` 
              <select name="${this.props.name}" id="${this.props.name}-filter" class="restaurant-filter" >
                 ${this.props.optionList.map((option) => `<option value="${option}">${option}</option>`)}
              </select>`;
  }
}

export default Sorter;

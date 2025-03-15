import Component from '../core/Component';

class Filter extends Component {
  template() {
    return ` 
          <select name="${this.props.name}" id="${this.props.name}-filter" class="restaurant-filter" >
             ${this.props.optionList.map((option) => `<option value="${option}">${option}</option>`)}
          </select>`;
  }

  onRender() {
    const $categorySelect = this.element.querySelector(`#${this.props.name}-filter`);

    $categorySelect.addEventListener('change', (e) => {
      this.props.filterCategory(e.target.value);
    });
  }
}

export default Filter;

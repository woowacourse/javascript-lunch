import Component from '../core/Component';

class Filter extends Component {
  template() {
    return ` 
          <select name="${this.props.name}" id="${this.props.name}-filter" class="restaurant-filter">
             ${this.props.optionList.map(
               (option) =>
                 `<option value="${option}" ${this.props.category === option ? 'selected' : ''}>${option}</option>`,
             )}
          </select>`;
  }

  onRender() {
    this.element.addEventListener('change', (e) => {
      this.props.filterCategory(e.target.value);
    });
  }
}

export default Filter;

import Component from '../core/Component';

class Sorter extends Component {
  template() {
    return ` 
              <select name="${this.props.name}" id="${this.props.name}-filter" class="restaurant-filter" >
                 ${this.props.optionList.map(
                   (option) =>
                     `<option value="${option}" ${this.props.sort === option ? 'selected' : ''}>${option}</option>`,
                 )}
              </select>`;
  }

  onRender() {
    const $listSorter = this.element.querySelector(`#${this.props.name}-filter`);

    $listSorter.addEventListener('change', (e) => {
      this.props.sortList(e.target.value);
    });
  }
}

export default Sorter;

import { categoryChange } from './eventHandlers';
import { renderSelectCategoryLabelComponent, renderBaseSelectCategoryComponent } from './renderHandlers';

function SelectCategory(form: Element) {
  renderBaseSelectCategoryComponent(form);
  renderSelectCategoryLabelComponent();

  categoryChange();
}

export default SelectCategory;

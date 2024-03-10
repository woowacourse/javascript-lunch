import { categoryChange } from './eventHandlers';
import { renderBaseSelectCategoryComponent, renderSelectCategoryLabelComponent } from './renderHandlers';

function SelectCategory(form: Element) {
  renderBaseSelectCategoryComponent(form);
  renderSelectCategoryLabelComponent();

  categoryChange();
}

export default SelectCategory;

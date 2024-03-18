import generateContainerComponent from '../../../uiUtils/generateContainerComponent';
import generateLabelComponent from '../../../uiUtils/generateLabelComponent';
import generateSelectComponent from '../../../uiUtils/generateSelectComponent';
import {
  SELECT_CATEGORY_LABEL_COMPONENT_DATA,
  SELECT_CATEGORY_COMPONENT_DATA,
} from '../../filterBar/componentsData/FilterBarComponentData';
import { SELECT_CATEGORY_CONTAINER_COMPONENT_DATA } from './componentsData/selectCategoryContainerComponentData';

const generateSelectCategoryContainer = () => {
  const selectCategoryContainer = generateContainerComponent(SELECT_CATEGORY_CONTAINER_COMPONENT_DATA);

  return selectCategoryContainer;
};

const renderSelectCategoryComponent = () => {
  const selectCategoryContainer = generateSelectCategoryContainer();
  const selectCategoryLabel = generateLabelComponent(SELECT_CATEGORY_LABEL_COMPONENT_DATA);
  const selectCategorySelect = generateSelectComponent(SELECT_CATEGORY_COMPONENT_DATA);
  selectCategoryContainer.appendChild(selectCategoryLabel);
  selectCategoryContainer.appendChild(selectCategorySelect);

  return selectCategoryContainer;
};

export default renderSelectCategoryComponent;

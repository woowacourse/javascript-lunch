import generateMainComponent from '../../../uiUtils/generateMainComponent';
import MAIN_TAG_COMPONENT_DATA from '../../filterBar/componentsData/mainTagComponentData';

function ApplicationMain() {
  const main = generateMainComponent(MAIN_TAG_COMPONENT_DATA);

  document.body.appendChild(main);
}

export default ApplicationMain;

import './resources.ts';

import { createAppHeader } from './components/AppHeader.ts';
import { IMAGE_MAP } from './constants/imageMap';
import { $ } from './utils/dom';

const $app = $('#app');
const $appHeader = createAppHeader({ titleTextContent: '점심 뭐 먹지', buttonImageSource: IMAGE_MAP.addButton });

$app.appendChild($appHeader);

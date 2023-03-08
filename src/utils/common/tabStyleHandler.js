import { $ } from './domHelper.ts';

export default function updateActiveTab(selected) {
  $(selected).setAttribute('id', 'active');

  $('#active').removeAttribute('id');
}

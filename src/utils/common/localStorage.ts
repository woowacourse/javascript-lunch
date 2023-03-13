import { MockType } from '../../constants/lunchRecommendation';

export function updateData(data: unknown, id: MockType) {
  localStorage.setItem(id, JSON.stringify(data));
}

export function getData(id: MockType, defaultData = '[]') {
  return JSON.parse(localStorage.getItem(id) || defaultData);
}

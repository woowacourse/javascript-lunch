export function addData(data: unknown, id: string = 'mock') {
  localStorage.setItem(id, JSON.stringify(data));
}

export function getData(id: string = 'mock', defaultData = '[]') {
  return JSON.parse(localStorage.getItem(id) || defaultData);
}

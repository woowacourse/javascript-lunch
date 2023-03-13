const localStorage = window.localStorage;

export function saveListOnLocalStorage<T>(key: string, list: T[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function getListOnLocalStorage<T>(key: string): T[] {
  const item = localStorage.getItem(key);

  if (item) {
    return Object.values(JSON.parse(item));
  }

  return [];
}

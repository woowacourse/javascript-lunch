const localStorage = window.localStorage;

export function saveListOnLocalStorage<T>(key: string, list: T[]) {
  localStorage.setItem(key, JSON.stringify(list));
}

export function getListOnLocalStorage<T>(key: string): T[] {
  const list = Object.values(JSON.parse(localStorage.getItem(key)!));

  if (!Array.isArray(list)) {
    return [];
  }

  return list as [];
}

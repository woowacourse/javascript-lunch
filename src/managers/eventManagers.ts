let favoriteChangeListeners: Function[] = [];

export function addFavoriteChangeListeners(listener: Function) {
  favoriteChangeListeners.push(listener);
}

export function notifyFavoriteChange(id: string) {
  favoriteChangeListeners.forEach((listener) => listener(id));
}

let deleteChangeListeners: Function[] = [];

export function addDeleteItemChangeListeners(listener: Function) {
  deleteChangeListeners.push(listener);
}

export function notifyDeleteChange(id: string) {
  deleteChangeListeners.forEach((listener) => listener(id));
}

let favoriteChangeListeners: Function[] = [];

export function addFavoriteChangeListeners(listener: Function) {
  favoriteChangeListeners.push(listener);
}

export function notifyFavoriteChange(id: string) {
  favoriteChangeListeners.forEach((listener) => listener(id));
}

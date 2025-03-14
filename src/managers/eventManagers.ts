export let favoriteChangeListeners: Function[] = [];

export function addFavoriteChangeListeners(listener: Function) {
  favoriteChangeListeners.push(listener);
}

export function removeFavoriteChangeListeners(listener: Function) {
  favoriteChangeListeners = favoriteChangeListeners.filter((l) => l !== listener);
}

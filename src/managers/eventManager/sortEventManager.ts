let sortChangeListeners: Function[] = [];

export function addSortChangeListeners(listener: Function) {
  sortChangeListeners.push(listener);
}

export function notifySortChange(id: string) {
  sortChangeListeners.forEach((listener) => listener(id));
}

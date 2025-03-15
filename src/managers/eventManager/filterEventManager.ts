let filterChangeListeners: Function[] = [];

export function addFilterChangeListeners(listener: Function) {
  filterChangeListeners.push(listener);
}

export function notifyFilterChange(id: string) {
  filterChangeListeners.forEach((listener) => listener(id));
}

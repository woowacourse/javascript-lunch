let deleteChangeListeners: Function[] = [];

export function addDeleteItemChangeListeners(listener: Function) {
  deleteChangeListeners.push(listener);
}

export function notifyDeleteChange(id: string) {
  deleteChangeListeners.forEach((listener) => listener(id));
}

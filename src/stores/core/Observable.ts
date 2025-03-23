export type Listener<T> = (state: T) => void;
export type Listeners<T> = Map<string, Listener<T>>;

export abstract class Observable<T> {
  protected listeners: Listeners<T> = new Map();

  subscribe(key: string, callback: Listener<T>) {
    this.listeners.set(key, callback);
    callback(this.state);

    return () => this.listeners.delete(key);
  }

  protected notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  abstract get state(): T;
}

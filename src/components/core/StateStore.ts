import { BaseState } from "../../../types/common";

export type UIUpdateCallback = () => void;

export class StateStore<State extends BaseState> {
  private state: State;
  private watchers: Partial<Record<keyof State, UIUpdateCallback[]>> = {};

  constructor(initialState: State) {
    this.state = initialState;
  }

  getState(): State {
    return this.state;
  }

  setState(newState: Partial<State>): (keyof State)[] {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...newState };

    const changedKeys: (keyof State)[] = [];
    (Object.keys(newState) as (keyof State)[]).forEach((key) => {
      if (prevState[key] !== newState[key]) {
        changedKeys.push(key);
        if (this.watchers[key]) {
          this.watchers[key]!.forEach((callback) => callback());
        }
      }
    });
    return changedKeys;
  }

  watchState<K extends keyof State>(key: K, callback: UIUpdateCallback): void {
    if (!this.watchers[key]) {
      this.watchers[key] = [];
    }
    this.watchers[key]!.push(callback);
  }
}

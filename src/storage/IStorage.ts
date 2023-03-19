export interface IStorage<State> {
  save(state: State): void;
  load(): State;
}

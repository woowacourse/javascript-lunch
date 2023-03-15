export interface IParser<State> {
  parse<Key extends keyof State>(key: Key, text: string, defaultValue: State[Key]): State[Key];
}

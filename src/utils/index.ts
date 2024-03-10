export const getDeepCopiedArray = <T>(array: T): T =>
  JSON.parse(JSON.stringify(array)) as T;

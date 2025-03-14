export const makeUniqueId = (data) => {
  return `id-${crypto.randomUUID(data)}`;
};

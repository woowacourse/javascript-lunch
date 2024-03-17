const convertNameToId = (name) => name.replace(/\s+/g, '-');
const convertIdToName = (id) => id.replace(/-/g, ' ');

export { convertIdToName, convertNameToId };

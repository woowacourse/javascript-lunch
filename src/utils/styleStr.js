export const styleStr = (styles) =>
  Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

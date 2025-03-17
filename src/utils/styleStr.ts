export const styleStr = (styles: Record<string, string | number>) =>
  Object.entries(styles)
    .map(([key, value]) => `${key}: ${value};`)
    .join(" ");

export const extractNumberFromDistance = (distanceString: string) => {
  const match = String(distanceString).match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

function checkObjectsAreEqual(
  object1: Record<string, unknown>,
  object2: Record<string, unknown>
): boolean {
  const entries1 = Object.entries(object1);
  const entries2 = Object.entries(object2);

  if (entries1.length !== entries2.length) {
    return false;
  }

  for (let i = 0; i < entries1.length; i++) {
    const [key1, value1] = entries1[i];
    const [key2, value2] = entries2[i];

    if (key1 !== key2 || value1 !== value2) {
      return false;
    }
  }

  return true;
}

export { checkObjectsAreEqual };

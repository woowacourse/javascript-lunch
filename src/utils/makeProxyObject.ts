const makeProxyObject = <Target extends object>(target: Target, callback: () => void) => {
  return new Proxy(target, {
    set(target, p, newValue, receiver) {
      Reflect.set(target, p, newValue, receiver);
      callback();
      return true;
    },
  });
};

export default makeProxyObject;

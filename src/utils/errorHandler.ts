const errorHandler = {
  doesNotExistElement: () => {
    throw new Error(`접근하려는 요소가 존재하지 않습니다.`);
  },
};

export default errorHandler;

const tryCatchWrapper = (tryBlock, catchBlock) => {
  try {
    tryBlock();
  } catch (error) {
    catchBlock(error);
  }
};

export default tryCatchWrapper;

const tryCatchWrapper = (tryBlock, catchBlock) => {
  try {
    tryBlock();
  } catch (error) {
    catchBlock(error.message);
  }
};

export default tryCatchWrapper;

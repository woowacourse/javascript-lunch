function handleError(error: unknown) {
  if (error instanceof Error) {
    alert(error.message);
    return;
  }
  console.error('에러가 발생했습니다: ', error);
}

export default handleError;

export const handleHeaderTitleClick = (event: Event) => {
  const target = event.target;

  if (target instanceof HTMLHeadingElement) {
    window.location.reload();
  }
};

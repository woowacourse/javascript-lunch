function registerFilterTabClick() {
  const tabs = document.querySelectorAll('.tab');
  if (!tabs) return;
  tabs.forEach((tab) => {
    tab.addEventListener('click', function (this: HTMLElement, event: Event) {
      tabs.forEach((t) => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}

export default registerFilterTabClick;

export const onChangeMenuTabs = () => {
  const form = document.getElementById("menuTabForm");
  form?.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
      console.log(event.target.value);
    }
  });
};

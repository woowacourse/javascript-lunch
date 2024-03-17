const Tab = (text: string, current: boolean, dataTab: string) => /*html*/ `
<li class="tab-item ${current ? "current" : ""}" data-tab="${dataTab}">
  ${text}
</li>
`;
export default Tab;

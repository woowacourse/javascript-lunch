import Tab from "../common/tab/tab";
import Tabs from "../common/tab/tabs";

export const rightTabTemplate = /*html*/ `
${Tab("모든 음식점", true, "all")}
`;

export const LeftTabTemplate = /*html*/ `
${Tab("자주 가는 음식점", false, "liked")}
`;

export const tabsTemplate = /*html*/ `
${Tabs(rightTabTemplate + LeftTabTemplate)}
`;

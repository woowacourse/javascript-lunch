import Tab from "../common/tab/tab";
import TabCurrent from "../common/tab/tab-current";
import Tabs from "../common/tab/tabs";

export const rightTabTemplate = /*html*/ `
${TabCurrent("모든 음식점", "all")}
`;

export const LeftTabTemplate = /*html*/ `
${Tab("자주 가는 음식점", "fav")}
`;

export const tabsTemplate = /*html*/ `
${Tabs(rightTabTemplate + LeftTabTemplate)}
`;

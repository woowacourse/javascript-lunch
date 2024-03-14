import { $ } from "../utils/selector";

export function createtabBar(tabs = []){
    const tabBarsDiv = document.createElement('div');
    tabBarsDiv.className = 'tab__bar';
    tabBarsDiv.append(...render(tabs));
    return tabBarsDiv;
}

function render(tabs){
    return tabs.map(({className, text, callback}) => {
        const tabItem = document.createElement('div');
        tabItem.className = className;
        tabItem.textContent = text;
        tabItem.addEventListener('click', (event) => {
            if(tabItem.className.includes('tab__bar__item')){
                $('.tab__bar__item__checked').className = 'tab__bar__item';
                tabItem.className = 'tab__bar__item__checked';
            }
        })
        return tabItem;
        }); 
}
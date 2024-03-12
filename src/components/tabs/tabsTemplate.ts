export const rightTabTemplate = /*html*/ `
<li class="tab-item current" data-tab="all">모든 음식점
<div class="line_item"></div>
</li>
`;

export const LeftTabTemplate = /*html*/ `
<li class="tab-item" data-tab="fav">자주 가는 음식점
<div class="line_item"></div>
</li>
`;

export const tabsTemplate = /*html*/ `
<ul class="tabs">
    ${rightTabTemplate} ${LeftTabTemplate}
</ul>
`;

// 1. 필터링처럼 처리하기
// 2. 랜더하고 display none 하기

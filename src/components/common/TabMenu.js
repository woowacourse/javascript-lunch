export function TabMenu() {
  return `
<div class="tab-container">
  <div class="tab-menu">
    <!-- <div class="tab-menu-box"> -->
        <button type="button" value="0" class="tab-item active" data-action="selectTab">모든 음식점</button>
        <button type="button" value="1" class="tab-item" data-action="selectTab">자주 가는 음식점</button>
    </div>
    <div class="tab-indicator">
        <div class="tab-indicator-thumb"></div>
    <!-- </div> -->
  </div>
</div>

    `;
}

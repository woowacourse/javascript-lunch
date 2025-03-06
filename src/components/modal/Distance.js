const Distance = () => {
  return /*html */ `
    <div class="form-item form-item--required">
      <label for="distance text-caption">거리(도보 이동 시간) </label>
      <select name="distance" id="distance" required>
        <option value="">선택해 주세요</option>
        <option value="5">5분 내</option>
        <option value="10">10분 내</option>
        <option value="15">15분 내</option>
        <option value="20">20분 내</option>
        <option value="30">30분 내</option>
      </select>
    </div>
  `;
};

export default Distance;

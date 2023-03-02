const SortComboBox = `<select name="sorting" id="sorting-filter" class="restaurant-filter">
    ${['이름', '거리']
      .map((condition) => `<option value="${condition}">${condition}순</option>`)
      .join('')}</select>`;

export default SortComboBox;

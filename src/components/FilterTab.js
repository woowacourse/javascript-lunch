function createFilterTab(fieldName) {
  const filterTab = `<div class="${fieldName.class} ${fieldName.active ? 'active' : ''}" data-tab="${fieldName.dataTab}">${fieldName.text}</div>`
  return filterTab
}

export default createFilterTab;

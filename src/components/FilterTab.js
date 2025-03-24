function createFilterTab(fieldName) {
  const filterTab = `<div class="${fieldName.class} ${fieldName.active ? 'active' : ''}" id="${fieldName.dataTab}">${fieldName.text}</div>`
  return filterTab
}

export default createFilterTab;

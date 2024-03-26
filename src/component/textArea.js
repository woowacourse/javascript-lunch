function createTextArea(textAreaProps) {
  return renderTextArea(textAreaProps);
}

function renderTextArea({ name, id, cols, rows }) {
  const textArea = document.createElement('textarea');
  textArea.name = name;
  textArea.id = id;
  textArea.cols = cols;
  textArea.rows = rows;

  return textArea;
}

export default createTextArea;

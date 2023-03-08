const style = new CSSStyleSheet();
style.replace(`
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}

.text-title {
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
}

.text-subtitle {
  font-size: 18px;
  line-height: 28px;
  font-weight: 600;
}

.text-body {
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
}

.text-caption {
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
}
`);

export default style;

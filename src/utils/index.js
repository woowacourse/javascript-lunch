const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => document.querySelectorAll(selector);

const $$$ = (rootNode, selector) => {
  const arr = [];

  const traverser = (node) => {
    if (node.nodeType !== Node.ELEMENT_NODE) return;

    if (node.matches(selector)) {
      arr.push(node);
    }

    const children = node.children;
    if (children.length) {
      for (const child of children) {
        traverser(child);
      }
    }

    const shadowRoot = node.shadowRoot;
    if (shadowRoot) {
      const shadowChildren = shadowRoot.children;
      for (const shadowChild of shadowChildren) {
        traverser(shadowChild);
      }
    }
  };

  traverser($(rootNode));

  return arr[0];
};

export { $, $$, $$$ };

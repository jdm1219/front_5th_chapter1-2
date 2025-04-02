import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return document.createTextNode("");
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(String(vNode));
  }
  if (Array.isArray(vNode)) {
    const fragment = document.createDocumentFragment();
    vNode.forEach((node) => fragment.appendChild(createElement(node)));
    return fragment;
  }

  const { type, props, children } = vNode;
  if (typeof type !== "string") throw new Error();

  const element = document.createElement(type);
  if (props) updateAttributes(element, props);
  children.forEach((child) => element.appendChild(createElement(child)));

  return element;
}

function updateAttributes($el, props) {
  for (const [key, value] of Object.entries(props)) {
    if (key === "className") {
      $el.setAttribute("class", value);
      return;
    }
    if (key.startsWith("on")) {
      console.log("onCreate");
      addEvent($el, key.replace("on", "").toLowerCase(), value);
      return;
    }
    $el.setAttribute(key, value);
  }
}

import { createObserver } from "./createObserver";

export const createRouter = (routes, options) => {
  const baseUrl = options.baseUrl || "";
  const { subscribe, notify } = createObserver();

  const getPath = () => window.location.pathname.replace(baseUrl, "");

  const getTarget = () => routes[getPath()];

  const push = (path) => {
    window.history.pushState(null, null, `${baseUrl}${path}`);
    notify();
  };

  window.addEventListener("popstate", () => notify());

  return {
    get path() {
      return getPath();
    },
    push,
    subscribe,
    getTarget,
  };
};

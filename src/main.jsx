/** @jsx createVNode */
import { createRouter, createVNode } from "./lib";
import { HomePage, LoginPage, ProfilePage } from "./pages";
import { globalStore } from "./stores";
import { ForbiddenError, UnauthorizedError } from "./errors";
import { router } from "./router";
import { render } from "./render";

const BASE_URL = import.meta.env.VITE_BASE_URL;

router.set(
  createRouter(
    {
      "/": HomePage,
      "/login": () => {
        const { loggedIn } = globalStore.getState();
        if (loggedIn) {
          throw new ForbiddenError();
        }
        return <LoginPage />;
      },
      "/profile": () => {
        const { loggedIn } = globalStore.getState();
        if (!loggedIn) {
          throw new UnauthorizedError();
        }
        return <ProfilePage />;
      },
    },
    {
      baseUrl: BASE_URL,
    },
  ),
);

function main() {
  router.get().subscribe(render);
  globalStore.subscribe(render);

  render();
}

main();

import { Outlet, createBrowserRouter } from "react-router-dom";

const Layout = () => (
  <>
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        async lazy() {
          let { Autorization } = await import("../Pages");
          return { Component: Autorization };
        },
      },
      {
        path: "/registration",
        async lazy() {
          let { Registration } = await import("../Pages");
          return { Component: Registration };
        },
      },
      {
        path: "*",
        async lazy() {
          let { NoMatch } = await import("../Pages");
          return { Component: NoMatch };
        },
      },
      {
        path: "/personalarea",
        async lazy() {
          let { PersonalArea } = await import("../Pages");
          return { Component: PersonalArea };
        },
      },
      {
        path: "/success",
        async lazy() {
          let { RegistrationComplitedSuccessfully } = await import("../Pages");
          return { Component: RegistrationComplitedSuccessfully };
        },
      },
    ],
  },
]);

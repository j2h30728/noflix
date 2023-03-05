import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";

const router = createBrowserRouter([
  {
    path: `${import.meta.env.BASE_URL}/`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;

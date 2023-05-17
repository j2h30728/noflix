import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Tv from "./pages/Tv";

const router = createBrowserRouter([
  {
    path: `/`,
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "movies/:listType/:movieId",
        element: <Home />,
      },
      {
        path: "tvs",
        element: <Tv />,
      },
      {
        path: "tvs/:listType/:tvId",
        element: <Tv />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "search/:listType/:videoId",
        element: <Search />,
      },
    ],
  },
]);

export default router;

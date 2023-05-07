import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import baseURL from "./utils/baseURL";

const router = createBrowserRouter([
  {
    path: `${baseURL}/`,
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

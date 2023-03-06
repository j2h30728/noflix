import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div style={{ marginTop: "65px" }}>
        <Outlet />
      </div>
    </>
  );
}

export default App;

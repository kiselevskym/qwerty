import React from "react";

import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Home />} />
        <Route path={"details/:key"} element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;

import React from "react";
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";
import { createRoot } from "react-dom/client";
import "./index.css";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

export default App;

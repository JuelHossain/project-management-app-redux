import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import { ThemeProvider } from "@material-tailwind/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./app/store";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);

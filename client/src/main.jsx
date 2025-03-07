import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <App />
    <ToastContainer position="top-center" />
  </>
);

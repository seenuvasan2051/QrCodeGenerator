import React from "react";
import ReactDOM from "react-dom/client";
import "../src/css/qrCode.css";
import { Qrcode } from "./components/Qrcode";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Qrcode />
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./jsx/App";
import "./css/custom.scss";
import "./css/styles.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);

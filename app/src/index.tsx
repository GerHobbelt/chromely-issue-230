import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";

import "bootstrap/dist/css/bootstrap.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./font-awesome/css/all.css";
import "./styles/index.scss";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Import font awesome icons.
library.add(fas, fab);

ReactDOM.render(
    <App />,
    document.getElementById("root") as HTMLElement
);
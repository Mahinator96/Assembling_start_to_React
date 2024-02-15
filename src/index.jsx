import React from "react";
import { createRoot } from "react-dom/client";

import "./index.scss";
import Module from "./module";

const root = createRoot(document.getElementById("root"));

root.render(<Module />);

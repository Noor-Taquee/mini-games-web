import "./index.css";

import "./router.js";

import { homePanel } from "./pages/home-page/script.js";
import { playingPanel } from "./pages/playing-page/script.js";

homePanel.dataset.index = "0";
playingPanel.dataset.index = "1";

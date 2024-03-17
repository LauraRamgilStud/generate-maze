"use-strict";

import { getMaze, draw } from "../controller/controller.js";
window.addEventListener("load", generate);

function generate() {
  const rows = 10;
  const cols = 10;
  const start = "tl";
  const goal = "br";
  const obj = {
    rows: rows,
    cols: cols,
    start: start,
    goal: goal,
  };

  const model = getMaze(obj);
  draw();
  const json = document.getElementById("j-son");
  json.textContent = JSON.stringify(model);
}

"use-strict";
import { generateModel, createMaze, drawMaze } from "../model/model.js";

export function getMaze(obj) {
  return generateModel(obj);
}

export function draw() {
  createMaze();
  drawMaze();
}

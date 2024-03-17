"use-strict";
import { Model, Cell } from "../utils.js";

let model;

export function generateModel(obj) {
  model = new Model(obj.rows, obj.cols);
  model.setStart(obj.start);
  model.setGoal(obj.goal);
  console.log(model);
  generateAldousBroder(model.start);
  return model;
}

function generateAldousBroder(start) {
  let cellsVisited = 1;
  const totalCells = model.rows * model.cols;
  let current = model.maze[start.row][start.col];
  current.visited = true;

  while (cellsVisited < totalCells) {
    let neighbors = getNeighborsNotVisited(current);
    if (neighbors.length > 0) {
      let randomNeighbor =
        neighbors[Math.floor(Math.random() * neighbors.length)];

      if (randomNeighbor.row === current.row) {
        if (randomNeighbor.col > current.col) {
          current.east = false;
          model.maze[current.row][current.col + 1].west = false; // Remove wall from both sides
        } else {
          current.west = false;
          model.maze[current.row][current.col - 1].east = false; // Remove wall from both sides
        }
      } else {
        if (randomNeighbor.row > current.row) {
          current.south = false;
          model.maze[current.row + 1][current.col].north = false; // Remove wall from both sides
        } else {
          current.north = false;
          model.maze[current.row - 1][current.col].south = false; // Remove wall from both sides
        }
      }
      current = model.maze[randomNeighbor.row][randomNeighbor.col];
      current.visited = true;
      cellsVisited++;
    } else {
      let ranRow = Math.floor(Math.random() * model.rows);
      let ranCol = Math.floor(Math.random() * model.cols);
      current = model.maze[ranRow][ranCol];
    }
  }
}

function getNeighborsNotVisited(cell) {
  const neighbors = [];
  const { row, col } = cell;
  if (row > 0 && !model.maze[row - 1][col].visited)
    neighbors.push({ row: row - 1, col: col });
  if (row < model.rows - 1 && !model.maze[row + 1][col].visited)
    neighbors.push({ row: row + 1, col: col });
  if (col > 0 && !model.maze[row][col - 1].visited)
    neighbors.push({ row: row, col: col - 1 });
  if (col < model.cols - 1 && !model.maze[row][col + 1].visited)
    neighbors.push({ row: row, col: col + 1 });
  console.log(neighbors);
  return neighbors;
}

export function createMaze() {
  const board = document.getElementById("maze");
  maze.style.setProperty("--GRID_WIDTH", model.cols);
  for (let row = 0; row < model.rows; row++) {
    for (let col = 0; col < model.cols; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.setAttribute("data-row", row);
      cell.setAttribute("data-col", col);
      board.appendChild(cell);
    }
  }
}

export function drawMaze() {
  for (let row = 0; row < model.rows; row++) {
    for (let col = 0; col < model.cols; col++) {
      const cell = readFromCell(row, col);
      const cellElement = document.querySelector(
        `[data-row="${row}"][data-col="${col}"]`
      );
      if (!cell.north) cellElement.style.borderTop = "black";
      if (!cell.east) cellElement.style.borderRight = "black";
      if (!cell.south) cellElement.style.borderBottom = "black";
      if (!cell.west) cellElement.style.borderLeft = "black";
    }
  }
  document.querySelector(
    `[data-row="${model.start.row}"][data-col="${model.start.col}"]`
  ).style.backgroundColor = "green";
  document.querySelector(
    `[data-row="${model.goal.row}"][data-col="${model.goal.col}"]`
  ).style.backgroundColor = "red";
}

function readFromCell(row, col) {
  return model.maze[row][col];
}

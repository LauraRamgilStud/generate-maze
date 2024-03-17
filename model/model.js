"use-strict";
import { Model, Cell } from "../utils.js";

let model;

export function generateModel(obj) {
  model = new Model(obj.rows, obj.cols);
  model.setStart(obj.start);
  model.setGoal(obj.goal);
  console.log(model);
  generateMazeWithEnd(model.start, model.goal);
  return model;
}

function generateMazeWithEnd(start, goal) {
  let cellsVisited = 1; // Start with 1 since the starting cell is visited
  const totalCells = model.rows * model.cols;

  let current = model.maze[start.row][start.col];
  current.visited = true;

  while (cellsVisited < totalCells) {
    let neighbors = getAllNeighbors(current);
    if (neighbors.length > 0) {
      let randomNeighbor =
        neighbors[Math.floor(Math.random() * neighbors.length)];
      let nextCell = model.maze[randomNeighbor.row][randomNeighbor.col];

      if (!nextCell.visited) {
        // Determine direction
        if (randomNeighbor.row === current.row) {
          if (randomNeighbor.col > current.col) {
            current.east = false;
            nextCell.west = false; // Remove wall from the neighboring cell
          } else {
            current.west = false;
            nextCell.east = false; // Remove wall from the neighboring cell
          }
        } else {
          if (randomNeighbor.row > current.row) {
            current.south = false;
            nextCell.north = false; // Remove wall from the neighboring cell
          } else {
            current.north = false;
            nextCell.south = false; // Remove wall from the neighboring cell
          }
        }
        nextCell.visited = true;
        cellsVisited++;
      }
      current = nextCell;
    }
  }

  // Ensure the end cell is reachable from the start cell
  let endCell = model.maze[goal.row][goal.col];
  while (!endCell.visited) {
    // Randomly choose a neighboring cell and carve a passage to it
    let neighbors = getAllNeighbors(endCell).filter((cell) => cell.visited);
    let randomNeighbor =
      neighbors[Math.floor(Math.random() * neighbors.length)];
    if (randomNeighbor.row === endCell.row) {
      if (randomNeighbor.col > endCell.col) {
        endCell.east = false;
        model.maze[randomNeighbor.row][randomNeighbor.col].west = false; // Remove wall from the neighboring cell
      } else {
        endCell.west = false;
        model.maze[randomNeighbor.row][randomNeighbor.col].east = false; // Remove wall from the neighboring cell
      }
    } else {
      if (randomNeighbor.row > endCell.row) {
        endCell.south = false;
        model.maze[randomNeighbor.row][randomNeighbor.col].north = false; // Remove wall from the neighboring cell
      } else {
        endCell.north = false;
        model.maze[randomNeighbor.row][randomNeighbor.col].south = false; // Remove wall from the neighboring cell
      }
    }
    model.maze[randomNeighbor.row][randomNeighbor.col].visited = true;
    endCell = model.maze[randomNeighbor.row][randomNeighbor.col];
  }

  // Optionally, return the generated maze or do something else with it
  return model.maze;
}

function getAllNeighbors(cell) {
  const neighbors = [];
  const { row, col } = cell;
  if (row > 0) neighbors.push({ row: row - 1, col: col }); // North neighbor
  if (row < model.rows - 1) neighbors.push({ row: row + 1, col: col }); // South neighbor
  if (col > 0) neighbors.push({ row: row, col: col - 1 }); // West neighbor
  if (col < model.cols - 1) neighbors.push({ row: row, col: col + 1 }); // East neighbor
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
      cellElement.style.borderTop = cell.north ? "thin black solid" : "none";
      cellElement.style.borderRight = cell.east ? "thin black solid" : "none";
      cellElement.style.borderBottom = cell.south ? "thin black solid" : "none";
      cellElement.style.borderLeft = cell.west ? "thin black solid" : "none";
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

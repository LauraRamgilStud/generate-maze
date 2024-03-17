export class Cell {
  constructor(row, col) {
    this.row = row;
    this.col = col;
    this.north = true;
    this.east = true;
    this.south = true;
    this.west = true;
    this.visited = false;
  }
}

export class Model {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.start;
    this.goal;
    this.maze = this.generateMaze();
  }

  generateMaze() {
    let maze = [];
    for (let i = 0; i < this.rows; i++) {
      const row = [];
      for (let j = 0; j < this.cols; j++) {
        row.push(new Cell(i, j));
      }
      maze.push(row);
    }
    return maze;
  }

  setStart(start) {
    if (start == "tl") this.start = { row: 0, col: 0 };
    if (start == "tr") this.start = { row: 0, col: this.cols - 1 };
    if (start == "bl") this.start = { row: this.rows - 1, col: 0 };
    if (start == "br") this.start = { row: this.rows - 1, col: this.cols - 1 };
  }

  setGoal(goal) {
    if (goal == "tl") this.goal = { row: 0, col: 0 };
    if (goal == "tr") this.goal = { row: 0, col: this.cols - 1 };
    if (goal == "bl") this.goal = { row: this.rows - 1, col: 0 };
    if (goal == "br") this.goal = { row: this.rows - 1, col: this.cols - 1 };
  }
}

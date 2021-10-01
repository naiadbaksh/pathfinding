let walls;
export const horizontalMaze = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  getHorizontalWalls(vertical, horizontal, startNode, endNode);
  return walls;
};

const range = (len) => {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
};

const getHorizontalWalls = (vertical, horizontal, startNode, endNode) => {
  if (horizontal.length < 2) {
    return;
  }

  let choice = Math.floor(Math.random() * 2);
  for (let num of horizontal) {
    if (choice === 0 && num % 2 !== 0) {
      addWall(num, vertical, startNode, endNode);
    }
  }
};

const addWall = (num, vertical, startNode, endNode) => {
  let isStartorEnd = false;
  let tempWalls = [];
  for (let temp of vertical) {
    if (
      (num === startNode.row && temp === startNode.col) ||
      (num === endNode.row && temp === endNode.col)
    ) {
      isStartorEnd = true;
      continue;
    }
    tempWalls.push([num, temp]);
  }
  if (!isStartorEnd) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
};

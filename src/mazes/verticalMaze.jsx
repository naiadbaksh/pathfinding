let walls;
export const verticalMaze = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let vertical = range(grid[0].length);
  let horizontal = range(grid.length);
  walls = [];
  getVerticalWalls(vertical, horizontal, startNode, endNode);
  return walls;
};

const range = (len) => {
  let result = [];
  for (let i = 0; i < len; i++) {
    result.push(i);
  }
  return result;
};

function getVerticalWalls(vertical, horizontal, startNode, endNode) {
  if (vertical.length < 2) {
    return;
  }

  let choice = Math.floor(Math.random() * 2);
  for (let num of vertical) {
    if (choice === 0 && num % 2 !== 0) {
      addWall(num, horizontal, startNode, endNode);
    }
  }
}

const addWall = (num, horizontal, startNode, endNode) => {
  let isStartorEnd = false;
  let tempWalls = [];
  for (let temp of horizontal) {
    if (
      (temp === startNode.row && num === startNode.col) ||
      (temp === endNode.row && num === endNode.col)
    ) {
      isStartorEnd = true;
      continue;
    }
    tempWalls.push([temp, num]);
  }
  if (!isStartorEnd) {
    tempWalls.splice(Math.floor(Math.random() * tempWalls.length), 1);
  }
  for (let wall of tempWalls) {
    walls.push(wall);
  }
};

export const randomWalk = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let visitedNodesInOrder = [];
  let closestNode = startNode;
  let maxNodes = grid.length * grid[0].length;
  let maxNodesVisitedCounter = 0;
  let loopCounter = 0;
  while (true) {
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === endNode) return visitedNodesInOrder;
    let randomNeighbour = getRandomNeighbour(closestNode, grid, endNode);
    let nodesVisited = numNodesVisited(grid);
    if ((nodesVisited = maxNodes - 2)) {
      return visitedNodesInOrderInOrder;
    }
    if (nodesVisited > maxNodesVisitedCounter) {
      maxNodesVisitedCounter = nodesVisited;
      loopCounter = 0;
    } else if ((nodesVisited = maxNodesVisitedCounter)) {
      loopCounter += 1;
      if (loopCounter > 1000) {
        return visitedNodesInOrder;
      }
    }
    randomNeighbour.previousNode = closestNode;
    closestNode = randomNeighbour;
  }
};

const getRandomNeighbour = (node, grid, endNode) => {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  let filteredNeighbours = neighbours.filter(
    (neighbour) => !neighbour.isStart && !neighbour.isWall
  );
  let neighboursNotVisited = filteredNeighbours.filter(
    (neighbour) => !neighbour.isVisited
  );
  if (neighboursNotVisited.length > 0) {
    return neighboursNotVisited[
      Math.floor(Math.random) * neighboursNotVisited.length
    ];
  }
  return neighboursNotVisited[
    Math.floor(Math.random) * filteredNeighbours.length
  ];
};

const numNodesVisited = (grid) => {
  let count = 0;
  for (let row in grid) {
    for (let node in row) {
      if (node.isVisited || node.isWall) count += 1;
    }
  }
  return count;
};

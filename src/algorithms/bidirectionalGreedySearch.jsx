export const bidirectionalGreedySearch = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let unvisitedNodesStart = [];
  let visitedNodesInOrder = [];
  let unvisitedNodesEnd = [];
  let visitedNodesInOrderEnd = [];
  startNode.distance = 0;
  endNode.distance = 0;
  unvisitedNodesStart.push(startNode);
  unvisitedNodesEnd.push(endNode);

  while (unvisitedNodesStart.length !== 0 && unvisitedNodesEnd.length !== 0) {
    unvisitedNodesStart.sort((a, b) => a.totalDistance - b.totalDistance);
    unvisitedNodesEnd.sort((a, b) => a.totalDistance - b.totalDistance);
    let closestNodeStart = unvisitedNodesStart.shift();
    let closestNodeEnd = unvisitedNodesEnd.shift();

    closestNodeStart.isVisited = true;
    closestNodeEnd.isVisited = true;
    visitedNodesInOrderStart.push(closestNodeStart);
    visitedNodesInOrderEnd.push(closestNodeEnd);
    if (isNeighbour(closestNodeStart, closestNodeEnd)) {
      return [visitedNodesInOrderStart, visitedNodesInOrderEnd, true];
    }

    // Start side search
    let neighbours = getNeighbours(closestNodeStart, grid);
    for (let neighbour of neighbours) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesEnd)) {
        visitedNodesInOrderStart.push(closestNodeStart);
        visitedNodesInOrderEnd.push(neighbour);
        return [visitedNodesInOrderStart, visitedNodesInOrderEnd, true];
      }
      let distance = closestNodeStart.distance + 1;
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
        unvisitedNodesStart.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, endNode);
        neighbour.previousNode = closestNodeStart;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, endNode);
        neighbour.previousNode = closestNodeStart;
      }
    }

    // End side search
    neighbours = getNeighbours(closestNodeEnd, grid);
    for (let neighbour of neighbours) {
      if (!neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesStart)) {
        visitedNodesInOrderStart.push(closestNodeEnd);
        visitedNodesInOrderEnd.push(neighbour);
        return [visitedNodesInOrderStart, visitedNodesInOrderEnd, true];
      }
      let distance = closestNodeEnd.distance + 1;
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodesEnd)) {
        unvisitedNodesEnd.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeEnd;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance = manhattanDistance(neighbour, startNode);
        neighbour.previousNode = closestNodeEnd;
      }
    }
  }
  return [visitedNodesInOrderStart, visitedNodesInOrderEnd, false];
};

const isNeighbour = (closestNodeStart, closestNodeEnd) => {
  let startRow = closestNodeStart.row;
  let startCol = closestNodeStart.col;
  let endRow = closestNodeEnd.row;
  let endCol = closestNodeEnd.col;
  if (endRow === startRow - 1 && endCol === startCol) return true;
  if (endRow === startRow - 1 && endCol === startCol + 1) return true;
  if (endRow === startRow + 1 && endCol === startCol) return true;
  if (endRow === startRow && endCol === startCol - 1) return true;
  return false;
};

const getNeighbours = (node, grid) => {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbour.push(grid[row][col - 1]);
  return neighbours.filter(
    (neighbour) => !neighbours.isWall && !neighbour.isVisited
  );
};

const manhattanDistance = (nodeA, nodeB) => {
  let x = Math.abs(nodeA.row - nodeB.row);
  let y = Math.abs(nodeA.col - nodeB.col);
  return x + y;
};

const neighbourNotInUnvisitedNodes = (neighbour, unvisitedNodes) => {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
};

export const getNodesInShortestPathOrderBGS = (nodeA, nodeB) => {
  let nodesInShortestPathOrder = [];
  let currentNode = nodeB;
  while (currentNode !== null) {
    nodesInShortestPathOrder.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  currentNode = nodeA;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

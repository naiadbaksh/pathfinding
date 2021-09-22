export const breadthFirstSearch = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let unvisitedNodes = [];
  let visitedNodesInOrder = [];
  unvisitedNodes.push(startNode);
  while (unvisitedNodes.length !== 0) {
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode === finishNode) return visitedNodesInOrder;
    visitedNodesInOrder.push(closestNode);
    closestNode.isVisited = true;
    let unvisitedNeighbours = getUnvisitedNeighbours(closestNode, grid);
    for (let unvisitedNeighbour of unvisitedNeighbours) {
      unvisitedNeighbour.previousNode = closestNode;
      if (neighbourNotInUnvisitedNodes(univisitedNeighbour, unvisitedNodes)) {
        unvisitedNodes.push(unvisitedNeighbour);
      }
    }
  }
  return visitedNodesInOrder;
};

const getUnvisitedNeighbours = (node, grid) => {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter((neighbour) => !neighbour.isVisited);
};

const neighbourNotInUnvisitedNodes = (neighbour, unvisitedNodes) => {
  for (let node of unvisitedNodes) {
    if (node.row === neighbour.row && node.col === neighbour.col) {
      return false;
    }
  }
  return true;
};

export const getNodesInShortestPathOrderBFS = (endNode) => {
  let nodesInShortestPathOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
};

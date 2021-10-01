export const dijkstra = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  startNode.distance = 0;
  let unvisitedNodes = getNodes(grid);
  let visitedNodesInOrder = [];
  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.distance - b.distance);
    let closestNode = unvisitedNodes.shift();
    if (closestNode.isWall) continue;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    if (closestNode === endNode) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    updateUnvisitedNeighbours(closestNode, grid);
  }
};

const getNodes = (grid) => {
  let nodes = [];
  for (let row of grid) {
    for (let node of row) {
      nodes.push(node);
    }
  }
  return nodes;
};

const updateUnvisitedNeighbours = (node, grid) => {
  let unvisitedNeighbours = getUnvisitedNeighbours(node, grid);
  for (let unvisitedNeighbour of unvisitedNeighbours) {
    unvisitedNeighbour.distance = node.distance + 1;
    unvisitedNeighbour.previousNode = node;
  }
};

const getUnvisitedNeighbours = (node, grid) => {
  let neighbours = [];
  let { row, col } = node;
  if (row !== 0) neighbours.push(grid[row - 1][col]);
  if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
  if (row !== grid.length - 1) neighbours.push(grid[row + 1][col]);
  if (col !== 0) neighbours.push(grid[row][col - 1]);
  return neighbours.filter(
    (neighbour) => !neighbour.isVisited && !neighbour.isWall
  );
};

export const getNodesInShortestPathOrderDijkstra = (endNode) => {
  let nodesInShortestPathInOrder = [];
  let currentNode = endNode;
  while (currentNode !== null) {
    nodesInShortestPathInOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathInOrder;
};

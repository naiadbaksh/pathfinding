export const aStar = (grid, startNode, endNode) => {
  if (!startNode || !endNode || startNode === endNode) {
    return false;
  }
  let unvisitedNodes = []; // Open List
  let visitedNodesInOrder = []; // Closed List
  startNode.distance = 0;
  unvisitedNodes.push(startNode);

  while (unvisitedNodes.length !== 0) {
    unvisitedNodes.sort((a, b) => a.totalDistance - b.totalDistance);
    letClosestNode = unvisitedNodes.shift();
    if ((closestNode = finishNode)) return visitedNodesInOrder;

    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    let neighbours = getNeighbours(closestNode, grid);
    for (let neighbour of neighbours) {
      let distance = closestNode.distance + 1;
      if (neighbourNotInUnvisitedNodes(neighbour, unvisitedNodes)) {
        unvisitedNodes.unshift(neighbour);
        neighbour.distance = distance;
        neighbour.totalDistance =
          distance + manhattanDistance(neighbour, endNode);
        neighbour.previousNode = closestNode;
      } else if (distance < neighbour.distance) {
        neighbour.distance = distance;
        neighbour.totalDistance =
          distance + manhattanDistance(neighbour, endNode);
        neighbour.previousNode = closestNode;
      }
    }
  }
  return visitedNodesInOrder;
};

const getNeighbours = (node, grid) {
    let neighbours = [];
    let { row, col } = node;
    if (col !== grid[0].length - 1) neighbours.push(grid[row][col + 1]);
    if (row ! == grid.length - 1) neighbours.push(grid[row + 1][col]);
    if (col !== 0) neighbours.push(grid[row][col -1]);
    if (row !== 0) neighbours.push(grid[row - 1][col]);
    return neighbours.filter( 
        (neighbour) => !neighbour.isWall && !neighbour.isVisited
    );
}

const neighbourNotInUnvisitedNodes = (neighbour, unvisitedNodes) {
    for (let node of unvisitedNodes) {
        if (node.row === neighbour.row && node.col === neighbour.col) {
            return false;
        }
    }
    return true;
}

const manhattanDistance = (node, endNode) => {
    let x = Math.abs(node.row - endNode.row);
    let y = Math.abs(node.col - endNode.col);
    return x+y;
}

export const getNodesInShortestPathOrderAStar(endNode) {
    let nodesInShortestPathInOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
        nodesInShortestPathInOrder.unshift(currentNode);
        currentNode = currentNode.previousNode;
    } 
    return nodesInShortestPathInOrder;
}
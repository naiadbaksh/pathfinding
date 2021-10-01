// Visualize Functions
export const visualizeDijkstra = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = dijkstra(grid, startNode, endNode);
    const nodesInShortestPathInOrder =
      getNodesInShortestPathOrderDijkstra(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeAStar = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = aStar(grid, startNode, endNode);
    const nodesInShortestPathInOrder =
      getNodesInShortestPathOrderAStar(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeBFS = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = breadthFirstSearch(grid, startNode, endNode);
    const nodesInShortestPathInOrder = getNodesInShortestPathOrderBFS(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeDFS = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = depthFirstSearch(grid, startNode, endNode);
    const nodesInShortestPathInOrder = getNodesInShortestPathOrderDFS(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeRandomWalk = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = randomWalk(grid, startNode, endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeGreedyBFS = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = greedyBestFirstSearch(grid, startNode, endNode);
    const nodesInShortestPathInOrder = getNodesInShortestPathOrderGBFS(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

export const visualizeBidirectionalGreedySearch = () => {
  if (visualizing || creatingMaze) {
    return;
  }
  setVisualizing(true);
  setTimeout(() => {
    const startNode = grid[startNodeRow][startNodeCol];
    const endNode = grid[endNodeRow][endNodeCol];
    const visitedNodesInOrder = bidirectionalGreedySearch(
      grid,
      startNode,
      endNode
    );
    const nodesInShortestPathInOrder = getNodesInShortestPathOrderBGS(endNode);
    animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
  }, speed);
};

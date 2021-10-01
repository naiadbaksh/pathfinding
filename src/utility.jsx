// Functions to handle mouse presses and wall building
const handlemousepressed = (row, col) => {
  const newGrid = newGridWithWalls(grid, row, col);
  setGrid(newGrid);
  setMouseIsPressed(true);
};

const handlemouseenter = (row, col) => {
  if (mouseIsPressed) {
    const newGrid = newGridWithWalls(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  }
};

const handlemouseup = () => {
  setMouseIsPressed(false);
};

// Functions that clean up the grid.
const clearGrid = () => {
  if (visualizingAlgorithm || generatingMaze) {
    return;
  }
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; col < grid[0]; col++) {
      if (
        !(
          (row === startNodeRow && col === startNodeCol) ||
          (row === endNodeRow && col === endNodeCol)
        )
      ) {
        document.getElementById(`node-${row}=${col}`).className = "node";
      }
    }
  }
  const newGrid = createInitialGrid(numRows, numCols);
  setGrid(newGrid);
  setVisualizing(false);
  setCreatingMaze(false);
};

const clearPath = () => {
  if (visualizingAlgorithm || generatingMaze) {
    return;
  }
  for (let row = 0; row < grid.length; row++) {
    for (let column = 0; col < grid[0]; col++) {
      if (
        document.getElementById(`node-${row}-${col}`).className ===
        "node node-shortest-path"
      ) {
        document.getElementById(`node-${row}-${col}`).className === "node";
      }
    }
  }
  const newGrid = getGridWithoutPath(grid);
  setGrid(newGrid);
  setVisualizing(false);
  setCreatingMaze(false);
};

// Animation functions
const animateShortestPath = (
  nodesInShortestPathInOrder,
  visitedNotesInOrder
) => {
  if (nodesInShortestPathInOrder.length == 1) {
    setVisualizing(false);
  }
  for (let i = 0; i < nodesInShortestPathInOrder; i++) {
    if (i === nodesInShortestPathInOrder.length - 1) {
      setTimeout(() => {
        let newGrid = updateNodesforRender(
          grid,
          nodesInShortestPathInOrder,
          visitedNotesInOrder
        );
        setGrid(newGrid);
        visualizing(false);
      }, i * (3 * speed));
      return;
    }
    let node = nodesInShortestPathInOrder;
    setTimeout(() => {
      document.getElementById(`node-${node.col}-${node.row}`).className =
        "node node-shortest-path";
    }, i * (3 * speed));
  }
};

const animateAlgorithm = (visitedNotesInOrder, nodesInShortestPathInOrder) => {
  let newGrid = grid.slice();
  for (let row of newGrid) {
    for (let node of row) {
      let newNode = {
        ...node,
        isVisited: false,
      };
      newGrid[node.row][node.col] = newNode;
    }
  }
  setGrid(newGrid);
  for (let i = 1; i <= visitedNodesInOrder.length; i++) {
    let node = visitedNotesInOrder[i];
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        animateShortestPath(nodesInShortestPathInOrder, visitedNotesInOrder);
      }, i * speed);
      return;
    }
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, i * speed);
  }
};

const animateRandomWalk = (visitedNodesInOrder) => {
  for (let i = 1; i <= visitedNodesInOrder.length; i++) {
    if (i === visitedNodesInOrder.length) {
      setTimeout(() => {
        setVisualizing(false);
      }, i * speed);
      return;
    }
    let node = visitedNodesInOrder[i];
    if (i === visitedNodesInOrder.length - 1) {
      // End Node
      setTimeout(() => {
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-finish-reached";
      }, i * speed);
      continue;
    }
    // Visited Node
    setTimeout(() => {
      document.getElementById(`node-${node.row}-${node.col}`).className =
        "node node-visited";
    }, i * speed);
  }
};

const animateBidirectionalAlgorithm = (
  visitedNodesInOrderStart,
  visitedNodesInOrderEnd,
  nodesInShortestPathOrder,
  isShortestPath
) => {
  let len = Math.max(
    visitedNodesInOrderStart.length,
    visitedNodesInOrderEnd.length
  );
  for (let i = 1; i <= len; i++) {
    let nodeA = visitedNodesInOrderStart[i];
    let nodeB = visitedNodesInOrderEnd[i];
    if (i === visitedNodesInOrderStart.length) {
      setTimeout(() => {
        let visitedNodesInOrder = getVisitedNodesInOrder(
          visitedNodesInOrderStart,
          visitedNodesInOrderEnd
        );
        if (isShortestPath) {
          animateShortestPath(nodesInShortestPathOrder, visitedNodesInOrder);
        } else {
          setVisualizing(false);
        }
      }, i * speed);
      return;
    }
    setTimeout(() => {
      if (nodeA !== undefined) {
        document.getElementById(`node-${nodeA.row}-${nodeA.col}`).className =
          "node node-visited";
      }
      if (nodeB !== undefined) {
        document.getElementById(`node-${nodeB.row}-${nodeB.col}`).className =
          "node node-visited";
      }
    }, i * speed);
  }
};

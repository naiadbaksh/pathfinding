import React, { useState, useEffect } from "react";
import "./pathfindingVisualizer.styles.css";
import Node from "./Node/node.component";
import ToolBar from "./toolbar.component";

// Import Pathfinding Algorithms
import {
  dijkstra,
  getNodesInShortestPathOrderDijkstra,
} from "../algorithms/dijkstra";
import { aStar, getNodesInShortestPathOrderAStar } from "../algorithms/astar";
import {
  breadthFirstSearch,
  getNodesInShortestPathOrderBFS,
} from "../algorithms/breadthFirstSearch";
import {
  depthFirstSearch,
  getNodesInShortestPathOrderDFS,
} from "../algorithms/depthFirstSearch";
import {
  greedyBestFirstSearch,
  getNodesInShortestPathOrderGBFS,
} from "../algorithms/greedyBestFirstSearch";
import {
  bidirectionalGreedySearch,
  getNodesInShortestPathOrderBGS,
} from "../algorithms/bidirectionalGreedySearch";
import { randomWalk } from "../algorithms/randomWalk";

// Import Maze Algorithms
import { randomMaze } from "../mazes/randomMaze";
import { horizontalMaze } from "../mazes/horizontalMaze";
import { verticalMaze } from "../mazes/verticalMaze";
import { recursiveDivisionMaze } from "../mazes/recursiveDivision";

// Functions to get the beginnings of our grid
const getGridMeasurements = (width, height) => {
  let numCols;
  if (width > 1500) {
    numCols = Math.floor(width / 25);
  } else if (width > 1250) {
    numCols = Math.floor(width / 22.5);
  } else if (width > 1000) {
    numCols = Math.floor(width / 20);
  } else if (width > 750) {
    numCols = Math.floor(width / 17.5);
  } else if (width > 500) {
    numCols = Math.floor(width / 15);
  } else if (width > 250) {
    numCols = Math.floor(width / 12.5);
  } else if (width > 0) {
    numCols = Math.floor(width / 10);
  }
  let cellWidth = Math.floor(width / numCols);
  let numRows = Math.floor(height / cellWidth);
  return [numRows, numCols];
};

// Get increments used in the start and end nodes
const getIncrements = (num) => {
  let increments1 = [];
  let temp = 2;
  for (let i = 5; i < num / 2; i += 2) {
    increments1.push(temp);
    temp += 2;
  }
  let increments2 = [];
  temp = -2;
  for (let i = num / 2; i < num - 5; i += 2) {
    increments2.push(temp);
    temp -= 2;
  }
  return [increments1, increments2];
};

// Getting the start and end node using random numbers
const getStartAndEndNode = (numRows, numCols) => {
  let increments;
  let x;
  let y;
  let startNodeRow;
  let startNodeCol;
  let endNodeRow;
  let endNodeCol;
  if (numRows < numCols) {
    increments = getIncrements(numRows);
    x = Math.floor(numRows / 2);
    y = Math.floor(numCols / 2);
    if (x % 2 !== 0) x -= 1;
    if (y % 2 !== 0) y += 1;
    startNodeRow =
      x + increments[1][Math.floor(Math.random() * increments[1].length)];
    startNodeCol = y + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    endNodeRow =
      x + increments[0][Math.floor(Math.random() * increments[0].length)];
    endNodeCol = numCols - y + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
  } else {
    increments = getIncrements(numCols);
    x = Math.floor(numRows / 4);
    y = Math.floor(numCols / 2);
    if (x % 2 !== 0) x -= 1;
    if (x % 2 !== 0) y += 1;
    startNodeRow = x + [-6, -4, -2, 0][Math.floor(Math.random() * 4)];
    startNodeCol =
      y + increments[1][Math.floor(Math.random() * increments[1].length)];
    endNodeRow = numRows - x + [0, 2, 4, 6][Math.floor(Math.random() * 4)];
    endNodeCol =
      y + increments[0][Math.floor(Math.random() * increments[0].length)];
  }
  return [startNodeRow, startNodeCol, endNodeRow, endNodeCol];
};

// Creating the initial grid with number of rows and columns
const createInitialGrid = (numRows, numCols) => {
  let grid = [];
  for (let row = 0; row < numRows; row++) {
    let currentRow = [];
    for (let col = 0; col < numCols; col++) {
      currentRow.push(createNode(row, col));
    }
    grid.push(currentRow);
  }
  return grid;
};

// Grid constants
const initialMeasurements = getGridMeasurements(
  window.innerWidth,
  window.innerHeight
);
const initialNumRows = initialMeasurements[0];
const initialNumCols = initialMeasurements[1];

const startAndEndNode = getStartAndEndNode(initialNumRows, initialNumCols);
const startNodeRow = startAndEndNode[0];
const startNodeCol = startAndEndNode[1];
const endNodeRow = startAndEndNode[2];
const endNodeCol = startAndEndNode[3];

// Node constructor
const createNode = (row, col) => {
  return {
    row,
    col,
    isStart: row === startNodeRow && col === startNodeCol,
    isEnd: row === endNodeRow && col === endNodeCol,
    distance: Infinity,
    totalDistance: Infinity,
    isVisited: false,
    isShortest: false,
    isWall: false,
    previousNode: null,
  };
};

const PathfindingVisualizer = () => {
  //   State
  const [grid, setGrid] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const [numRows, setNumRows] = useState(initialNumRows);
  const [numCols, setNumCols] = useState(initialNumCols);
  const [speed, setSpeed] = useState(10);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [mazeSpeed, setMazeSpeed] = useState(10);
  const [visualizing, setVisualizing] = useState(false);
  const [creatingMaze, setCreatingMaze] = useState(false);

  // Get the initial width and height
  const getDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  // Sets the maze speed and path speeds
  const getSpeed = (path, maze) => {
    setSpeed(path);
    setMazeSpeed(maze);
  };

  // Creates a new grid with walls
  const newGridWithWalls = (grid, row, col) => {
    let newGrid = grid.slice();
    let node = grid[row][col];
    let newNode = {
      ...node,
      isWall: !node.isWall,
    };
    newGrid[row][col] = newNode;
    return newGrid;
  };

  // Creates a new grid with mazes.
  const newGridWithMaze = (grid, walls) => {
    let newGrid = grid.slice();
    for (let wall of walls) {
      let node = grid[wall[0]][wall[1]];
      let newNode = {
        ...node,
        isWall: true,
      };
      newGrid[wall[0]][wall[1]] = newNode;
    }
    return newGrid;
  };

  // Erases the path on the screen
  const getGridWithoutPath = (grid) => {
    let newGrid = grid.slice();
    for (let row of grid) {
      for (let node of row) {
        let newNode = {
          ...node,
          distance: Infinity,
          totalDistance: Infinity,
          isVisited: false,
          isShortest: false,
          previousNode: null,
        };
        newGrid[node.row][node.col] = newNode;
      }
    }
    return newGrid;
  };

  const updateNodesForRender = (
    grid,
    nodesInShortestPathInOrder,
    visitedNodesInOrder
  ) => {
    let newGrid = grid.slice();
    for (let node of visitedNodesInOrder) {
      if (
        (node.row === startNodeRow && node.col === startNodeCol) ||
        (node.row === endNodeRow && node.col === endNodeCol)
      )
        continue;
      let newNode = {
        ...node,
        isVisited: true,
      };
      newGrid[node.row][node.col] = newNode;
    }
    for (let node of nodesInShortestPathInOrder) {
      if (node.row === endNodeRow && node.col === endNodeCol) {
        return grid;
      }
      let newNode = {
        ...node,
        isVisited: false,
        isShortest: true,
      };
      newGrid[node.row][node.col] = newNode;
    }
  };

  const getVisitedNodesInOrder = (
    visitedNodesInOrderStart,
    visitedNodesInOrderEnd
  ) => {
    let visitedNodesInOrder = [];
    let longest = Math.max(
      visitedNodesInOrderStart.length,
      visitedNodesInOrderEnd.length
    );
    for (let i = 0; i < longest; i++) {
      if (visitedNodesInOrderStart[i] !== undefined) {
        visitedNodesInOrder.push(visitedNodesInOrderStart[i]);
      }
      if (visitedNodesInOrderEnd[i] !== undefined) {
        visitedNodesInOrder.push(visitedNodesInOrderEnd[i]);
      }
    }
    return visitedNodesInOrder;
  };

  const updateSpeed = (path, maze) => {
    setSpeed(path);
    setMazeSpeed(maze);
  };

  //On resize, getDimensions again and setGrid
  useEffect(() => {
    window.addEventListener("resize", getDimensions);
    const grid = createInitialGrid(numRows, numCols);
    setGrid(grid);
  }, [numRows, numCols]);

  // Functions to handle mouse presses and wall building
  const handleMousePressed = (row, col) => {
    const newGrid = newGridWithWalls(grid, row, col);
    setGrid(newGrid);
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (mouseIsPressed) {
      const newGrid = newGridWithWalls(grid, row, col);
      setGrid(newGrid);
      setMouseIsPressed(true);
    }
  };

  const handleMouseReleased = () => {
    setMouseIsPressed(false);
  };

  // Functions that clean up the grid.
  const clearGrid = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]; col++) {
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
    if (visualizing || creatingMaze) {
      return;
    }
    for (let row = 0; row < grid.length; row++) {
      for (let col = 0; col < grid[0]; col++) {
        if (
          document.getElementById(`node-${row}-${col}`).className ===
          "node node-shortest-path"
        ) {
          document.getElementById(`node-${row}-${col}`).className = "node";
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
    if (nodesInShortestPathInOrder.length === 1) {
      setVisualizing(false);
    }
    for (let i = 0; i < nodesInShortestPathInOrder; i++) {
      if (i === nodesInShortestPathInOrder.length - 1) {
        setTimeout(() => {
          let newGrid = updateNodesForRender(
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

  const animateAlgorithm = (
    visitedNodesInOrder,
    nodesInShortestPathInOrder
  ) => {
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
      let node = visitedNodesInOrder[i];
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          animateShortestPath(nodesInShortestPathInOrder, visitedNodesInOrder);
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
            "node node-end-reached";
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

  // Visualize Functions
  const visualizeDijkstra = () => {
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

  const visualizeAStar = () => {
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

  const visualizeBFS = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setVisualizing(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const visitedNodesInOrder = breadthFirstSearch(grid, startNode, endNode);
      const nodesInShortestPathInOrder =
        getNodesInShortestPathOrderBFS(endNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
    }, speed);
  };

  const visualizeDFS = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setVisualizing(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const visitedNodesInOrder = depthFirstSearch(grid, startNode, endNode);
      const nodesInShortestPathInOrder =
        getNodesInShortestPathOrderDFS(endNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
    }, speed);
  };

  const visualizeRandomWalk = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setVisualizing(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const visitedNodesInOrder = randomWalk(grid, startNode, endNode);
      animateRandomWalk(visitedNodesInOrder);
    }, speed);
  };

  const visualizeGreedyBFS = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setVisualizing(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const visitedNodesInOrder = greedyBestFirstSearch(
        grid,
        startNode,
        endNode
      );
      const nodesInShortestPathInOrder =
        getNodesInShortestPathOrderGBFS(endNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
    }, speed);
  };

  const visualizeBidirectionalGreedySearch = () => {
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
      const nodesInShortestPathInOrder =
        getNodesInShortestPathOrderBGS(endNode);
      animateAlgorithm(visitedNodesInOrder, nodesInShortestPathInOrder);
    }, speed);
  };

  // Animate and Generate Maze Functions

  const animateMaze = (walls) => {
    for (let i = 0; i <= walls.length; i++) {
      if (i === walls.length) {
        setTimeout(() => {
          clearGrid();
          let newGrid = newGridWithMaze(grid, walls);
          setGrid(newGrid);
          setCreatingMaze(false);
        }, i * speed);
        return;
      }
      let wall = walls[i];
      let node = grid[wall[0]][wall[1]];
      setTimeout(() => {
        //Walls
        document.getElementById(`node-${node.row}-${node.col}`).className =
          "node node-wall-animated";
      }, mazeSpeed);
    }
  };

  const generateRandomMaze = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setCreatingMaze(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const walls = randomMaze(grid, startNode, endNode);
      animateMaze(walls);
    }, speed);
  };

  const generateRecursiveDivisionMaze = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setCreatingMaze(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const walls = recursiveDivisionMaze(grid, startNode, endNode);
      animateMaze(walls);
    }, speed);
  };

  const generateVerticalMaze = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setCreatingMaze(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const walls = verticalMaze(grid, startNode, endNode);
      animateMaze(walls);
    }, speed);
  };

  const generateHorizontalMaze = () => {
    if (visualizing || creatingMaze) {
      return;
    }
    setCreatingMaze(true);
    setTimeout(() => {
      const startNode = grid[startNodeRow][startNodeCol];
      const endNode = grid[endNodeRow][endNodeCol];
      const walls = horizontalMaze(grid, startNode, endNode);
      animateMaze(walls);
    }, speed);
  };

  return (
    <>
      <ToolBar
        visualizing={visualizing}
        creatingMaze={creatingMaze}
        visualizeDijkstra={visualizeDijkstra}
        visualizeAStar={visualizeAStar}
        visualizeGreedyBFS={visualizeGreedyBFS}
        visualizeDFS={visualizeDFS}
        visualizeBidirectionalGreedySearch={visualizeBidirectionalGreedySearch}
        visualizeRandomWalk={visualizeRandomWalk}
        generateRandomMaze={generateRandomMaze}
        generateHorizontalMaze={generateHorizontalMaze}
        generateVerticalMaze={generateVerticalMaze}
        generateRecursiveDivisionMaze={generateRecursiveDivisionMaze}
        clearGrid={clearGrid}
        clearPath={clearPath}
        updateSpeed={updateSpeed}
      />
      <div className="grid">
        {grid.map((row, rowId) => {
          return (
            <div key={rowId}>
              {row.map((node, nodeId) => {
                const {
                  row,
                  col,
                  isStart,
                  isEnd,
                  isVisited,
                  isShortest,
                  isWall,
                } = node;
                return (
                  <Node
                    key={nodeId}
                    row={row}
                    col={col}
                    isStart={isStart}
                    isEnd={isEnd}
                    isVisited={isVisited}
                    isShortest={isShortest}
                    isWall={isWall}
                    width={width}
                    height={height}
                    numRows={numRows}
                    numCols={numCols}
                    onMousePressed={(row, col) => handleMousePressed(row, col)}
                    onMouseEnter={(row, col) => handleMouseEnter(row, col)}
                    onMouseReleased={() => handleMouseReleased()}
                  ></Node>
                );
              })}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default PathfindingVisualizer;

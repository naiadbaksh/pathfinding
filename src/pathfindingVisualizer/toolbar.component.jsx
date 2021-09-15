import React, { useState } from "react";
import "./toolbar.styles.css";

const Toolbar = (props) => {
  // State
  const [algorithm, setAlgorithm] = useState("Visualize Algorithm");
  const [maze, setMaze] = useState("Generate Maze");
  const [pathState, setPathState] = useState(false);
  const [mazeState, setMazeState] = useState(false);
  const [speedState, setSpeedState] = useState("Speed");

  const selectAlgorithm = (selection) => {
    if (visualizingAlgorithm) {
      return;
    }
    if (
      selection === algorithm ||
      algorithm === "Visualize Algorithm" ||
      algorithm === "Select an Algorithm"
    ) {
      setAlgorithm(selection);
    } else if (pathState) {
      clearPath();
      setAlgorithm(selection);
    } else {
      setAlgorithm(selection);
    }
  };

  const selectMaze = (selection) => {
    if (visualizingAlgorithm || generatingMaze) {
      return;
    }
    if (
      selection === maze ||
      maze === "Generate Maze" ||
      maze === "Select a Maze"
    ) {
      setMaze(selection);
    } else if (pathState) {
      clearPath();
      setMaze(selection);
    } else {
      setMaze(selection);
    }
  };

  const visualizeAlgorithm = () => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    if (
      algorithm === "Visualize Algorithm" ||
      algorithm === "Select an Algorithm"
    ) {
      setAlgorithm("Select an Algorithm");
    } else {
      setPathState(true);
      let algoList = [
        "Visualize Dijkstra",
        "Visualize A*",
        "Visualize Greedy BFS",
        "Visualize Bidirectional Greedy",
        "Visualize Breadth First Search",
        "Visualize DepthFirstSearch",
        "Visualize Random Search",
      ];
      let functionsList = [
        visualizeDijkstra(),
        visualizeAStar(),
        visualizeGreedyBfs(),
        visualizeBidirectionalGreedy(),
        visualizeBreadthFirstSeach(),
        visualizeDepthFirstSearch(),
        visualizeRandomSearch(),
      ];
      for (const [idx, algo] of algoList.entries()) {
        if (algo === algorithm) {
          functionsList[idx]();
        }
      }
    }
  };

  const generatingMaze = () => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    if (mazeState || pathState) {
      clearTemp();
    }
    if (maze === "Generate Maze" || maze === "Select a Maze") {
      setMaze("Select an Maze");
    } else {
      setMazeState(true);
      let mazeList = [
        "Generate Random Maze",
        "Generate Recursive Maze",
        "Generate Vertical Maze",
        "Generate Horiztonal Maze",
      ];
      let functionsList = [
        generateRandomMaze(),
        generateRecursiveMaze(),
        generateVerticalMaze(),
        generateHorizontalMaze(),
      ];
      for (const [idx, mazeType] in mazeList.entries()) {
        if (mazeType === maze) {
          functionsList[idx]();
        }
      }
    }
  };

  const clearGrid = () => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    clearGrid();
    setAlgorithm("Visualize Algorithm");
    setMaze("Generate Maze");
    setPathState(false);
    setMazeState(false);
  };

  const clearPath = () => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    clearPath();
    setPathState(false);
    setMazeState(false);
  };

  const clearTemp = () => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    clearGrid();
    setPathState(false);
    setMazeState(false);
  };

  const changeSpeed = (speed) => {
    if (visualizeAlgorithm || generatingMaze) {
      return;
    }
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed == "Medium") value = [25, 20];
    else if (speed == "Fast") value = [10, 10];
    setSpeedState(speed);
    updateSpeed(value[0], value[1]);
  };

  return (
    <nav className="toolbar toolbar-expand toolbar-dark bg-dark">
      <div className="toolbar-collapse" id="toolbarNavDrop">
        <ul className="toolbar-nav">
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Algorithms
              </button>
              <div
                className="dropdown-menu"
                aria-labelledby="algorithmDropdown"
              >
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectAlgorithm("Visualize Dijkstra")}
                >
                  Dijkstra's Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectAlgorithm("Visualize A*")}
                >
                  A* Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectAlgorithm("Visualize Greedy BFS")}
                >
                  Greedy BFS Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() =>
                    selectAlgorithm("Visualize Bidirectional Greedy")
                  }
                >
                  Bidirectional Greedy Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() =>
                    selectAlgorithm("Visualize Breadth First Search")
                  }
                >
                  Breadth First Search Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() =>
                    selectAlgorithm("Visualize Depth First Search")
                  }
                >
                  Depth First Search Algorithm
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectAlgorithm("Visualize Random Walk")}
                >
                  Random Walk
                </button>
              </div>
            </div>{" "}
          </li>
          <li>
            <button
              type="button"
              className="btn btn-success"
              onClick={() => visualizeAlgorithm()}
            >
              {algorithm}
            </button>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-light dropdown-toggle"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Mazes
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectMaze("Generate Random Maze")}
                >
                  Random Maze
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectMaze("Generate Recursive Maze")}
                >
                  Recursive Maze
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectMaze("Generate Vertical Maze")}
                >
                  Vertical Maze
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => selectMaze("Generate Horizontal Maze")}
                >
                  Horizontal Maze
                </button>
              </div>
            </div>{" "}
          </li>
          <li>
            <button
              className="btn btn-success"
              type="button"
              onClick={() => generateMaze()}
            >
              {maze}
            </button>
          </li>
          <li>
            <button
              className="btn btn-danger"
              type="button"
              onClick={() => clearGrid()}
            >
              Clear Grid
            </button>
          </li>
          <li className="nav-item dropdown">
            <div className="dropdown">
              <button
                className="btn btn-info droptown-toggle"
                type="button"
                id="dropdownMenu1"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                {speedState}
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => changeSpeed("Slow")}
                >
                  Slow
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => changeSpeed("Medium")}
                >
                  Medium
                </button>
                <button
                  className="dropdown-item btn-light"
                  type="button"
                  onClick={() => changeSpeed("Fast")}
                >
                  Fast
                </button>
              </div>
            </div>{" "}
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Toolbar;

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
    if (props.visualizing) {
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
    if (props.visualizing || props.creatingMaze) {
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
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    if (pathState) {
      clearTemp();
      return;
    }
    if (
      algorithm === "Visualize Algorithm" ||
      algorithm === "Select an Algorithm"
    ) {
      setAlgorithm("Select an Algorithm");
    } else {
      setPathState(true);
      if (algorithm === "Visualize Dijkstra") {
        props.visualizeDijkstra();
      } else if (algorithm === "Visualize A*") {
        props.visualizeAStar();
      } else if (algorithm === "Visualize Greedy BFS") {
        props.visualizeGreedyBFS();
      } else if (algorithm === "Visualize Bidirectional Greedy") {
        props.visualizeBidirectionalGreedySearch();
      } else if (algorithm === "Visualize Breadth First Search") {
        props.visualizeBidirectionalGreedySearch();
      } else if (algorithm === "Visualize Breadth First Search") {
        props.visualizeBFS();
      } else if (algorithm === "Visualize Depth First Search") {
        props.visualizeDFS();
      } else if (algorithm === "Visualize Depth First Search") {
        props.visualizeDFS();
      } else if (algorithm === "Visualize Random Walk") {
        props.visualizeRandomWalk();
      }
    }
  };

  const generateMaze = () => {
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    if (mazeState || pathState) {
      clearTemp();
    }
    if (maze === "Generate Maze" || maze === "Select a Maze") {
      setMaze("Select an Maze");
    } else {
      setMazeState(true);
      if (maze === "Generate Random Maze") {
        props.generateRandomMaze();
      } else if (maze === "Generate Recursive Maze") {
        props.generateRecursiveDivisionMaze();
      } else if (maze === "Generate Vertical Maze") {
        props.generateVerticalMaze();
      } else if (maze === "Generate Horizontal Maze") {
        props.generateHorizontalMaze();
      }
    }
  };

  const clearGrid = () => {
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    props.clearGrid();
    setAlgorithm("Visualize Algorithm");
    setMaze("Generate Maze");
    setPathState(false);
    setMazeState(false);
  };

  const clearPath = () => {
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    props.clearPath();
    setPathState(false);
    setMazeState(false);
  };

  const clearTemp = () => {
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    props.clearGrid();
    setPathState(false);
    setMazeState(false);
  };

  const changeSpeed = (speed) => {
    if (props.visualizing || props.creatingMaze) {
      return;
    }
    let value = [10, 10];
    if (speed === "Slow") value = [50, 30];
    else if (speed === "Medium") value = [25, 20];
    else if (speed === "Fast") value = [10, 10];
    setSpeedState(speed);
    props.updateSpeed(value[0], value[1]);
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="navbar-collapse" id="navbarNavDrop">
        <ul className="navbar-nav">
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
              <div className="dropdown-menu" aria-labelledby="dropdownMenu1">
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

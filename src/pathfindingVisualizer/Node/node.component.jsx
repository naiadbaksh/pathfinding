import React from "react";
import "./node.styles.css";

const Node = ({
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  isShortest,
  onMouseEnter,
  onMousePressed,
  onMouseReleased,
  width,
  height,
  numRows,
  numCols,
}) => {
  //Extra classes to add to the nodes using conditional rendering
  const classes = isStart
    ? "node node-start"
    : isEnd
    ? "node node-end"
    : isWall
    ? "node-wall"
    : isShortest
    ? "node node-shortest-path"
    : isVisited
    ? "node node-visited"
    : "node";

  // Conditions for responsiveness
  let cellWidth = Math.floor((width - 15) / numCols);
  let cellHeight;
  if (width > 1500) {
    cellHeight = Math.floor((height - 70) / numRows);
  } else if (width > 1000) {
    cellHeight = Math.floor((height - 70) / numRows);
  } else if (width > 500) {
    cellHeight = Math.floor((height - 60) / numRows);
  } else if (width > 0) {
    cellHeight = Math.floor((height - 50) / numRows);
  }

  return (
    <div
      id={`node-${row}-${col}`}
      className={`${classes}`}
      style={{ "--width": `${cellWidth}px`, "--height": `${cellHeight}px` }}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMousePressed={() => onMousePressed(row, col)}
      onMouseReleased={() => onMouseReleased()}
    ></div>
  );
};

export default Node;

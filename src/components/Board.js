import React from "react";
import styled from "styled-components";
const Board = styled.table`
  border-collapse: collapse;
  margin: 0 auto;
`;

const Circle = ({ size }) => (
  <div className="Play0">
    <svg width={size} height={size}>
      <circle
        stroke="#FFDE03"
        fill="none"
        strokeWidth={6}
        cx={size / 2}
        cy={size / 2}
        r={(size - 6) / 2}
      />
    </svg>
  </div>
);

const Row = styled.tr`
  :last-child {
    border-bottom: none;
  }
`;

const Cell = styled.td`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  text-align: center;
`;
const defaultTable = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

export default ({ table = defaultTable, cellClick, cellSize = 100 }) => (
  <Board>
    <tbody>
      {table.map((row, rowIndex) => (
        <Row key={rowIndex}>
          {row.map((item, colIndex) => (
            <Cell
              size={cellSize}
              key={colIndex}
              onClick={() => cellClick(rowIndex, colIndex)}
            >
              <div className="svgfile">
                {item === null ? (
                  ""
                ) : item === "x" ? (
                  <p className="PlayX">X</p>
                ) : (
                  <Circle size={cellSize * 0.5} />
                )}
              </div>
            </Cell>
          ))}
        </Row>
      ))}
    </tbody>
  </Board>
);

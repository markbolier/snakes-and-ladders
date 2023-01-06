import { useEffect, useState } from "react";
import "./App.css";
import io from "socket.io-client";
import * as Styled from "./App.styled";

const socket = io("localhost:3001");

const ladders = [
  { 5: 22 },
  { 9: 30 },
  { 14: 35 },
  { 19: 40 },
  { 31: 51 },
  { 38: 77 },
  { 54: 73 },
  { 59: 62 },
  { 66: 97 },
  { 80: 82 },
  { 90: 91 },
];

const snakes = [
  { 3: 1 },
  { 15: 8 },
  { 53: 12 },
  { 57: 44 },
  { 67: 47 },
  { 71: 52 },
  { 74: 64 },
  { 79: 39 },
  { 94: 87 },
  { 99: 27 },
];

const gridArray: any = [];
const matrix = new Array(gridArray);

const createGrid = () => {
  let block = 10 * 10;
  for (let column = 1; column < 11; column++) {
    let rows = [];
    if (column % 2 === 0) {
      block = block - 10;
      let value = block;
      for (let row = 1; row < 11; row++) {
        rows.push(value);
        value++;
      }
    } else {
      for (let row = 1; row < 11; row++) {
        block = block - 1;
        rows.push(block);
      }
    }
    gridArray.push(rows);
  }
  return gridArray;
};

createGrid();

const App = () => {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  // const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      setIsConnected(true);
    });
    socket.on("disconnect", () => {
      setIsConnected(false);
    });
    socket.on("message", (data) => {
      setLastMessage(data);
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, []);

  const sendMessage = () => {
    socket.emit("hello!");
  };

  console.log(gridArray);
  console.log("newgrid:", matrix);

  return (
    <div className="App">
      <p>Connected: {"" + isConnected}</p>
      <p>Last message: {lastMessage || "-"}</p>
      <button onClick={sendMessage}>Say hello!</button>
      <Styled.Board>
        <Styled.Grid>
          {matrix.map((row: any) => {
            <Styled.Row>
              {row.map((cell: any) => {
                <Styled.Box key={cell}></Styled.Box>;
              })}
            </Styled.Row>;
          })}
        </Styled.Grid>
        <Styled.Pawn color="red" player={1} />
        <Styled.Pawn color="blue" player={2} />
        <Styled.Pawn color="green" player={3} />
        <Styled.Pawn color="yellow" player={4} />
      </Styled.Board>
    </div>
  );
};

export default App;

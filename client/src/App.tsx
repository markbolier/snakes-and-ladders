import { useEffect, useState } from 'react';
import './App.css';
import io from 'socket.io-client';
import * as Styled from './App.styled';

const socket = io('localhost:3001');

const ladders = [5, 9, 14, 19, 31, 38, 54, 59, 66, 80, 90];
const snakes = [3, 15, 53, 57, 67, 71, 74, 79, 94, 99];

// const rowsEven:any = [];
// const rowsOdd:any = [];

// const grid = { ...rowsEven, ...rowsOdd };

// for (let i = 1; i < 101; i++) {
//   if (i % 2 === 0) {
//     rowsEven.push({ id: { i } })
//   }
//   else {
//     rowsOdd.push({ id: { i } });
//   }
// }

	const boxes :any[] = [];
	
	for (let i = 1; i < 101; i++) {
    boxes.push({ id: { i } })
	}

function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastMessage, setLastMessage] = useState(null);
  // const [players, setPlayers] = useState([]);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
    });
    socket.on('disconnect', () => {
      setIsConnected(false);
    });
    socket.on('message', data => {
      setLastMessage(data);
    });
    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  const sendMessage = () => {
    socket.emit('hello!');
  }

  return (
    <div className="App">
      <p>Connected: { '' + isConnected }</p>
      <p>Last message: { lastMessage || '-' }</p>
      <button onClick={ sendMessage }>Say hello!</button>
      <Styled.Board>
        <Styled.Grid>
              {boxes.map((box, i) => (
                <Styled.Box key={box.id} id={`${i}`}></Styled.Box>
              ))}
          </Styled.Grid>
            <Styled.Pawn color="red" player={1} />
            <Styled.Pawn color="blue" player={2} />
            <Styled.Pawn color="green" player={3} />
            <Styled.Pawn color="yellow" player={4} />
          </Styled.Board>
    </div>
  );
}

export default App;

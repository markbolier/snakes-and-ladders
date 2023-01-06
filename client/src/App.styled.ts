import styled from 'styled-components';

interface StyledProps {
  color: string;
  player: number;
}

export const Board = styled.div`
  background-image: url("images/board.png");
  background-repeat: no-repeat;
  background-size: contain;
  display: grid;
  padding-top: 100%;
  position: absolute;
  width: 100vw;
  z-index: -1;
`;

export const Pawn = styled.div<StyledProps>`
  background: ${({ color }) => color};
  border-radius: 50%;
  height: 20px;
  width: 20px;
`;

export const Box = styled.div`
  border: 1px solid red;
  height: 4.9vh;
  width: 9.6vw;
`;

export const Grid = styled.div`
  position: absolute;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  grid-template-rows: repeat(10, 1fr);
  grid-auto-flow:dense
`;

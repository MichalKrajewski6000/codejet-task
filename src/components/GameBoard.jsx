import { styled } from "styled-components";
import { useMachine } from "@xstate/react";

import gameMachine from "./gameMachine";

const GameBoard = () => {
  const Board = styled.div`
    margin-left: auto;
    display: grid;
    grid-template-columns: repeat(3, 10rem);
    grid-template-rows: repeat(3, 10rem);
    grid-gap: 5px;
    justify-content: center;
    align-items: center;
  `;

  const Button = styled.button`
    background-color: #FF4900;
    margin: auto
    width: 100%;
    height: 100%;
    border-radius: 0;
    font-family: Alfa-Slab-One;
    font-size: 4em;
    color: white;
    text-align: center;
    padding: auto;

    &:hover {
      background-color: #CC3202;
    }
  `;

  const [state, send] = useMachine(gameMachine);
  console.log("State", state);
  return (
    <div>
      {state.matches("playing") && (
        <>
          <h1>{state.context.player} Turn</h1>
          <Board className="board">
            {state.context.board.map((tab, tabIndex) => {
              return (
                <Button
                  key={tabIndex}
                  className={`button${tabIndex}`}
                  onClick={() => send({ type: "MOVE", move: tabIndex })}
                >
                  {tab}
                </Button>
              );
            })}
          </Board>
        </>
      )}

      {state.matches("gameOver") && (
        <>
          {state.context.winner === "Draw" ? (
            <h1>DRAW!!!</h1>
          ) : (
            <h1>The Winner is {state.context.player}</h1>
          )}
          <button
            style={{ border: "1px solid orange" }}
            onClick={() => send({ type: "RESET" })}
          >
            {" "}
            RESET GAME
          </button>
        </>
      )}
    </div>
  );
};

export default GameBoard;

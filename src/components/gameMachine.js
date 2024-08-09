import { assign, setup } from "xstate";

const winningLines = [
  "0,1,2",
  "3,4,5",
  "6,7,8",
  "0,4,8",
  "2,4,6",
  "0,3,6",
  "1,4,7",
  "2,5,8",
];

const checkBoard = (context) => {
  let winner = null;
  for (let i = 0; i < winningLines.length; i++) {
    const [x1, x2, x3] = winningLines[i].split(",");

    if (
      context.board[x1] === context.player &&
      context.board[x2] === context.player &&
      context.board[x3] === context.player
    ) {
      winner = context.player;
    }
  }

  if (!context.board.includes(null) && !context.winner) winner = "Draw";

  return winner;
};

const gameMachine = setup({
  actions: {
    makeMove: assign(({ context, event }) => {
      const currentPlayer = context.player;
      const squareIndex = event.move;
      const newBoard = [...context.board];

      newBoard[squareIndex] = currentPlayer;
      const nextPlayer = currentPlayer === "X" ? "O" : "X";

      return {
        player: nextPlayer,
        board: newBoard,
      };
    }),
    reset: assign({
      player: "X",
      winner: null,
      board: Array(9).fill(null),
    }),
  },
  guards: {
    isValid: ({ context, event }) => {
      return context.board[event.move] === null;
    },
    checkWin: ({ context }) => {
      console.log(Boolean(checkBoard(context)));
      return Boolean(checkBoard(context));
    },
  },
}).createMachine({
  id: "tic-tac-toe",
  initial: "playing",
  context: {
    player: "X",
    winner: null,
    board: Array(9).fill(null),
  },
  states: {
    playing: {
      always: {
        target: "gameOver",
        guard: "checkWin",
        actions: assign({
          winner: ({ context }) => checkBoard(context),
        }),
      },
      on: {
        MOVE: {
          target: "",
          guard: "isValid",
          actions: "makeMove",
        },
      },
    },
    gameOver: {
      on: {
        RESET: {
          target: "playing",
          actions: "reset",
        },
      },
    },
  },
});

export default gameMachine;

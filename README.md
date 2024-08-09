## Project Name

TIC TAC TOE

Author: Michał Krajewski

This application was created as a part of recruitment process for Frontend Developer job in Codejet. It was created using JavaScript, React and XState.

## Installation and Setup Instructions

Clone down this repository. Node and yarn are necessary to run this app.

Installation:

`yarn install`

To Run Test Suite:

`yarn test`

To Start Server:

`yarn run dev`

To Visit App:

`http://localhost:5173/`

## Aproach and Design decisions

This app was developed according to the following requirements:

- Implement components using React
- Style components with styled-components
- Utilize the XState library for game logic and state management
- Create unit tests

The plan was to create a simple 3x3 grid with evenly sized squares. For the design, I chose background, square, and font colors from the Codejet website. The interface features a header displaying the current player's turn and a 3x3 game board.

XState was used to manage the state machine, which holds the array for rendering the game board and tracks states such as the current player, game status (win or draw), and more.

When a button is clicked, the app sends a request to the state machine to perform the action of placing the X or O symbol on the selected square and checking if the current board state concludes the game. Once the game ends, the header displays the result and a reset button appears to start a new game.

import { styled } from "styled-components";
import GameBoard from "./components/GameBoard";

function App() {
  const Root = styled.div`
    width: 100vw;
    height: 100vh;
    text-align: center;
    background-color: #fafafa;
  color: #27272a;
}
  `;
  return (
    <Root>
      <GameBoard />
    </Root>
  );
}

export default App;

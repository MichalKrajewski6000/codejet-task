/* eslint-disable no-undef */
import { render, screen } from "@testing-library/react";

import GameBoard from "../components/GameBoard";

import "@testing-library/jest-dom";

test("renders Game Board", () => {
  render(<GameBoard />);
  const logHeader = screen.getByText(/X Turn/i);
  const board = screen.getAllByRole("button");

  expect(logHeader).toBeInTheDocument();
  expect(board.length).toBe(9);
  expect(board.filter((val) => val.nodeValue !== null).length).toBe(0);
});

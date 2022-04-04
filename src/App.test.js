import { render, screen } from "@testing-library/react";
import App from "./App";

test("Check if the table column Coin renders on the side", () => {
  render(<App />);
  const linkElement = screen.getByText(/Coin/i);
  expect(linkElement).toBeInTheDocument();
});

test("Check if the table column Balance renders on the side", () => {
  render(<App />);
  const linkElement = screen.getByText(/Balance/i);
  expect(linkElement).toBeInTheDocument();
});

test('Check if theme button rendered and displays corrent icon', ()=> {
  const { getByTestId } = render(<App />);
  const button = getByTestId('WbSunnyIcon');
  expect(button).toBeInTheDocument()
});

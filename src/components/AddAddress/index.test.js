import { render } from "@testing-library/react";
import AddAddress from "./index";


test('Check if Add Address button rendered and displays corrent icon', ()=> {
  const { getByTestId } = render(<AddAddress />);
  const button = getByTestId('AddIcon');
  expect(button).toBeInTheDocument()
});

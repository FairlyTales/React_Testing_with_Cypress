import { render, screen } from "@testing-library/react";
import TransactionCreateStepTwo from "./TransactionCreateStepTwo";
import userEvent from "@testing-library/user-event";

describe("unit testing", () => {
  test("on initial render pay button is disabled", async () => {
    render(<TransactionCreateStepTwo sender={{ id: "2" }} receiver={{ id: "asd" }} />);

    expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();
  });

  test("pay btn is enabled if an amount and note are entered", async () => {
    // arrange
    render(<TransactionCreateStepTwo sender={{ id: "2" }} receiver={{ id: "asd" }} />);

    // act
    userEvent.type(screen.getByPlaceholderText(/amount/i), "100");
    userEvent.type(screen.getByPlaceholderText(/add a note/i), "added note");

    // assert
    expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
  });
});

// well, in the real world integration testing is not just about combining
// several unit tests. It's just one part of it and we will do it here as
// an example
describe("integration testing", () => {
  test("pay button is disabled at first and enabled after the field are filled", async () => {
    render(<TransactionCreateStepTwo sender={{ id: "2" }} receiver={{ id: "asd" }} />);

    expect(await screen.findByRole("button", { name: /pay/i })).toBeDisabled();

    userEvent.type(screen.getByPlaceholderText(/amount/i), "100");
    userEvent.type(screen.getByPlaceholderText(/add a note/i), "added note");

    expect(await screen.findByRole("button", { name: /pay/i })).toBeEnabled();
  });
});

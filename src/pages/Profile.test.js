import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Profile from "./Profile";

// Mock the UserAuth context
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(() => ({
    user: { email: "old@example.com" }, // Mocked user object
    updateUserEmail: jest.fn(), // Mocked updateUserEmail function
  })),
}));

describe("Profile Component", () => {
  test("updates email successfully", async () => {
    render(<Profile />);

    // Mocked updateUserEmail function
    const { updateUserEmail } = require("../context/AuthContext").UserAuth();
    // Find the Input component for email by its type
    const emailInput = screen.getByRole("textbox", { type: "email" });
// Simulate entering a new email
    act(() => {
      fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    });

    // Find and click the update button
const updateButton = screen.getByTestId("update-email-button");
        act(() => {
          fireEvent.click(updateButton);
        });

    // Wait for a short duration for the update to finish
    await new Promise(resolve => setTimeout(resolve, 500));

    // Assert that the success message is displayed
    const successMessage = screen.getByText(/email address has been updated/i);
expect(successMessage).toBeTruthy();

  // Simulate window refresh
    act(() => {
      window.location.reload();
    });

  // Wait for a short duration for the page to reload
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Assert that the email input value which is now the current email persists after window refresh
    expect(emailInput.value).toBe("new@example.com");
  });
});
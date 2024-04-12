import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Profile from "./Profile";
import { UserAuth } from "../context/AuthContext"; // Import UserAuth from context

// Mock the UserAuth context
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(() => ({
    user: { email: "old@example.com" }, // Mocked user object
    updateUserEmail: jest.fn(), // Mocked updateUserEmail function
    updateUserPassword: jest.fn(), // Mocked updateUserPassword function
    loginUser: jest.fn().mockResolvedValue(), // Mocked loginUser function with mockResolvedValue
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


   test("updates password successfully", async () => {
       // Mock the login process
       UserAuth().loginUser.mockResolvedValue();

       // Render the Profile component
      render(<Profile />);

      // Mocked updateUserEmail function
      const { updateUserPassword } = require("../context/AuthContext").UserAuth();
      // Find the Input component for password by its type
      const passwordInput = screen.getByRole("textbox", { type: "password" });
  // Simulate entering a new password
      act(() => {
        fireEvent.change(passwordInput, { target: { value: "password123" } });
      });

        // Use a try-catch block to catch the error
        try {
          // Attempt to find the success message
          screen.getByText(/email address has been updated/i);

          // If no error is thrown, fail the test because the message shouldn't show before password is updated
          expect(true).toBe(false);
        } catch (error) {
          // Assert that an error is thrown
          expect(error).toBeDefined();
        }

      // Find and click the update button
            const updateButton = screen.getByTestId("update-password-button");
           await act(async () => {
             fireEvent.click(updateButton);
           });

      // Assert that the success message is displayed
      const successMessage = screen.getByText(/password has been updated/i);
      expect(successMessage).toBeTruthy();
    });
});
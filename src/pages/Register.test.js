import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Register from "./Register";
import { UserAuth } from "../context/AuthContext";

// Mocking the UserAuth context
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(() => ({
    registerUser: jest.fn(),
  })),
}));

describe("Register Component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Register />
      </Router>,
    );
  });

  it("displays error message if passwords do not match", async () => {
    const { getByText, getByPlaceholderText, getByRole } = render(
      <Router>
        <Register />
      </Router>,
    );

    fireEvent.change(getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password1" },
    });
    fireEvent.change(getByPlaceholderText("Confirm your password"), {
      target: { value: "password2" },
    });

    fireEvent.click(getByRole("button", { name: /register/i }));

    // Wait for the error message to be displayed
    await new Promise(resolve => setTimeout(resolve, 100));

    // Check if the error message is present
    const errorMessage = screen.queryByText("Passwords do not match");
    expect(errorMessage).not.toBeNull();
  });

  it("successfully registers the user if passwords match", async () => {
    // Mock navigate function
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    // Render the Register component
    const { getByPlaceholderText, getByRole, getByText } = render(
      <Router>
        <Register />
      </Router>,
    );

    // Simulate input events to enter matching passwords
    fireEvent.change(getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password" },
    });
    fireEvent.change(getByPlaceholderText("Confirm your password"), {
      target: { value: "password" },
    });

    // Simulate form submission
    fireEvent.click(getByRole("button", { name: /register/i }));

    // Wrap assertions that involve state updates in act(...)
    await act(async () => {
      // Assert that the button's text content matches "Registering..." when loading is true
      const button = getByRole("button", { name: /register/i });
      expect(button.textContent).toBe("Registering...");

      // Assert that the user is navigated to the homepage
      expect(window.location.pathname).toBe("/");
    });
  });
});

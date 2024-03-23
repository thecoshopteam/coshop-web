import React from "react";
import { render, fireEvent, screen, waitFor, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "./Login";
import { UserAuth } from "../context/AuthContext";

// Mocking the UserAuth context
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(() => ({
    loginUser: jest.fn(),
  })),
}));

describe("Login Component", () => {
  it("renders without crashing", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
  });

  it("displays error message if login fails", async () => {
    // Mock loginUser function to throw an error
    UserAuth().loginUser.mockRejectedValue(new Error("Login failed"));

    const { getByPlaceholderText, findByPlaceholderText, getByRole, findByText } = render(
      <Router>
        <Login />
      </Router>
    );

   await act(async () => {
     fireEvent.change(getByPlaceholderText("Email address"), {
       target: { value: "test@example.com" },
     });
     fireEvent.change(getByPlaceholderText("Password"), {
       target: { value: "password" },
     });
     fireEvent.click(getByRole("button", { name: /log in/i }));
   });

    // Wait for the error message to be displayed
    await new Promise(resolve => setTimeout(resolve, 100));
    const errorMessage = screen.queryByText(/Error\. Please try again\./i);
    expect(errorMessage).toBeDefined();

});

  it("successfully logs in the user", async () => {
    // Mock loginUser function to resolve successfully
    UserAuth().loginUser.mockResolvedValue();

    // Mock navigate function
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <Login />
      </Router>
    );

    fireEvent.change(getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("Password"), {
      target: { value: "password" },
    });

    fireEvent.click(getByRole("button", { name: /log in/i }));

    // Assert that the user is navigated to the homepage
    await act(async () => {
        expect(window.location.pathname).toBe("/");
    });
  });
});
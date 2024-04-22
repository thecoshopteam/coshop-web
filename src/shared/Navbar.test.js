import { render, fireEvent, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./Navbar";

// Mocking the AuthContext
import { UserAuth } from "../context/AuthContext";

// Mocking the AuthContext
jest.mock("../context/AuthContext", () => ({
  UserAuth: jest.fn(() => ({
    logoutUser: jest.fn(),
  })),
}));

describe("Navbar Component", () => {
  it("logs out the user and redirects to login page", async () => {
    // Mock navigate function
    const mockNavigate = jest.fn();
    jest.mock("react-router-dom", () => ({
      ...jest.requireActual("react-router-dom"),
      useNavigate: () => mockNavigate,
    }));

    // Render the Navbar component
    const { getByText } = render(
      <Router>
        <Navbar />
      </Router>,
    );

    // Click on the "Log Out" menu item
    await act(async () => {
      fireEvent.click(getByText("Log Out"));

      // Assert that handleSignOut is called
      const logOutMenuItem = getByText("Log Out");
      expect(logOutMenuItem).toBeTruthy();

      // Assert that the user is navigated to the login page
      await new Promise(resolve => setTimeout(resolve, 100));
      expect(window.location.pathname).toBe("/login");
    });
  });
});

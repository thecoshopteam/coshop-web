import React from "react";
import { render, fireEvent } from "@testing-library/react";
import CSList from "./CSList";
import CSListItem from "./CSListItem";
import '@testing-library/jest-dom';

describe("CRUD Operations", () => {
  let localStorageMock;

  beforeEach(() => {
    localStorageMock = {
      getItem: jest.fn(() => JSON.stringify([])),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    Object.defineProperty(window, "localStorage", { value: localStorageMock });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should add three new items to the list and local storage (Create) and then delete one item (Delete)", () => {
    const { getByPlaceholderText, getByText, queryByText, getAllByLabelText } =
      render(<CSList />);
    const input = getByPlaceholderText("Enter item title");
    const addButton = getByText("Add Item");

    // Add Peanut Butter to the list as the first item
    fireEvent.change(input, { target: { value: "Peanut Butter" } });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([{ id: 1, title: "Peanut Butter", isBought: false }]),
    );
    expect(queryByText("Peanut Butter")).toBeTruthy();

    // Add Jelly as the second item
    fireEvent.change(input, { target: { value: "Jelly" } });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([
        { id: 1, title: "Peanut Butter", isBought: false },
        { id: 2, title: "Jelly", isBought: false },
      ]),
    );
    expect(queryByText("Jelly")).toBeTruthy();

    // Add Bread as the third item
    fireEvent.change(input, { target: { value: "Bread" } });
    fireEvent.click(addButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([
        { id: 1, title: "Peanut Butter", isBought: false },
        { id: 2, title: "Jelly", isBought: false },
        { id: 3, title: "Bread", isBought: false },
      ]),
    );
    expect(queryByText("Bread")).toBeTruthy();

    // Delete the second item (Jelly)
    const deleteButtons = getAllByLabelText("delete");
    fireEvent.click(deleteButtons[1]);

    // Assert that Jelly is no longer in the list
    expect(queryByText("Jelly")).not.toBeTruthy();

    // Assert that localStorage.setItem is called with the updated list
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      "items",
      JSON.stringify([
        { id: 1, title: "Peanut Butter", isBought: false },
        { id: 3, title: "Bread", isBought: false },
      ]),
    );

    // Mock the event that the Bread has been bought
    const listItemButtons = getAllByLabelText("checkbox");
    fireEvent.click(listItemButtons[1]);
     expect(localStorageMock.setItem).toHaveBeenCalledWith(
          "items",
          JSON.stringify([
            { id: 1, title: "Peanut Butter", isBought: false },
            { id: 3, title: "Bread", isBought: true },
          ])
        );
     // Test the event that the Bread had been checked off accidentally
     fireEvent.click(listItemButtons[1]);
     expect(localStorageMock.setItem).toHaveBeenCalledWith(
        "items",
        JSON.stringify([
            { id: 1, title: "Peanut Butter", isBought: false },
            { id: 3, title: "Bread", isBought: false },
        ])
     );
  });
});

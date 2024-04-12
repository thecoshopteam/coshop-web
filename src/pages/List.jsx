import { useState, useEffect } from "react";

// MUI component imports
import Input from "@mui/material/Input";

// Local component imports
import CSList from "../components/CSList";

const List = () => {
  // Initialize listTitle state with value from local storage or default to "Untitled List"
  const [listTitle, setListTitle] = useState(() => {
    const savedTitle = localStorage.getItem("listTitle");
    return savedTitle || "Untitled List";
  });

  // Initialize dueDate state with value from local storage or default to current date
  const [dueDate, setDueDate] = useState(() => {
    const savedDueDate = localStorage.getItem("dueDate");
    return savedDueDate ? new Date(savedDueDate) : new Date();
  });

  // Handler for changing the list title
  const handleTitleChange = newValue => {
    setListTitle(newValue);
    // Update local storage directly within the onChange event
    localStorage.setItem("listTitle", newValue);
  };

  // Handler for changing the due date
  const handleDueDateChange = newDueDate => {
    setDueDate(newDueDate);
    // Update local storage with the new due date
    localStorage.setItem("dueDate", newDueDate.toISOString());
  };

  // Handler for editing the due date
  const handleEditDueDate = event => {
    const newDueDate = event.target.value
      ? new Date(event.target.value)
      : new Date(); // If the input is empty, set it to the current date
    setDueDate(newDueDate);
    localStorage.setItem("dueDate", newDueDate.toISOString());
  };

  // Get the current date
  const currentDate = new Date();

  // Format the date as "Month, day"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long", // full name of the month
    day: "numeric", // numeric day
  });

  return (
    <div className="p-5 lg:p-10">
      <h2 className="text-xl font-medium text-gray-500">{formattedDate}</h2>
      <Input
        type="text"
        value={listTitle}
        onChange={e => handleTitleChange(e.target.value)}
        disableUnderline={true}
        style={{ fontSize: "30px", fontWeight: 600 }}
      />
      <div className="mt-3 flex items-center">
        <label
          className="mr-2 text-lg font-medium text-gray-500"
          htmlFor="dueDateInput"
        >
          Due Date:
        </label>
        <input
          id="dueDateInput"
          type="date"
          value={dueDate.toISOString().split("T")[0]} // Set value in YYYY-MM-DD format
          onChange={handleEditDueDate}
          className="mt-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <CSList />
    </div>
  );
};

export default List;

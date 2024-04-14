import { useState, useEffect } from "react";
import Input from "@mui/material/Input";
import CSList from "../components/CSList";

const List = () => {
  // Initialize listTitle state with value from local storage or default to "Untitled List"
  const [listTitle, setListTitle] = useState(() => {
    const savedTitle = localStorage.getItem("listTitle");
    return savedTitle || "Untitled List";
  });

  // Initialize dueDate state and retrieve it from localStorage
  const [dueDate, setDueDate] = useState(
    () => localStorage.getItem("dueDate") || "",
  );

  // Get the current date
  const currentDate = new Date();

  // Format the date as "Month, day"
  const formattedDate = currentDate.toLocaleDateString("en-US", {
    month: "long", // full name of the month
    day: "numeric", // numeric day
  });

  // Handler for changing the list title
  const handleTitleChange = newValue => {
    setListTitle(newValue);
    // Update local storage directly within the onChange event
    localStorage.setItem("listTitle", newValue);
  };

  // Handler for changing the due date and storing it in localStorage
  const handleDueDateChange = newValue => {
    setDueDate(newValue);
    localStorage.setItem("dueDate", newValue);
  };

  // State to hold the counts
  const [remainingItemsCount, setRemainingItemsCount] = useState(
    parseInt(localStorage.getItem("remainingItemsCount")) || 0
  );
  const [totalItemsCount, setTotalItemsCount] = useState(
    parseInt(localStorage.getItem("totalItemsCount")) || 0
  );

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
      <div style={{ display: "flex", alignItems: "center", marginTop: "10px" }}>
        <span style={{ marginRight: "10px" }}>Due Date:</span>
        <Input
          type="date"
          value={dueDate}
          onChange={e => handleDueDateChange(e.target.value)}
        />
      </div>
      <div>
              <p>List items remaining: {remainingItemsCount}/{totalItemsCount}</p>
            </div>
                  <CSList
                      updateRemainingItemsCount={setRemainingItemsCount}
                      updateTotalItemsCount={setTotalItemsCount}
                  />
          </div>
  );
};

export default List;
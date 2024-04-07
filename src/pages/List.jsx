import React, { useState, useEffect } from "react";

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

  // Handler for changing the list title
  const handleTitleChange = newValue => {
    setListTitle(newValue);
    // Update local storage directly within the onChange event
    localStorage.setItem("listTitle", newValue);
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
      <Input
        type="text"
        value={listTitle}
        onChange={e => handleTitleChange(e.target.value)} // Pass only the value directly
        disableUnderline={true}
        style={{ fontSize: "30px", fontWeight: 600 }}
      />
      <h2 className="text-xl font-medium text-gray-500">{formattedDate}</h2>
      <CSList />
    </div>
  );
};

export default List;

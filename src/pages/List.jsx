import { useState } from "react";
import Input from "@mui/material/Input";
import CSList from "../components/CSList";
import IconButton from "@mui/material/IconButton";
import SvgIcon from "@mui/material/SvgIcon";

const stores = [
  {
    value: "any",
    label: "Any Store",
  },
  {
    value: "aldi",
    label: "Aldi",
  },
  {
    value: "costco",
    label: "Costco",
  },
  {
    value: "kroger",
    label: "Kroger",
  },
  {
    value: "publix",
    label: "Publix",
  },
  {
    value: "safeway",
    label: "Safeway",
  },
  {
    value: "target",
    label: "Target",
  },
  {
    value: "trader joes",
    label: "Trader Joes",
  },
  {
    value: "walmart",
    label: "Walmart",
  },
  {
    value: "whole foods",
    label: "Whole Foods",
  },
];

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
    parseInt(localStorage.getItem("remainingItemsCount")) || 0,
  );
  const [totalItemsCount, setTotalItemsCount] = useState(
    parseInt(localStorage.getItem("totalItemsCount")) || 0,
  );

  const [store, setStore] = useState(localStorage.getItem("store") || "");

  const handleStoreChange = newValue => {
    setStore(newValue);
    localStorage.setItem("store", newValue);
  };

  return (
    <div className="mt-10 flex min-h-svh items-start justify-center sm:mt-40">
      <div>
        <h2 className="text-xl font-medium text-gray-500">
          Today is {formattedDate}
        </h2>
        <Input
          type="text"
          value={listTitle}
          onChange={e => handleTitleChange(e.target.value)}
          disableUnderline={true}
          style={{ fontSize: "30px", fontWeight: 600 }}
        />
        <div className="flex items-center gap-[2px]">
          <span>Due date:</span>
          <Input
            type="date"
            value={dueDate}
            onChange={e => handleDueDateChange(e.target.value)}
            disableUnderline
          />
        </div>
        <div className="flex items-center">
          <span>Buy at:</span>
          <select
            className="ml-1 bg-transparent"
            onChange={e => handleStoreChange(e.target.value)}
            value={store}
          >
            {stores.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {store && store !== "any" && (
            <IconButton
              aria-label="directions"
              color="primary"
              href={`https://www.google.com/maps/search/${store}`}
              target="_blank"
            >
              <SvgIcon>
                <svg
                  height="2500"
                  viewBox="14.32 4.87961494 37.85626587 52.79038506"
                  width="2500"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="m37.34 7.82c-1.68-.53-3.48-.82-5.34-.82-5.43 0-10.29 2.45-13.54 6.31l8.35 7.02z"
                    fill="#1a73e8"
                  />
                  <path
                    d="m18.46 13.31a17.615 17.615 0 0 0 -4.14 11.36c0 3.32.66 6.02 1.75 8.43l10.74-12.77z"
                    fill="#ea4335"
                  />
                  <path
                    d="m32 17.92a6.764 6.764 0 0 1 5.16 11.13l10.52-12.51a17.684 17.684 0 0 0 -10.35-8.71l-10.51 12.51a6.74 6.74 0 0 1 5.18-2.42"
                    fill="#4285f4"
                  />
                  <path
                    d="m32 31.44c-3.73 0-6.76-3.03-6.76-6.76a6.7 6.7 0 0 1 1.58-4.34l-10.75 12.77c1.84 4.07 4.89 7.34 8.03 11.46l13.06-15.52a6.752 6.752 0 0 1 -5.16 2.39"
                    fill="#fbbc04"
                  />
                  <path
                    d="m36.9 48.8c5.9-9.22 12.77-13.41 12.77-24.13 0-2.94-.72-5.71-1.99-8.15l-23.57 28.05c1 1.31 2.01 2.7 2.99 4.24 3.58 5.54 2.59 8.86 4.9 8.86s1.32-3.33 4.9-8.87"
                    fill="#34a853"
                  />
                </svg>
              </SvgIcon>
            </IconButton>
          )}
        </div>
        <p>
          Items remaining: {remainingItemsCount}/{totalItemsCount}
        </p>

        <CSList
          updateRemainingItemsCount={setRemainingItemsCount}
          updateTotalItemsCount={setTotalItemsCount}
          updateListTitle={setListTitle}
          updateDueDate={setDueDate}
        />
      </div>
    </div>
  );
};

export default List;

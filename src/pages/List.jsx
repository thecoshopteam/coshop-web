import { useState } from "react";
import Input from "@mui/material/Input";
import CSList from "../components/CSList";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const stores = [
  { value: "any", label: "Any Store" },
  { value: "aldi", label: "Aldi" },
  { value: "costco", label: "Costco" },
  { value: "kroger", label: "Kroger" },
  { value: "publix", label: "Publix" },
  { value: "safeway", label: "Safeway" },
  { value: "target", label: "Target" },
  { value: "trader joes", label: "Trader Joes" },
  { value: "walmart", label: "Walmart" },
  { value: "whole foods", label: "Whole Foods" },
];

const List = () => {
  // State to manage multiple lists
  const [lists, setLists] = useState(() => {
    const savedLists = localStorage.getItem("lists");
    const initialLists = savedLists ? JSON.parse(savedLists) : [];
    return initialLists.map(list => ({
      ...list,
      history: list.history || [],
      remainingItemsCount: list.items.filter(item => !item.isBought).length, // Calculate remaining items count
      totalItemsCount: list.items.length, // Calculate total items count
    }));
  });
  const [currentListIndex, setCurrentListIndex] = useState(0);

  // Get current list or a default list structure if none exist
  const currentList = lists[currentListIndex] || {
    title: "Untitled List",
    dueDate: "",
    items: [],
    remainingItemsCount: 0,
    totalItemsCount: 0,
    store: "",
  };

  // Update local storage
  const updateLocalStorage = updatedLists => {
    localStorage.setItem("lists", JSON.stringify(updatedLists));
  };

  // Handler for changing the list title
  const handleTitleChange = newValue => {
    const updatedLists = lists.map((list, index) => {
      if (index === currentListIndex) {
        return { ...list, title: newValue };
      }
      return list;
    });
    setLists(updatedLists);
    updateLocalStorage(updatedLists);
  };

  // Handler for changing the due date
  const handleDueDateChange = newValue => {
    const updatedLists = lists.map((list, index) => {
      if (index === currentListIndex) {
        return { ...list, dueDate: newValue };
      }
      return list;
    });
    setLists(updatedLists);
    updateLocalStorage(updatedLists);
  };

  // Handler for changing the store
  const handleStoreChange = newValue => {
    const updatedLists = lists.map((list, index) => {
      if (index === currentListIndex) {
        return { ...list, store: newValue };
      }
      return list;
    });
    setLists(updatedLists);
    updateLocalStorage(updatedLists);
  };

  // Handler for list selection change
  const handleListChange = index => {
    setCurrentListIndex(index);
  };

  // Add a new list
  const handleAddList = () => {
    const newList = {
      title: "Untitled List",
      dueDate: "",
      items: [],
      remainingItemsCount: 0,
      totalItemsCount: 0,
      store: "",
      history: [], // Initialize history when adding a new list
    };
    const updatedLists = [...lists, newList];
    setLists(updatedLists);
    updateLocalStorage(updatedLists);
  };

  const handleDeleteList = () => {
    if (lists.length === 1) {
      alert("You cannot delete the last list.");
      return;
    }

    const confirmation = window.confirm(
      "Are you sure you want to delete this list?",
    );
    if (confirmation) {
      const updatedLists = lists.filter(
        (list, index) => index !== currentListIndex,
      );
      setLists(updatedLists);
      updateLocalStorage(updatedLists);
      setCurrentListIndex(0); // Reset to the first list after deletion
    }
  };

  return (
    <div className="mt-10 flex min-h-svh items-start justify-center sm:mt-40">
      <div>
        <div>
          {lists.map((list, index) => (
            <Button key={index} onClick={() => handleListChange(index)}>
              {list.title}
            </Button>
          ))}
          <Button onClick={handleAddList}>
            <AddIcon /> Add New List
          </Button>
          <Button onClick={handleDeleteList}>Delete Current List</Button>
        </div>
        <h2 className="text-xl font-medium text-gray-500">
          Today is{" "}
          {new Date().toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
          })}
        </h2>
        <Input
          type="text"
          value={currentList.title}
          onChange={e => handleTitleChange(e.target.value)}
          disableUnderline={true}
          style={{ fontSize: "30px", fontWeight: 600 }}
        />
        <div className="flex items-center gap-[2px]">
          <span>Due date:</span>
          <Input
            type="date"
            value={currentList.dueDate}
            onChange={e => handleDueDateChange(e.target.value)}
            disableUnderline
          />
        </div>
        <div className="flex items-center">
          <span>Buy at:</span>
          <select
            className="ml-1 bg-transparent"
            onChange={e => handleStoreChange(e.target.value)}
            value={currentList.store}
          >
            {stores.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <p>
          Items remaining: {currentList.remainingItemsCount}/
          {currentList.totalItemsCount}
        </p>
        <CSList
          list={currentList}
          updateList={updatedList => {
            const updatedLists = lists.map((list, index) =>
              index === currentListIndex ? updatedList : list,
            );
            setLists(updatedLists);
            updateLocalStorage(updatedLists);
          }}
        />
      </div>
    </div>
  );
};

export default List;

import { useState} from "react";

// MUI component imports
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";

// Local component imports
import CSListItem from "./CSListItem";
import HistoryListItem from "./HistoryListItem";

const CSList = () => {
  // Initialize state for items and history
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || [],
  );
  const [history, setHistory] = useState(
    JSON.parse(localStorage.getItem("history")) || [],
  );
  const [newItemTitle, setNewItemTitle] = useState("");
  const [showHistory, setShowHistory] = useState(
    localStorage.getItem("showHistory") === "true" || false,
  );

  const updateShowHistory = value => {
    setShowHistory(value);
    localStorage.setItem("showHistory", value);
  };

  const handleCheckboxToggle = id => {
    const updatedList = items.map(item =>
      item.id === id ? { ...item, isBought: !item.isBought } : item,
    );
    updateList(updatedList);
  };

  const handleAddItem = event => {
    event.preventDefault();
    if (newItemTitle.trim() !== "") {
      // Convert both the new item title and existing item titles to lowercase and remove spaces
      const newItemTitleNormalized = newItemTitle
        .trim()
        .toLowerCase()
        .replace(/\s/g, "");
      const existingItem = items.find(
        item =>
          item.title.trim().toLowerCase().replace(/\s/g, "") ===
          newItemTitleNormalized,
      );

      if (existingItem) {
        // If the item already exists, ask the user if they want to add it again
        const confirmation = window.confirm(
          "This item already exists in the list. Do you still want to add it?",
        );
        if (!confirmation) {
          // If the user cancels, return without adding the duplicate item
          return;
        }
      }
      const newItem = {
        id: Date.now(), // Use a timestamp for a unique ID
        title: newItemTitle,
        isBought: false,
      };
      const updatedList = [newItem, ...items];
      updateList(updatedList);
      setNewItemTitle("");
    }
  };

  const handleArchiveItem = id => {
    const itemToArchive = items.find(item => item.id === id);
    if (itemToArchive) {
      // Remove from items list
      const updatedList = items.filter(item => item.id !== id);
      updateList(updatedList);

      // Add to history list
      const updatedHistoryList = [itemToArchive, ...history];
      setHistory(updatedHistoryList);
      localStorage.setItem("history", JSON.stringify(updatedHistoryList));
    }
  };

  const updateList = updatedList => {
    setItems(updatedList);
    localStorage.setItem("items", JSON.stringify(updatedList));
  };

  const addItemFromHistory = id => {
    // Find the item in history list
    const itemToAdd = history.find(item => item.id === id);

    if (itemToAdd) {
      // Reset the isBought property to false
      const newItemToAdd = { ...itemToAdd, isBought: false };

      // Remove item from history
      const updatedHistoryList = history.filter(item => item.id !== id);
      setHistory(updatedHistoryList);
      localStorage.setItem("history", JSON.stringify(updatedHistoryList));

      // Add item back to main list
      const updatedItemsList = [...items, newItemToAdd];
      updateList(updatedItemsList);
    }
  };

  return (
    <div>
      <form className="my-8 flex items-center gap-4" onSubmit={handleAddItem}>
        <Input
          type="text"
          placeholder="Enter item title"
          value={newItemTitle}
          onChange={e => setNewItemTitle(e.target.value)}
        />
        <Button type="submit" variant="contained" endIcon={<AddIcon />}>
          Add Item
        </Button>
      </form>
      <List className="w-full max-w-md">
        {items.map(item => (
          <CSListItem
            key={item.id}
            handleCheckboxToggle={() => handleCheckboxToggle(item.id)}
            handleArchiveItem={() => handleArchiveItem(item.id)}
            handleUpdateItemTitle={updatedItemTitle =>
              handleUpdateItemTitle(item.id, updatedItemTitle)
            }
            {...item}
          />
        ))}
      </List>
      <Button
        onClick={() => updateShowHistory(!showHistory)}
        variant="text"
        endIcon={showHistory ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {showHistory ? "Hide Archived Items" : "Show Archived Items"}
      </Button>
      {showHistory && (
        <>
          <List className="w-full max-w-md">
            {history.map(item => (
              <HistoryListItem
                key={item.id}
                handleAddItem={() => addItemFromHistory(item.id)}
                {...item}
              />
            ))}
          </List>
        </>
      )}
    </div>
  );
};

export default CSList;

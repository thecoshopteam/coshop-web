import React, { useState } from "react";

// MUI component imports
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

// Local component imports
import CSListItem from "./CSListItem";

const CSList = () => {
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const [items, setItems] = useState(storedItems);
  const [newItemTitle, setNewItemTitle] = useState("");

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
        id: items.length + 1,
        title: newItemTitle,
        isBought: false,
      };
      const updatedList = [...items, newItem];
      updateList(updatedList);
      setNewItemTitle("");
    }
  };

  const handleDeleteItem = id => {
    const updatedList = items.filter(item => item.id !== id);
    updateList(updatedList);
  };

  const updateList = updatedList => {
    setItems(updatedList);
    localStorage.setItem("items", JSON.stringify(updatedList));
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
            handleDeleteItem={() => handleDeleteItem(item.id)}
            {...item}
          />
        ))}
      </List>
    </div>
  );
};

export default CSList;

import React, { useState } from "react";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import CSListItem from "./CSListItem";
import AddIcon from "@mui/icons-material/Add";

const CSList = () => {
  const storedItems = JSON.parse(localStorage.getItem("items")) || [];
  const [items, setItems] = useState(storedItems);
  const [newItemTitle, setNewItemTitle] = useState("");

  const handleCheckboxToggle = (id) => {
    const updatedList = items.map((item) =>
      item.id === id ? { ...item, isBought: !item.isBought } : item,
    );
    updateList(updatedList);
  };

  const handleAddItem = () => {
    if (newItemTitle.trim() !== "") {
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

  const handleDeleteItem = (id) => {
    const updatedList = items.filter((item) => item.id !== id);
    updateList(updatedList);
  };

  const updateList = (updatedList) => {
    setItems(updatedList);
    localStorage.setItem("items", JSON.stringify(updatedList));
  };

  return (
    <div>
      <div className="my-8 flex items-center gap-4">
        <Input
          type="text"
          placeholder="Enter item title"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
        />
        <Button
          variant="contained"
          endIcon={<AddIcon />}
          onClick={handleAddItem}
        >
          Add Item
        </Button>
      </div>
      <List className="w-full max-w-md">
        {items.map((item) => (
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

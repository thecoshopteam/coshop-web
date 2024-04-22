import { useState } from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CSListItem from "./CSListItem";
import HistoryListItem from "./HistoryListItem";

const CSList = ({
  updateRemainingItemsCount,
  updateTotalItemsCount,
  updateListTitle,
  updateDueDate,
}) => {
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

  const handleUpdateItemTitle = (id, updatedItemTitle) => {
    const updatedList = items.map(item =>
      item.id === id ? { ...item, title: updatedItemTitle } : item,
    );
    updateList(updatedList);
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

    // Update the counts after updating the list
    const remainingItemsCount = updatedList.filter(
      item => !item.isBought,
    ).length;
    const totalItemsCount = updatedList.length;
    updateRemainingItemsCount(remainingItemsCount);
    localStorage.setItem("remainingItemsCount", remainingItemsCount);
    updateTotalItemsCount(totalItemsCount);
    localStorage.setItem("totalItemsCount", totalItemsCount);
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

  function shoppingListPrinter() {
    const canvas = document.createElement("canvas");
    canvas.width = 360;
    canvas.height = 800;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the title
    const title = "Shopping List";
    const titleFontSize = 32;
    ctx.font = `${titleFontSize}px Inter`;
    ctx.fillStyle = "blue";
    ctx.fillText(title, 10, titleFontSize);

    // Draw the items with Inter font
    const items = JSON.parse(localStorage.getItem("items") || "[]");
    const itemFontSize = 24;
    ctx.font = `${itemFontSize}px Inter`; // Set the font to Inter
    let y = titleFontSize * 2 + 20;
    ctx.fillStyle = "black";
    items.forEach(item => {
      ctx.fillText("- " + item.title, 10, y);
      y += itemFontSize * 1.5;
    });

    // Load the logo image
    const logo = new Image();
    logo.src = "/coshop.png";
    logo.onload = function () {
      // Draw the logo onto the canvas at the center
      const logoWidth = 160;
      const logoHeight = 210;
      const logoX = (canvas.width - logoWidth) / 2; // Center horizontally
      const logoY = (canvas.height - logoHeight) / 2; // Center vertically
      ctx.globalAlpha = 0.5; // Set the opacity of the logo (0.5 for 50% transparency)
      ctx.drawImage(logo, logoX, logoY, logoWidth, logoHeight); // Draw the logo
      ctx.globalAlpha = 1.0; // Reset the global alpha to 1

      // Convert the canvas to data URL and initiate download
      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = "ShoppingList.png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    };
  }

  function clearArchivedList() {
    localStorage.removeItem("history");
    setHistory([]);
  }

  function clearList() {
    localStorage.clear();
    setHistory([]);
    setItems([]);
    setNewItemTitle("");
    updateRemainingItemsCount(0);
    updateTotalItemsCount(0);
    updateListTitle("Untitled List");
    updateDueDate("");
    setShowHistory(false);
  }

  return (
    <div>
      <form className="my-4 flex flex-col gap-4" onSubmit={handleAddItem}>
        <div className="flex gap-2">
          <Input
            autoFocus
            type="text"
            placeholder="Enter item name"
            value={newItemTitle}
            onChange={e => setNewItemTitle(e.target.value)}
            required
          />
          <Tooltip title="Add item to list">
            <Button type="submit" variant="contained">
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        <div className="flex gap-2">
          <Tooltip title="Reset entire list">
            <Button
              type="button"
              onClick={clearList}
              variant="outlined"
              endIcon={<ClearIcon />}
            >
              Reset List
            </Button>
          </Tooltip>
          <Tooltip title="Download list as image">
            <Button
              onClick={() => shoppingListPrinter()}
              type="button"
              variant="contained"
              endIcon={<CloudDownloadIcon />}
            >
              Download
            </Button>
          </Tooltip>
        </div>
      </form>
      <List>
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
      <div className="mt-2 flex gap-2">
        {history.length > 0 && (
          <Button
            onClick={() => updateShowHistory(!showHistory)}
            variant="outlined"
            endIcon={showHistory ? <VisibilityOffIcon /> : <VisibilityIcon />}
          >
            {showHistory ? "Hide Archived Items" : "Show Archived Items"}
          </Button>
        )}

        {history.length > 0 && (
          <Button
            onClick={clearArchivedList}
            variant="contained"
            endIcon={<ClearIcon />}
          >
            Clear Archived List
          </Button>
        )}
      </div>
      {showHistory && (
        <>
          <List>
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

CSList.propTypes = {
  updateRemainingItemsCount: PropTypes.func.isRequired,
  updateTotalItemsCount: PropTypes.func.isRequired,
  updateListTitle: PropTypes.func.isRequired,
  updateDueDate: PropTypes.func.isRequired,
};

export default CSList;

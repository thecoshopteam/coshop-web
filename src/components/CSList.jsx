import { useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import List from "@mui/material/List";
import Input from "@mui/material/Input";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CSListItem from "./CSListItem";
import HistoryListItem from "./HistoryListItem";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import DeleteIcon from "@mui/icons-material/Delete";

const CSList = ({ list, updateList }) => {
  const [newItemTitle, setNewItemTitle] = useState("");
  const [showHistory, setShowHistory] = useState(false);

  const handleAddItem = event => {
    event.preventDefault();
    if (newItemTitle.trim() !== "") {
      const newItemTitleNormalized = newItemTitle
        .trim()
        .toLowerCase()
        .replace(/\s/g, "");
      const existingItem = list.items.find(
        item =>
          item.title.trim().toLowerCase().replace(/\s/g, "") ===
          newItemTitleNormalized,
      );

      if (existingItem) {
        const confirmation = window.confirm(
          "This item already exists in the list. Do you still want to add it?",
        );
        if (!confirmation) {
          return;
        }
      }

      const newItem = {
        id: Date.now(),
        title: newItemTitle,
        quantity: 1,
        isBought: false,
        category: "",
      };

      const updatedItems = [newItem, ...list.items];
      const newRemainingCount = updatedItems.filter(
        item => !item.isBought,
      ).length;
      const newTotalItemsCount = updatedItems.length;

      updateList({
        ...list,
        items: updatedItems,
        remainingItemsCount: newRemainingCount,
        totalItemsCount: newTotalItemsCount,
        history: list.history || [],
      });
      setNewItemTitle("");
    }
  };

  const handleItemUpdate = (id, updatedFields) => {
    const updatedItems = list.items.map(item =>
      item.id === id ? { ...item, ...updatedFields } : item,
    );
    const newRemainingCount = updatedItems.filter(
      item => !item.isBought,
    ).length;
    const newTotalItemsCount = updatedItems.length;

    updateList({
      ...list,
      items: updatedItems,
      remainingItemsCount: newRemainingCount,
      totalItemsCount: newTotalItemsCount,
      history: list.history || [],
    });
  };

  const handleArchiveItem = id => {
    const itemToArchive = list.items.find(item => item.id === id);
    if (itemToArchive) {
      const updatedItems = list.items.filter(item => item.id !== id);
      const updatedHistory = [itemToArchive, ...(list.history || [])];
      const newRemainingCount = updatedItems.filter(
        item => !item.isBought,
      ).length;
      const newTotalItemsCount = updatedItems.length;

      updateList({
        ...list,
        items: updatedItems,
        remainingItemsCount: newRemainingCount,
        totalItemsCount: newTotalItemsCount,
        history: updatedHistory,
      });
    }
  };

  const toggleHistoryVisibility = () => {
    setShowHistory(!showHistory);
  };

  const addItemFromHistory = id => {
    const itemToAddBack = (list.history || []).find(item => item.id === id);
    if (itemToAddBack) {
      const updatedHistory = (list.history || []).filter(
        item => item.id !== id,
      );
      const updatedItems = [
        ...list.items,
        { ...itemToAddBack, isBought: false },
      ];
      updateList({ ...list, items: updatedItems, history: updatedHistory });
    }
  };

  const clearArchivedList = () => {
    updateList({ ...list, history: [] });
  };

  const handleResetList = () => {
    const emptyList = {
      ...list,
      items: [],
      remainingItemsCount: 0,
      totalItemsCount: 0,
      history: [],
    };
    updateList(emptyList);
  };

  function shoppingListPrinter(currentList) {
    const canvas = document.createElement("canvas");
    canvas.width = 360;
    canvas.height = 800;

    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const titleFontSize = 32;
    ctx.font = `${titleFontSize}px Inter`;
    ctx.fillStyle = "blue";
    ctx.fillText(title, 10, titleFontSize);

    // Draw the items with Inter font
    const items = currentList.items || [];
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

  const handleDownloadList = () => {
    shoppingListPrinter(list);
  };

  const handleUpdateItemCategory = (id, category) => {
    const updatedItems = list.items.map(item =>
      item.id === id ? { ...item, category } : item,
    );
    updateList({
      ...list,
      items: updatedItems,
    });
  };

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
            <Button
              type="submit"
              variant="contained"
              data-testid="add-item-button"
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>

        <div className="flex gap-2">
          <Tooltip title="Reset entire list">
            <Button
              onClick={handleResetList}
              variant="outlined"
              color="primary"
            >
              Reset List
            </Button>
          </Tooltip>
          <Tooltip title="Download list as image">
            <Button
              onClick={handleDownloadList}
              variant="contained"
              endIcon={<CloudDownloadIcon />}
            >
              Download
            </Button>
          </Tooltip>
        </div>
      </form>
      <List>
        {list.items.map(item => (
          <CSListItem
            key={item.id}
            {...item}
            handleUpdateItemTitle={updatedTitle =>
              handleItemUpdate(item.id, { title: updatedTitle })
            }
            handleUpdateItemQuantity={updatedQuantity =>
              handleItemUpdate(item.id, { quantity: updatedQuantity })
            }
            handleUpdateItemIsBought={() =>
              handleItemUpdate(item.id, { isBought: !item.isBought })
            }
            handleArchiveItem={() => handleArchiveItem(item.id)}
            handleUpdateItemCategory={category =>
              handleUpdateItemCategory(item.id, category)
            }
          />
        ))}
      </List>
      <div className="mt-2 flex gap-2">
        {list.history && list.history.length > 0 && (
          <Button
            onClick={toggleHistoryVisibility}
            variant="outlined"
            endIcon={showHistory ? <VisibilityOffIcon /> : <VisibilityIcon />}
          >
            {showHistory ? "Hide Archived Items" : "Show Archived Items"}
          </Button>
        )}

        {list.history && list.history.length > 0 && (
          <Button
            onClick={clearArchivedList}
            variant="contained"
            endIcon={<ClearIcon />}
          >
            Clear Archived List
          </Button>
        )}
      </div>
      {showHistory && list.history && (
        <List>
          {list.history.map(item => (
            <HistoryListItem
              key={item.id}
              {...item}
              handleAddItem={() => addItemFromHistory(item.id)}
            />
          ))}
        </List>
      )}
    </div>
  );
};

CSList.propTypes = {
  list: PropTypes.object.isRequired,
  updateList: PropTypes.func.isRequired,
};

export default CSList;

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

// MUI component imports
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InventoryIcon from "@mui/icons-material/Inventory";
import TextField from "@mui/material/TextField";

const CSListItem = ({
  id,
  title,
  isBought,
  handleCheckboxToggle,
  handleArchiveItem,
}) => {
  const [localQuantity, setLocalQuantity] = useState(() => {
    return parseInt(localStorage.getItem(`quantity_${id}`), 10) || 1;
  });

  useEffect(() => {
    localStorage.setItem(`quantity_${id}`, localQuantity.toString());
  }, [id, localQuantity]);

  const handleChange = event => {
    const newQuantity = event.target.value;
    setLocalQuantity(newQuantity);
  };

  const handleQuantityFieldClick = event => {
    // Prevent propagation of click events from the quantity input field
    event.stopPropagation();
  };

  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleArchiveItem}>
          <InventoryIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        aria-label="checkbox"
        dense
        onClick={handleCheckboxToggle}
      >
        <ListItemIcon>
          <Checkbox
            edge="start"
            checked={isBought}
            tabIndex={-1}
            inputProps={{ "aria-labelledby": id }}
          />
        </ListItemIcon>
        <ListItemText
          id={id}
          primary={title}
          style={{
            textDecoration: isBought ? "line-through" : "none",
            color: isBought ? "gray" : "inherit",
          }}
        />
        <TextField
          type="number"
          value={localQuantity}
          onChange={handleChange}
          onClick={handleQuantityFieldClick} // Prevents click propagation
          label="Quantity"
          inputProps={{ min: 1 }}
          sx={{ width: "120px" }}
        />
      </ListItemButton>
    </ListItem>
  );
};

CSListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isBought: PropTypes.bool.isRequired,
  handleCheckboxToggle: PropTypes.func.isRequired,
  handleArchiveItem: PropTypes.func.isRequired,
};

export default CSListItem;

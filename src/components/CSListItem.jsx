import React, { useState } from "react";
import PropTypes from "prop-types";

// MUI component imports
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";

const CSListItem = ({
  id,
  title,
  isBought,
  quantity,
  handleCheckboxToggle,
  handleDeleteItem,
  handleQuantityChange,
}) => {
  const [localQuantity, setLocalQuantity] = useState(quantity);

  const handleChange = (event) => {
    const newQuantity = event.target.value;
    setLocalQuantity(newQuantity);
    handleQuantityChange(newQuantity);
  };

  const handleListItemButtonClick = (event) => {
    if (!event.target.closest('input[type="number"]')) {
      handleCheckboxToggle();
    }
  };

  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="delete" onClick={handleDeleteItem}>
          <DeleteIcon />
        </IconButton>
      }
      disablePadding
    >
      <ListItemButton
        role={undefined}
        aria-label="checkbox"
        dense
        onClick={handleListItemButtonClick}
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
  quantity: PropTypes.number.isRequired,
  handleCheckboxToggle: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  handleQuantityChange: PropTypes.func.isRequired,
};

export default CSListItem;

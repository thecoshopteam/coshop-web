import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Input from "@mui/material/Input";
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
  handleUpdateItemTitle,
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
      className="py-2"
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isBought}
          inputProps={{ "aria-labelledby": id }}
          onChange={handleCheckboxToggle}
        />
      </ListItemIcon>
      <Input
        id={id}
        defaultValue={title}
        style={{
          textDecoration: isBought ? "line-through" : "none",
          color: isBought ? "gray" : "inherit",
        }}
        disableUnderline={true}
        disabled={isBought}
        onChange={e => handleUpdateItemTitle(e.target.value)}
      />
      <TextField
        type="number"
        value={localQuantity}
        onChange={handleChange}
        onClick={handleQuantityFieldClick} // Prevents click propagation
        label="Quantity"
        size="small"
        sx={{ width: "100px" }}
      />
    </ListItem>
  );
};

CSListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isBought: PropTypes.bool.isRequired,
  handleCheckboxToggle: PropTypes.func.isRequired,
  handleArchiveItem: PropTypes.func.isRequired,
  handleUpdateItemTitle: PropTypes.func.isRequired,
};

export default CSListItem;

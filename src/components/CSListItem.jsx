import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Input from "@mui/material/Input";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import InventoryIcon from "@mui/icons-material/Inventory";
import TextField from "@mui/material/TextField";
import React from "react";

const CSListItem = ({
  id,
  title,
  quantity,
  isBought,
  specialInstructions,
  category,
  handleUpdateItemTitle,
  handleUpdateItemQuantity,
  handleUpdateItemIsBought,
  handleArchiveItem,
  handleUpdateSpecialInstructions,
  handleUpdateItemCategory,
}) => {
  return (
    <ListItem key={id} disablePadding className="py-2" alignItems="center">
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={isBought}
          inputProps={{ "aria-labelledby": id }}
          onChange={handleUpdateItemIsBought}
        />
      </ListItemIcon>
      <Input
        id={`item-title-${id}`}
        defaultValue={title}
        onBlur={e => handleUpdateItemTitle(e.target.value)}
        style={{
          textDecoration: isBought ? "line-through" : "none",
          color: isBought ? "gray" : "inherit",
          width: "160px",
        }}
        disableUnderline={true}
        disabled={isBought}
        sx={{ flex: 1 }}
      />
      <TextField
        id={`item-special-instructions-${id}`}
        label="Special Instructions"
        value={specialInstructions}
        onChange={e => handleUpdateSpecialInstructions(e.target.value)}
        variant="outlined"
        sx={{ width: "160px", marginRight: "8px" }}
        margin="dense"
        size="small"
      />
      <select
        value={category}
        onChange={e => handleUpdateItemCategory(e.target.value)}
        style={{
          width: "160px",
          marginRight: "8px",
          backgroundColor: "white",
          color: "gray",
        }}
      >
        <option value="">Select category...</option>
        <option value="Fruits">Fruits</option>
        <option value="Vegetables">Vegetables</option>
        <option value="Canned Goods">Canned Goods</option>
        <option value="Dairy">Dairy</option>
        <option value="Meat">Meat</option>
        <option value="Seafood">Seafood</option>
        <option value="Deli">Deli</option>
        <option value="Condiments/Spices">Condiments/Spices</option>
        <option value="Snacks">Snacks</option>
        <option value="Bread & Bakery">Bread & Bakery</option>
        <option value="Beverages">Beverages</option>
        <option value="Pasta, Rice & Cereal">Pasta, Rice & Cereal</option>
        <option value="Baking">Baking</option>
        <option value="Frozen Foods">Frozen Foods</option>
        <option value="Personal Care">Personal Care</option>
        <option value="Health Care">Health Care</option>
        <option value="Household Supplies">Household Supplies</option>
        <option value="Baby Items">Baby Items</option>
        <option value="Pet Care">Pet Care</option>
      </select>
      <TextField
        id={`item-quantity-${id}`}
        data-testid={`item-quantity-input-${id}`}
        type="number"
        defaultValue={quantity}
        onBlur={e => handleUpdateItemQuantity(parseInt(e.target.value))}
        label="Quantity"
        size="small"
        sx={{ width: "80px", marginRight: "8px" }}
        InputProps={{ inputProps: { min: 1 } }}
      />
      <IconButton
        edge="end"
        aria-label="archive"
        onClick={() => handleArchiveItem()}
      >
        <InventoryIcon />
      </IconButton>
    </ListItem>
  );
};

CSListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired,
  isBought: PropTypes.bool.isRequired,
  category: PropTypes.string,
  handleUpdateItemTitle: PropTypes.func.isRequired,
  handleUpdateItemQuantity: PropTypes.func.isRequired,
  handleUpdateItemIsBought: PropTypes.func.isRequired,
  handleArchiveItem: PropTypes.func.isRequired,
  handleUpdateItemCategory: PropTypes.func.isRequired,
};

export default CSListItem;

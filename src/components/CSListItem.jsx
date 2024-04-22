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
  quantity,
  isBought,
  handleUpdateItemTitle,
  handleUpdateItemQuantity,
  handleUpdateItemIsBought,
  handleArchiveItem,
}) => {
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
          onChange={handleUpdateItemIsBought}
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
        value={quantity}
        onChange={e => handleUpdateItemQuantity(e.target.value)}
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
  quantity: PropTypes.number.isRequired,
  isBought: PropTypes.bool.isRequired,
  handleUpdateItemTitle: PropTypes.func.isRequired,
  handleUpdateItemQuantity: PropTypes.func.isRequired,
  handleUpdateItemIsBought: PropTypes.func.isRequired,
  handleArchiveItem: PropTypes.func.isRequired,
};

export default CSListItem;

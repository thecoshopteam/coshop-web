import React from "react";
import PropTypes from "prop-types";

// MUI component imports
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

const CSListItem = ({
  id,
  title,
  isBought,
  handleCheckboxToggle,
  handleDeleteItem,
}) => {
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
      </ListItemButton>
    </ListItem>
  );
};

CSListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isBought: PropTypes.bool.isRequired,
  handleCheckboxToggle: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
};

export default CSListItem;

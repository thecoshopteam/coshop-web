import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";

const HistoryListItem = ({ id, title, handleAddItem }) => {
  return (
    <ListItem
      key={id}
      secondaryAction={
        <IconButton edge="end" aria-label="add" onClick={handleAddItem}>
          <AddIcon />
        </IconButton>
      }
      disablePadding
      className="py-2"
    >
      <ListItemText
        id={id}
        primary={title}
        style={{
          color: "gray",
        }}
      />
    </ListItem>
  );
};

HistoryListItem.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleAddItem: PropTypes.func.isRequired,
};

export default HistoryListItem;

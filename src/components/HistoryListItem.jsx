import PropTypes from "prop-types";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Tooltip from "@mui/material/Tooltip";

const HistoryListItem = ({ id, title, handleAddItem }) => {
  return (
    <ListItem
      key={id}
      secondaryAction={
        <Tooltip title="Re-add to list">
          <IconButton edge="end" aria-label="re-add" onClick={handleAddItem}>
            <AddIcon />
          </IconButton>
        </Tooltip>
      }
      disablePadding
      className="py-2"
    >
      <ListItemText
        id={`history-item-${id}`}
        primary={title}
        style={{
          color: "gray", // style for archived items to indicate they are not active
          textDecoration: "line-through" // optional: you can show it as crossed out if that fits the UI better
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

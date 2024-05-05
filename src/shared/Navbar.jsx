import * as React from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Switch from "@mui/material/Switch";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Divider from "@mui/material/Divider";
import ContactsIcon from "@mui/icons-material/Contacts"; // Added ContactsIcon
import { useTheme } from "../context/themeContent";

const Navbar = () => {
  const { logoutUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const { switchTheme } = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Tooltip title="Go to list">
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="home"
              sx={{ mr: 2 }}
              href="/"
            >
              <ListAltIcon />
            </IconButton>
          </Tooltip>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <a href="/">CoShop</a>
          </Typography>
          <Switch onChange={switchTheme} /> {/* Moved Switch component */}
          <Tooltip title="Go to Contacts">
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="contacts"
              sx={{ mr: 2 }}
              onClick={() => navigate("/contacts")}
            >
              <ContactsIcon />
            </IconButton>
          </Tooltip>
          <div>
            <Tooltip title="Go to profile">
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <a href="/profile">
                <MenuItem>Profile</MenuItem>
              </a>
              <a href="mailto:hello@shopwithcoshop.com">
                <MenuItem>Report a Bug</MenuItem>
              </a>
              <Divider />
              <MenuItem onClick={handleSignOut}>Log Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;

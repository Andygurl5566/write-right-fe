import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import "./DropDownMenu.css";

// This component accepts an icon and menuOptions. MenuOptions can be a list of
function DropDownMenu({ icon, menuOptions = [] }) {
  const id = React.useId();
  const buttonId = `${id}-button`;
  const menuId = `${id}-menu`;
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  // manage opening and closing menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // closes the dropdown menu when the screen is resized
  React.useEffect(() => {
    const handleResize = () => {
      setAnchorEl(null);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <Button
        id={buttonId}
        aria-controls={open ? menuId : undefined}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={handleClick}
      >
        {icon}
      </Button>
      <Menu
        className="drop-down-menu"
        id={menuId}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transitionDuration={0}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        slotProps={{
          list: {
            "aria-labelledby": buttonId,
          },
        }}
      >
        {menuOptions.map((menuItem) => (
          <MenuItem
            className="drop-down-menu-item"
            key={menuItem}
            onClick={handleClose}
            sx={{
              color: "#555555",
              "&:hover": {
                color: "#5555",
                backgroundColor: "#6d28d9",
                color: "white",
              },
            }}
          >
            {menuItem}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default DropDownMenu;

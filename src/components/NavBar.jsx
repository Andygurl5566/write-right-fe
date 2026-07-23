import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

import LanguageSelectionDropdown from "./LanguageSelectionDropdown";
import DropDownMenu from "./DropDownMenu";
import "./Navbar.css";

function Navbar({ setNativeLanguage }) {
  return (
    <div className="navbar">
      <Stack direction="row" spacing={2}>
        <span className="logo-icon">✍️</span>
        <span className="logo-text">WriteRight</span>
      </Stack>

      <NavLink
        to="/write"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Write
      </NavLink>

      <NavLink
        to="/flashcards"
        className={({ isActive }) =>
          isActive ? "nav-item active" : "nav-item"
        }
      >
        Flashcards
      </NavLink>

      {/* <LanguageSelectionDropdown
        onChange={setNativeLanguage}
        displayText="Native Language"
      /> */}

      <DropDownMenu
        icon={
          <AccountCircleOutlinedIcon className="navbar-user" fontSize="large" />
        }
        menuOptions={["My Profile", "Account", "Logout"]}
      />
    </div>
  );
}

export default Navbar;

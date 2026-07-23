import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack } from "@mui/material";
import { NavLink } from "react-router-dom";

import LanguageSelectionDropdown from "./LanguageSelectionDropdown";
import "./Navbar.css";

function Navbar({ setNativeLanguage }) {
  return (
    <div className="navbar">
      <Stack direction="row" spacing={10}>
        <NavLink to="/write" className="navbar-logo">
          <span className="logo-icon">✍️</span>
          <span className="logo-text">WriteRight</span>
        </NavLink>

      
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
        

        <Stack className="navbar-user" direction="row" spacing={2}>
          <AccountCircleOutlinedIcon fontSize="large" />
          <LanguageSelectionDropdown
            onChange={setNativeLanguage}
            displayText="Native Language"
          />
        </Stack>
      </Stack>
    </div>
  );
}

export default Navbar;

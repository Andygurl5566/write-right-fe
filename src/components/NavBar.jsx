import "./Navbar.css";
import TranslateOutlinedIcon from "@mui/icons-material/TranslateOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Stack } from "@mui/material";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <span className="logo-icon">✍️</span>
        <span className="logo-text">WriteRight</span>
      </div>

      <span>Write</span>
      <span>History</span>
      <span>Flashcards</span>

      <div className="navbar-user">
        <Stack direction="row" spacing={2}>
          <AccountCircleOutlinedIcon fontSize="large" />

          {/* <span>DAD</span> */}
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;

import "./Navbar.css";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Stack } from "@mui/material";

function Navbar({ onWriteClick, onFlashcardsClick }) {
  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={onWriteClick}>
        <span className="logo-icon">✍️</span>
        <span className="logo-text">WriteRight</span>
      </div>

      <span onClick={onWriteClick}>Write</span>
      <span>History</span>
      <span onClick={onFlashcardsClick}>Flashcards</span>

      <div className="navbar-user">
        <Stack direction="row" spacing={2}>
          <AccountCircleOutlinedIcon fontSize="large" />
        </Stack>
      </div>
    </nav>
  );
}

export default Navbar;
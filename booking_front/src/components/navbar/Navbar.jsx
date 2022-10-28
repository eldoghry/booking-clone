import "./navbar.css";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <Link to="/" className="logo">
          <span>Booking.com</span>
        </Link>

        <div className="navItems">
          <button className="btn navButton">register</button>
          <button className="btn navButton">login</button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

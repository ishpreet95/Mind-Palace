import "./Navbar.css";
import { useDispatch } from "react-redux";
import { logout } from "../../slices/authSlice";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      navigate("/sign-in");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="navbar">
      <div className="title">Mind Palace</div>
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Navbar;

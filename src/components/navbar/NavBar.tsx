import { Person } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import "./navbar.scss";
const NavBar = () => {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>N14</h2>
      <div className="actionMain">
        <h2 onClick={() => navigate("/")}>Home</h2>
        <h2 onClick={() => navigate("/sanpham")}>Sản phẩm</h2>
        <h2 onClick={() => navigate("/khohang")}>Kho hàng</h2>
        <h2 onClick={() => navigate("/lichsukhohang")}>Lịch sử xuất kho</h2>
      </div>
      <div className="iconLeft">
        <Person className="icon" />
      </div>
    </div>
  );
};

export default NavBar;

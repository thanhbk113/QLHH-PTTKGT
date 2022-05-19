import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";
import Depot from "./pages/depot/Depot";
import NavBar from "./components/navbar/NavBar";
import HistoryDepot from "./pages/historyDepot/HistoryDepot";

function App() {
  return (
    <div>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sanpham" element={<Products />} />
          <Route path="/khohang" element={<Depot />} />
          <Route path="/lichsukhohang" element={<HistoryDepot />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

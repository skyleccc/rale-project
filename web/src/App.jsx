import './App.css'
import Dashboard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./components/Header";
import FirstPage from "./components/FirstPage";
import Footer from "./components/Footer";
import ShopSection from "./components/shopSection";
import PageBreak1 from "./components/pagebreak1";
import ShirtCatalog from "./components/shirtcatalog";
import Design from "./components/design";
import ShopPageTop from "./components/shopPagetop";
import ShopPage2 from "./components/shopPage2";
import ProductPage from "./components/productPage";
import CheckoutPage from "./components/checkoutPage";
import AccountPage from "./components/accountPage";
import LoginPage from "./components/loginPage";
import RegisterPage from "./components/registerPage";
import ShopPage from "./components/shopPage";
import FrontPage from "./components/frontPage";
import AuthenticateUser from './components/authenticate';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthenticateUser />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/shirtcatalog" element={<ShirtCatalog />} />
        <Route path="/shopPage" element={<ShopPage />} />
        <Route path="/frontPage" element={<FrontPage />} />
        <Route path="/checkoutPage" element={<CheckoutPage />} />
        <Route path="/accountPage" element = {<AccountPage/>} />
        <Route path="/product/:productId" element = {<ProductPage/>} />
        <Route path="/loginPage" element = {<LoginPage/>} />
        <Route path="/registerPage" element = {<RegisterPage/>} />
      </Routes>
    </Router>
  );
}

export default App;

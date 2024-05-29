import Headers from "./components/Headers";
import Footer from "./components/Footer";
import { Container } from "react-bootstrap";
import Homescreen from "./screens/Homescreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
import Signin from "./components/Signin";
import Cart from "./components/Cart";
import ProductDetails from "./screens/ProductDetails";
import SignUpForm from "./components/Signup";
import { CartProvider } from "./context/cartContext"; 
import Checkout from "./components/Checkout";
import OrderSuccess from "./screens/PlaceOrder";
import OrderDetails from "./components/OrderDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <Router>
      <Headers />
      <main className="my-3">
        <Container>
          <CartProvider>
            <Routes>
              <Route path="/" Component={Homescreen} exact />
              <Route path="/signin" Component={Signin} exact />
              <Route path="/cart/:id?" Component={Cart} exact />
              <Route path="/product/:id" element={<ProductDetails />} exact />
              <Route path="/signup" element={<SignUpForm />} exact />
              <Route path="/checkout" element={<Checkout />} exact />
              <Route path="/order" element={<OrderSuccess />} exact />
              <Route path="/orderdetail" element={<OrderDetails />} exact />
            </Routes>
          </CartProvider>
        </Container>
      </main>
      <Footer></Footer>
    </Router>
  );
}

export default App;

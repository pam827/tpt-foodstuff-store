import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [lastOrder, setLastOrder] = useState(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
      return;
    }

    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <div className="App">
        <Navbar cartCount={cartCount} />
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} />} />
          <Route path="/products" element={<Products onAddToCart={addToCart} />} />
          <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cart={cart} 
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
              />
            } 
          />
          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                onClearCart={clearCart}
                onOrderPlaced={setLastOrder}
              />
            }
          />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmation order={lastOrder} />}
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Wishlist from './pages/Wishlist';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import { ReviewProvider } from './context/ReviewContext';
import './App.css';

const AppContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 20px 0;
`;

function App() {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <WishlistProvider>
            <ReviewProvider>
              <Router>
                <AppContainer>
                  <Header />
                  <MainContent>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/products" element={<Products />} />
                      <Route path="/product/:id" element={<ProductDetail />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/wishlist" element={<Wishlist />} />
                    </Routes>
                  </MainContent>
                  <Footer />
                </AppContainer>
              </Router>
            </ReviewProvider>
          </WishlistProvider>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
}

export default App;

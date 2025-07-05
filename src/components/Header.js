import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaShoppingCart, 
  FaSearch, 
  FaUser, 
  FaHeart, 
  FaBars,
  FaTimes 
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useProducts } from '../context/ProductContext';

const HeaderContainer = styled.header`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Logo = styled(Link)`
  font-size: 1.8rem;
  font-weight: bold;
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    color: #f0f0f0;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 500px;
  margin: 0 2rem;
  position: relative;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background: rgba(255, 255, 255, 0.9);
  
  &:focus {
    background: white;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.3);
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #764ba2;
  }
`;

const NavContainer = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  
  &:hover {
    color: #f0f0f0;
  }
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  position: relative;
  padding: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    color: #f0f0f0;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: -5px;
  right: -5px;
  background: #ff4757;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: bold;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  display: none;
  
  @media (max-width: 768px) {
    display: ${props => props.isOpen ? 'block' : 'none'};
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    padding: 1rem;
  }
`;

const MobileNavLink = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
  
  &:hover {
    color: #667eea;
  }
`;

const MobileSearchContainer = styled.div`
  margin: 1rem 0;
  
  @media (min-width: 769px) {
    display: none;
  }
`;

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartItemCount, toggleCart } = useCart();
  const { searchTerm, setSearchTerm } = useProducts();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate('/products');
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo to="/">
          🛍️ ShopHub
        </Logo>
        
        <SearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch />
            </SearchButton>
          </form>
        </SearchContainer>
        
        <NavContainer>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">Products</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </NavContainer>
        
        <IconContainer>
          <IconButton>
            <FaHeart />
          </IconButton>
          
          <IconButton onClick={toggleCart}>
            <FaShoppingCart />
            {getCartItemCount() > 0 && (
              <CartBadge>{getCartItemCount()}</CartBadge>
            )}
          </IconButton>
          
          <IconButton>
            <FaUser />
          </IconButton>
        </IconContainer>
        
        <MobileMenuButton onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </MobileMenuButton>
      </HeaderContent>
      
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileSearchContainer>
          <form onSubmit={handleSearch}>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch />
            </SearchButton>
          </form>
        </MobileSearchContainer>
        
        <MobileNavLink to="/" onClick={closeMobileMenu}>
          Home
        </MobileNavLink>
        <MobileNavLink to="/products" onClick={closeMobileMenu}>
          Products
        </MobileNavLink>
        <MobileNavLink to="/about" onClick={closeMobileMenu}>
          About
        </MobileNavLink>
        <MobileNavLink to="/contact" onClick={closeMobileMenu}>
          Contact
        </MobileNavLink>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header; 
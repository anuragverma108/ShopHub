import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaShoppingCart,
  FaArrowLeft,
  FaCreditCard
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CartHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const CartTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
`;

const CartIcon = styled.div`
  font-size: 2rem;
  color: #3498db;
`;

const EmptyCartContainer = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: #7f8c8d;
`;

const EmptyCartIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  color: #bdc3c7;
`;

const EmptyCartTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
`;

const EmptyCartMessage = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
`;

const ContinueShoppingButton = styled(Link)`
  background: #3498db;
  color: white;
  text-decoration: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const CartLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartItemsSection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const CartItem = styled.div`
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const ItemImage = styled.img`
  width: 120px;
  height: 120px;
  object-fit: cover;
  border-radius: 10px;
  
  @media (max-width: 768px) {
    width: 100%;
    height: 200px;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ItemHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ItemTitle = styled.h3`
  font-size: 1.2rem;
  color: #2c3e50;
  margin: 0;
  flex: 1;
`;

const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.1rem;
  
  &:hover {
    color: #c0392b;
  }
`;

const ItemDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ItemPrice = styled.div`
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
`;

const ItemOptions = styled.div`
  color: #7f8c8d;
  font-size: 0.9rem;
`;

const ItemControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background: #f8f9fa;
  color: #333;
  cursor: pointer;
  transition: background 0.3s ease;
  
  &:hover {
    background: #e9ecef;
  }
`;

const QuantityDisplay = styled.span`
  padding: 0.5rem 1rem;
  background: white;
  font-weight: bold;
  min-width: 40px;
  text-align: center;
`;

const ItemTotal = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
`;

const CartSummarySection = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 2rem;
`;

const SummaryTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #e0e0e0;
  }
`;

const SummaryLabel = styled.span`
  color: #7f8c8d;
`;

const SummaryValue = styled.span`
  font-weight: bold;
  color: #2c3e50;
`;

const TotalRow = styled(SummaryRow)`
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
  border-top: 2px solid #e0e0e0;
  padding-top: 1rem;
  margin-top: 1rem;
`;

const CheckoutButton = styled.button`
  background: #27ae60;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  width: 100%;
  margin-top: 1.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #229954;
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const ContinueShoppingLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3498db;
  text-decoration: none;
  margin-top: 1rem;
  font-weight: 500;
  
  &:hover {
    color: #2980b9;
  }
`;

const Cart = () => {
  const { 
    cartItems, 
    removeFromCart, 
    updateQuantity
  } = useCart();

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity, item.selectedColor, item.selectedSize);
    }
  };

  const handleRemoveItem = (item) => {
    removeFromCart(item.id, item.selectedColor, item.selectedSize);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08; // 8% tax
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10; // Free shipping over $100
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  if (cartItems.length === 0) {
    return (
      <CartContainer>
        <CartHeader>
          <CartIcon>
            <FaShoppingCart />
          </CartIcon>
          <CartTitle>Shopping Cart</CartTitle>
        </CartHeader>
        
        <EmptyCartContainer>
          <EmptyCartIcon>
            <FaShoppingCart />
          </EmptyCartIcon>
          <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
          <EmptyCartMessage>
            Looks like you haven't added any items to your cart yet.
          </EmptyCartMessage>
          <ContinueShoppingButton to="/products">
            <FaArrowLeft />
            Continue Shopping
          </ContinueShoppingButton>
        </EmptyCartContainer>
      </CartContainer>
    );
  }

  return (
    <CartContainer>
      <CartHeader>
        <CartIcon>
          <FaShoppingCart />
        </CartIcon>
        <CartTitle>Shopping Cart ({cartItems.length} items)</CartTitle>
      </CartHeader>

      <CartLayout>
        <CartItemsSection>
          {cartItems.map((item, index) => (
            <CartItem key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}>
              <ItemImage src={item.image} alt={item.name} />
              <ItemInfo>
                <ItemHeader>
                  <ItemTitle>{item.name}</ItemTitle>
                  <RemoveButton onClick={() => handleRemoveItem(item)}>
                    <FaTrash />
                  </RemoveButton>
                </ItemHeader>
                
                <ItemDetails>
                  <ItemPrice>${item.price}</ItemPrice>
                  <ItemOptions>
                    {item.selectedColor && `Color: ${item.selectedColor}`}
                    {item.selectedSize && `Size: ${item.selectedSize}`}
                  </ItemOptions>
                </ItemDetails>
                
                <ItemControls>
                  <QuantityControls>
                    <QuantityButton onClick={() => handleQuantityChange(item, -1)}>
                      <FaMinus />
                    </QuantityButton>
                    <QuantityDisplay>{item.quantity}</QuantityDisplay>
                    <QuantityButton onClick={() => handleQuantityChange(item, 1)}>
                      <FaPlus />
                    </QuantityButton>
                  </QuantityControls>
                  <ItemTotal>${(item.price * item.quantity).toFixed(2)}</ItemTotal>
                </ItemControls>
              </ItemInfo>
            </CartItem>
          ))}
        </CartItemsSection>

        <CartSummarySection>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <SummaryRow>
            <SummaryLabel>Subtotal</SummaryLabel>
            <SummaryValue>${calculateSubtotal().toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Tax (8%)</SummaryLabel>
            <SummaryValue>${calculateTax().toFixed(2)}</SummaryValue>
          </SummaryRow>
          
          <SummaryRow>
            <SummaryLabel>Shipping</SummaryLabel>
            <SummaryValue>
              {calculateShipping() === 0 ? 'Free' : `$${calculateShipping().toFixed(2)}`}
            </SummaryValue>
          </SummaryRow>
          
          <TotalRow>
            <SummaryLabel>Total</SummaryLabel>
            <SummaryValue>${calculateTotal().toFixed(2)}</SummaryValue>
          </TotalRow>
          
          <Link to="/checkout" style={{ textDecoration: 'none' }}>
            <CheckoutButton>
              <FaCreditCard />
              Proceed to Checkout
            </CheckoutButton>
          </Link>
          
          <ContinueShoppingLink to="/products">
            <FaArrowLeft />
            Continue Shopping
          </ContinueShoppingLink>
        </CartSummarySection>
      </CartLayout>
    </CartContainer>
  );
};

export default Cart; 
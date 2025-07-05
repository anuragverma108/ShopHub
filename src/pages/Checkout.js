import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaCreditCard, 
  FaLock, 
  FaArrowLeft,
  FaCheck,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaShieldAlt
} from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const CheckoutContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const CheckoutHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0;
  
  &:hover {
    color: #2980b9;
  }
`;

const CheckoutTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
`;

const CheckoutLayout = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CheckoutForm = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const FormSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
`;

const FormGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-weight: 500;
  }
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;
  
  &:focus {
    border-color: #3498db;
  }
`;

const FormSelect = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  background: white;
  cursor: pointer;
  
  &:focus {
    border-color: #3498db;
  }
`;

const PaymentMethodContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const PaymentMethod = styled.div`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e0e0e0'};
  border-radius: 8px;
  cursor: pointer;
  text-align: center;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
  }
`;

const PaymentIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.selected ? '#3498db' : '#7f8c8d'};
`;

const PaymentLabel = styled.div`
  font-weight: 500;
  color: ${props => props.selected ? '#3498db' : '#2c3e50'};
`;

const CardInputs = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 1rem;
`;

const OrderSummary = styled.div`
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

const OrderItems = styled.div`
  margin-bottom: 1.5rem;
`;

const OrderItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid #e0e0e0;
  
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.div`
  font-weight: 500;
  color: #2c3e50;
`;

const ItemDetails = styled.div`
  font-size: 0.9rem;
  color: #7f8c8d;
`;

const ItemPrice = styled.div`
  font-weight: bold;
  color: #e74c3c;
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
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

const PlaceOrderButton = styled(motion.button)`
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
  transition: background 0.3s ease;
  
  &:hover {
    background: #229954;
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const SecurityNote = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #7f8c8d;
  font-size: 0.9rem;
  margin-top: 1rem;
  text-align: center;
`;

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal, clearCart } = useCart();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  
  const [paymentMethod, setPaymentMethod] = useState('credit');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.08;
  };

  const calculateShipping = () => {
    return calculateSubtotal() > 100 ? 0 : 10;
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const isFormValid = () => {
    return Object.values(formData).every(value => value.trim() !== '');
  };

  const handlePlaceOrder = async () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      alert('Order placed successfully! Thank you for your purchase.');
      clearCart();
      navigate('/');
      setIsProcessing(false);
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <CheckoutContainer>
        <CheckoutHeader>
          <BackButton onClick={() => navigate('/cart')}>
            <FaArrowLeft />
            Back to Cart
          </BackButton>
          <CheckoutTitle>Checkout</CheckoutTitle>
        </CheckoutHeader>
        
        <div style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <h2>Your cart is empty</h2>
          <p>Please add items to your cart before proceeding to checkout.</p>
        </div>
      </CheckoutContainer>
    );
  }

  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <BackButton onClick={() => navigate('/cart')}>
          <FaArrowLeft />
          Back to Cart
        </BackButton>
        <CheckoutTitle>Checkout</CheckoutTitle>
      </CheckoutHeader>

      <CheckoutLayout>
        <CheckoutForm>
          <FormSection>
            <SectionTitle>
              <FaUser />
              Shipping Information
            </SectionTitle>
            <FormGrid>
              <FormGroup>
                <label>First Name *</label>
                <FormInput
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Last Name *</label>
                <FormInput
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Email *</label>
                <FormInput
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Phone *</label>
                <FormInput
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Address *</label>
                <FormInput
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>City *</label>
                <FormInput
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>State *</label>
                <FormSelect
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="CA">California</option>
                  <option value="NY">New York</option>
                  <option value="TX">Texas</option>
                  <option value="FL">Florida</option>
                  <option value="IL">Illinois</option>
                </FormSelect>
              </FormGroup>
              <FormGroup>
                <label>ZIP Code *</label>
                <FormInput
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormGrid>
          </FormSection>

          <FormSection>
            <SectionTitle>
              <FaCreditCard />
              Payment Method
            </SectionTitle>
            <PaymentMethodContainer>
              <PaymentMethod
                selected={paymentMethod === 'credit'}
                onClick={() => setPaymentMethod('credit')}
              >
                <PaymentIcon selected={paymentMethod === 'credit'}>
                  <FaCreditCard />
                </PaymentIcon>
                <PaymentLabel selected={paymentMethod === 'credit'}>
                  Credit Card
                </PaymentLabel>
              </PaymentMethod>
              <PaymentMethod
                selected={paymentMethod === 'debit'}
                onClick={() => setPaymentMethod('debit')}
              >
                <PaymentIcon selected={paymentMethod === 'debit'}>
                  <FaCreditCard />
                </PaymentIcon>
                <PaymentLabel selected={paymentMethod === 'debit'}>
                  Debit Card
                </PaymentLabel>
              </PaymentMethod>
            </PaymentMethodContainer>
            
            <FormGrid>
              <FormGroup>
                <label>Card Number *</label>
                <FormInput
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  placeholder="1234 5678 9012 3456"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>Cardholder Name *</label>
                <FormInput
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
            </FormGrid>
            
            <CardInputs>
              <FormGroup>
                <label>Expiry Date *</label>
                <FormInput
                  type="text"
                  name="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  required
                />
              </FormGroup>
              <FormGroup>
                <label>CVV *</label>
                <FormInput
                  type="text"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  required
                />
              </FormGroup>
            </CardInputs>
          </FormSection>
        </CheckoutForm>

        <OrderSummary>
          <SummaryTitle>Order Summary</SummaryTitle>
          
          <OrderItems>
            {cartItems.map((item, index) => (
              <OrderItem key={index}>
                <ItemInfo>
                  <ItemName>{item.name}</ItemName>
                  <ItemDetails>
                    Qty: {item.quantity}
                    {item.selectedColor && ` | Color: ${item.selectedColor}`}
                    {item.selectedSize && ` | Size: ${item.selectedSize}`}
                  </ItemDetails>
                </ItemInfo>
                <ItemPrice>${(item.price * item.quantity).toFixed(2)}</ItemPrice>
              </OrderItem>
            ))}
          </OrderItems>
          
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
          
          <PlaceOrderButton
            onClick={handlePlaceOrder}
            disabled={!isFormValid() || isProcessing}
            whileHover={{ scale: isFormValid() && !isProcessing ? 1.02 : 1 }}
            whileTap={{ scale: isFormValid() && !isProcessing ? 0.98 : 1 }}
          >
            {isProcessing ? (
              <>
                <div style={{ animation: 'spin 1s linear infinite' }}>⏳</div>
                Processing...
              </>
            ) : (
              <>
                <FaCheck />
                Place Order
              </>
            )}
          </PlaceOrderButton>
          
          <SecurityNote>
            <FaLock />
            Your payment information is secure and encrypted
          </SecurityNote>
        </OrderSummary>
      </CheckoutLayout>
    </CheckoutContainer>
  );
};

export default Checkout; 
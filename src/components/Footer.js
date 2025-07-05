import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaFacebook, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedin,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt
} from 'react-icons/fa';

const FooterContainer = styled.footer`
  background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const FooterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
`;

const FooterSection = styled.div`
  h3 {
    color: #3498db;
    margin-bottom: 1rem;
    font-size: 1.3rem;
  }
  
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #3498db;
    }
  }
`;

const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: #bdc3c7;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: #3498db;
  color: white;
  border-radius: 50%;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.9);
  }
`;

const NewsletterSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  text-align: center;
`;

const NewsletterTitle = styled.h3`
  color: #3498db;
  margin-bottom: 1rem;
`;

const NewsletterForm = styled.form`
  display: flex;
  gap: 1rem;
  max-width: 400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NewsletterInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  
  &:focus {
    box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.3);
  }
`;

const NewsletterButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const FooterBottom = styled.div`
  border-top: 1px solid #34495e;
  padding-top: 1rem;
  text-align: center;
  color: #bdc3c7;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Copyright = styled.div`
  color: #bdc3c7;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.5rem;
  }
  
  a {
    color: #bdc3c7;
    text-decoration: none;
    transition: color 0.3s ease;
    
    &:hover {
      color: #3498db;
    }
  }
`;

const Footer = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
  };

  return (
    <FooterContainer>
      <FooterContent>
        <FooterGrid>
          <FooterSection>
            <h3>ShopHub</h3>
            <p style={{ color: '#bdc3c7', lineHeight: '1.6' }}>
              Your one-stop destination for quality products. We provide the best shopping experience with premium customer service.
            </p>
            <SocialLinks>
              <SocialButton href="#" aria-label="Facebook">
                <FaFacebook />
              </SocialButton>
              <SocialButton href="#" aria-label="Twitter">
                <FaTwitter />
              </SocialButton>
              <SocialButton href="#" aria-label="Instagram">
                <FaInstagram />
              </SocialButton>
              <SocialButton href="#" aria-label="LinkedIn">
                <FaLinkedin />
              </SocialButton>
            </SocialLinks>
          </FooterSection>

          <FooterSection>
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/products">Products</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/cart">Shopping Cart</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Categories</h3>
            <ul>
              <li><Link to="/products?category=electronics">Electronics</Link></li>
              <li><Link to="/products?category=clothing">Clothing</Link></li>
              <li><Link to="/products?category=accessories">Accessories</Link></li>
              <li><Link to="/products?category=home">Home & Garden</Link></li>
              <li><Link to="/products?category=sports">Sports & Outdoors</Link></li>
            </ul>
          </FooterSection>

          <FooterSection>
            <h3>Contact Info</h3>
            <ContactInfo>
              <FaMapMarkerAlt />
              <span>123 Shopping St, E-Commerce City, EC 12345</span>
            </ContactInfo>
            <ContactInfo>
              <FaPhone />
              <span>+1 (555) 123-4567</span>
            </ContactInfo>
            <ContactInfo>
              <FaEnvelope />
              <span>info@shophub.com</span>
            </ContactInfo>
          </FooterSection>
        </FooterGrid>

        <NewsletterSection>
          <NewsletterTitle>Subscribe to Our Newsletter</NewsletterTitle>
          <p style={{ color: '#bdc3c7', marginBottom: '1rem' }}>
            Get the latest updates on new products, sales, and exclusive offers!
          </p>
          <NewsletterForm onSubmit={handleNewsletterSubmit}>
            <NewsletterInput
              type="email"
              placeholder="Enter your email address"
              required
            />
            <NewsletterButton type="submit">
              Subscribe
            </NewsletterButton>
          </NewsletterForm>
        </NewsletterSection>

        <FooterBottom>
          <Copyright>
            © 2024 ShopHub. All rights reserved.
          </Copyright>
          <FooterLinks>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms of Service</Link>
            <Link to="/shipping">Shipping Info</Link>
            <Link to="/returns">Returns & Exchanges</Link>
          </FooterLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer; 
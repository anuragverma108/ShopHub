import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaArrowRight, FaStar, FaShoppingCart } from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';

const HomeContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  border-radius: 15px;
  margin: 2rem 0;
  text-align: center;
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200') center/cover;
    opacity: 0.1;
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const HeroButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  border-radius: 25px;
  cursor: pointer;
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const Section = styled.section`
  margin: 4rem 0;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
  color: #2c3e50;
`;

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
`;

const CategoryCard = styled.div`
  background: white;
  border-radius: 15px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px) scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const CategoryIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const CategoryTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const CategoryDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
`;

const FeaturedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-10px);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  color: #e74c3c;
`;

const OriginalPrice = styled.span`
  font-size: 1rem;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
  color: #f39c12;
`;

const AddToCartButton = styled.button`
  background: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: bold;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const StatsSection = styled.section`
  background: #f8f9fa;
  padding: 4rem 0;
  margin: 4rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  h3 {
    font-size: 2.5rem;
    color: #3498db;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #7f8c8d;
    font-size: 1.1rem;
  }
`;

const Home = () => {
  const { products } = useProducts();
  const featuredProducts = products.slice(0, 6);

  const categories = [
    {
      name: 'Electronics',
      icon: '📱',
      description: 'Latest gadgets and tech',
      link: '/products?category=electronics'
    },
    {
      name: 'Clothing',
      icon: '👕',
      description: 'Fashion for everyone',
      link: '/products?category=clothing'
    },
    {
      name: 'Accessories',
      icon: '👜',
      description: 'Complete your look',
      link: '/products?category=accessories'
    }
  ];

  return (
    <HomeContainer>
      <HeroSection>
        <HeroContent>
          <HeroTitle>Welcome to ShopHub</HeroTitle>
          <HeroSubtitle>
            Discover amazing products at unbeatable prices. 
            Shop with confidence and enjoy premium quality.
          </HeroSubtitle>
          <Link to="/products">
            <HeroButton>
              Shop Now <FaArrowRight />
            </HeroButton>
          </Link>
        </HeroContent>
      </HeroSection>

      <Section>
        <SectionTitle>Shop by Category</SectionTitle>
        <CategoriesGrid>
          {categories.map((category, index) => (
            <Link key={index} to={category.link} style={{ textDecoration: 'none' }}>
              <CategoryCard>
                <CategoryIcon>{category.icon}</CategoryIcon>
                <CategoryTitle>{category.name}</CategoryTitle>
                <CategoryDescription>{category.description}</CategoryDescription>
              </CategoryCard>
            </Link>
          ))}
        </CategoriesGrid>
      </Section>

      <Section>
        <SectionTitle>Featured Products</SectionTitle>
        <FeaturedProductsGrid>
          {featuredProducts.map((product) => (
            <ProductCard key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductTitle>{product.name}</ProductTitle>
                <ProductPrice>
                  <CurrentPrice>${product.price}</CurrentPrice>
                  {product.originalPrice > product.price && (
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                  )}
                </ProductPrice>
                <ProductRating>
                  <FaStar />
                  <span>{product.rating} ({product.reviews} reviews)</span>
                </ProductRating>
                <AddToCartButton>
                  <FaShoppingCart />
                  Add to Cart
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </FeaturedProductsGrid>
      </Section>

      <StatsSection>
        <HomeContainer>
          <SectionTitle>Why Choose ShopHub?</SectionTitle>
          <StatsGrid>
            <StatItem>
              <h3>10K+</h3>
              <p>Happy Customers</p>
            </StatItem>
            <StatItem>
              <h3>500+</h3>
              <p>Products Available</p>
            </StatItem>
            <StatItem>
              <h3>24/7</h3>
              <p>Customer Support</p>
            </StatItem>
            <StatItem>
              <h3>100%</h3>
              <p>Secure Shopping</p>
            </StatItem>
          </StatsGrid>
        </HomeContainer>
      </StatsSection>
    </HomeContainer>
  );
};

export default Home; 
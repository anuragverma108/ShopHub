import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { 
  FaStar, 
  FaShoppingCart, 
  FaHeart, 
  FaShare, 
  FaArrowLeft,
  FaMinus,
  FaPlus
} from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductDetailContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
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
  margin-bottom: 2rem;
  padding: 0.5rem 0;
  
  &:hover {
    color: #2980b9;
  }
`;

const ProductLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const MainImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
`;

const ImageGallery = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const ThumbnailImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
  border: 2px solid ${props => props.active ? '#3498db' : 'transparent'};
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
  }
`;

const ProductInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ProductTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const CurrentPrice = styled.span`
  font-size: 2rem;
  font-weight: bold;
  color: #e74c3c;
`;

const OriginalPrice = styled.span`
  font-size: 1.5rem;
  color: #7f8c8d;
  text-decoration: line-through;
`;

const DiscountBadge = styled.span`
  background: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.9rem;
  font-weight: bold;
`;

const ProductRating = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #f39c12;
  font-size: 1.1rem;
`;

const ProductDescription = styled.p`
  color: #7f8c8d;
  line-height: 1.6;
  font-size: 1.1rem;
`;

const ProductOptions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const OptionGroup = styled.div`
  h3 {
    margin-bottom: 0.5rem;
    color: #2c3e50;
    font-size: 1.1rem;
  }
`;

const ColorOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const ColorOption = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid ${props => props.selected ? '#3498db' : 'transparent'};
  background: ${props => props.color};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const SizeOptions = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const SizeOption = styled.button`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${props => props.selected ? '#3498db' : '#e0e0e0'};
  background: ${props => props.selected ? '#3498db' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #3498db;
  }
`;

const QuantitySelector = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  h3 {
    margin: 0;
    color: #2c3e50;
    font-size: 1.1rem;
  }
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  overflow: hidden;
`;

const QuantityButton = styled.button`
  padding: 0.75rem 1rem;
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
  padding: 0.75rem 1.5rem;
  background: white;
  font-weight: bold;
  min-width: 50px;
  text-align: center;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const AddToCartButton = styled(motion.button)`
  background: #3498db;
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex: 1;
  transition: background 0.3s ease;
  
  &:hover {
    background: #2980b9;
  }
`;

const WishlistButton = styled.button`
  background: transparent;
  color: #e74c3c;
  border: 2px solid #e74c3c;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #e74c3c;
    color: white;
  }
`;

const ShareButton = styled.button`
  background: transparent;
  color: #7f8c8d;
  border: 2px solid #7f8c8d;
  padding: 1rem 2rem;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: #7f8c8d;
    color: white;
  }
`;

const ProductDetails = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const DetailsTitle = styled.h2`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const DetailsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const DetailItem = styled.div`
  h4 {
    color: #7f8c8d;
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
    text-transform: uppercase;
  }
  
  p {
    color: #2c3e50;
    font-weight: 500;
  }
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #e74c3c;
  font-size: 1.2rem;
`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getProductById } = useProducts();
  const { addToCart } = useCart();
  
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [currentImage, setCurrentImage] = useState(0);

  const product = getProductById(id);

  if (!product) {
    return (
      <ProductDetailContainer>
        <ErrorMessage>
          Product not found. <BackButton onClick={() => navigate('/products')}>Go back to products</BackButton>
        </ErrorMessage>
      </ProductDetailContainer>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedColor, selectedSize);
    alert('Product added to cart!');
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity >= 1 && newQuantity <= 99) {
      setQuantity(newQuantity);
    }
  };

  const discount = product.originalPrice > product.price 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <ProductDetailContainer>
      <BackButton onClick={() => navigate('/products')}>
        <FaArrowLeft />
        Back to Products
      </BackButton>

      <ProductLayout>
        <ImageSection>
          <MainImage src={product.image} alt={product.name} />
          <ImageGallery>
            {[product.image, product.image, product.image].map((img, index) => (
              <ThumbnailImage
                key={index}
                src={img}
                alt={`${product.name} ${index + 1}`}
                active={currentImage === index}
                onClick={() => setCurrentImage(index)}
              />
            ))}
          </ImageGallery>
        </ImageSection>

        <ProductInfoSection>
          <ProductTitle>{product.name}</ProductTitle>
          
          <ProductPrice>
            <CurrentPrice>${product.price}</CurrentPrice>
            {product.originalPrice > product.price && (
              <>
                <OriginalPrice>${product.originalPrice}</OriginalPrice>
                <DiscountBadge>-{discount}%</DiscountBadge>
              </>
            )}
          </ProductPrice>

          <ProductRating>
            <FaStar />
            <span>{product.rating} ({product.reviews} reviews)</span>
          </ProductRating>

          <ProductDescription>{product.description}</ProductDescription>

          <ProductOptions>
            {product.colors && product.colors.length > 0 && (
              <OptionGroup>
                <h3>Color</h3>
                <ColorOptions>
                  {product.colors.map((color) => (
                    <ColorOption
                      key={color}
                      color={color.toLowerCase()}
                      selected={selectedColor === color}
                      onClick={() => setSelectedColor(color)}
                      title={color}
                    />
                  ))}
                </ColorOptions>
              </OptionGroup>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <OptionGroup>
                <h3>Size</h3>
                <SizeOptions>
                  {product.sizes.map((size) => (
                    <SizeOption
                      key={size}
                      selected={selectedSize === size}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </SizeOption>
                  ))}
                </SizeOptions>
              </OptionGroup>
            )}

            <QuantitySelector>
              <h3>Quantity</h3>
              <QuantityControls>
                <QuantityButton onClick={() => handleQuantityChange(-1)}>
                  <FaMinus />
                </QuantityButton>
                <QuantityDisplay>{quantity}</QuantityDisplay>
                <QuantityButton onClick={() => handleQuantityChange(1)}>
                  <FaPlus />
                </QuantityButton>
              </QuantityControls>
            </QuantitySelector>
          </ProductOptions>

          <ActionButtons>
            <AddToCartButton
              onClick={handleAddToCart}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <FaShoppingCart />
              Add to Cart
            </AddToCartButton>
            <WishlistButton>
              <FaHeart />
              Wishlist
            </WishlistButton>
            <ShareButton>
              <FaShare />
              Share
            </ShareButton>
          </ActionButtons>
        </ProductInfoSection>
      </ProductLayout>

      <ProductDetails>
        <DetailsTitle>Product Details</DetailsTitle>
        <DetailsGrid>
          <DetailItem>
            <h4>Category</h4>
            <p>{product.category.charAt(0).toUpperCase() + product.category.slice(1)}</p>
          </DetailItem>
          <DetailItem>
            <h4>Availability</h4>
            <p>{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
          </DetailItem>
          <DetailItem>
            <h4>Rating</h4>
            <p>{product.rating} / 5 ({product.reviews} reviews)</p>
          </DetailItem>
          <DetailItem>
            <h4>SKU</h4>
            <p>SKU-{product.id.toString().padStart(4, '0')}</p>
          </DetailItem>
        </DetailsGrid>
      </ProductDetails>
    </ProductDetailContainer>
  );
};

export default ProductDetail; 
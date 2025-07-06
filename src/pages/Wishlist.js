import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { FaHeart, FaTrash, FaShoppingCart, FaStar } from 'react-icons/fa';

const WishlistContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
`;

const EmptyWishlist = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #666;

  h3 {
    margin-bottom: 20px;
    color: #333;
  }

  p {
    margin-bottom: 30px;
    font-size: 16px;
  }
`;

const ShopButton = styled(Link)`
  display: inline-block;
  padding: 12px 24px;
  background: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const WishlistGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
`;

const WishlistCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductName = styled.h3`
  margin: 0 0 10px 0;
  color: #333;
  font-size: 18px;
  font-weight: 600;
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
`;

const CurrentPrice = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #007bff;
`;

const OriginalPrice = styled.span`
  font-size: 16px;
  color: #999;
  text-decoration: line-through;
`;

const Discount = styled.span`
  background: #ff6b6b;
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
`;

const Rating = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
  color: #ffc107;
`;

const ReviewCount = styled.span`
  color: #666;
  font-size: 14px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

const AddToCartButton = styled(Button)`
  background: #007bff;
  color: white;

  &:hover {
    background: #0056b3;
  }
`;

const RemoveButton = styled(Button)`
  background: #dc3545;
  color: white;

  &:hover {
    background: #c82333;
  }
`;

const WishlistStats = styled.div`
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  text-align: center;

  h3 {
    margin: 0 0 10px 0;
    color: #333;
  }

  p {
    margin: 0;
    color: #666;
  }
`;

function Wishlist() {
  const { wishlistItems, removeFromWishlist, getWishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  const handleRemoveFromWishlist = (productId) => {
    removeFromWishlist(productId);
  };

  if (wishlistItems.length === 0) {
    return (
      <WishlistContainer>
        <Title>My Wishlist</Title>
        <EmptyWishlist>
          <h3>Your wishlist is empty</h3>
          <p>Start adding products you love to your wishlist!</p>
          <ShopButton to="/products">Start Shopping</ShopButton>
        </EmptyWishlist>
      </WishlistContainer>
    );
  }

  return (
    <WishlistContainer>
      <Title>My Wishlist</Title>
      
      <WishlistStats>
        <h3>Wishlist Summary</h3>
        <p>You have {getWishlistCount()} item{getWishlistCount() !== 1 ? 's' : ''} in your wishlist</p>
      </WishlistStats>

      <WishlistGrid>
        {wishlistItems.map((product) => (
          <WishlistCard key={product.id}>
            <Link to={`/product/${product.id}`}>
              <ProductImage src={product.image} alt={product.name} />
            </Link>
            <ProductInfo>
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none' }}>
                <ProductName>{product.name}</ProductName>
              </Link>
              
              <ProductPrice>
                <CurrentPrice>${product.price}</CurrentPrice>
                {product.originalPrice && product.originalPrice > product.price && (
                  <>
                    <OriginalPrice>${product.originalPrice}</OriginalPrice>
                    <Discount>
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </Discount>
                  </>
                )}
              </ProductPrice>

              <Rating>
                <FaStar />
                <span>{product.rating}</span>
                <ReviewCount>({product.reviews} reviews)</ReviewCount>
              </Rating>

              <ActionButtons>
                <AddToCartButton onClick={() => handleAddToCart(product)}>
                  <FaShoppingCart />
                  Add to Cart
                </AddToCartButton>
                <RemoveButton onClick={() => handleRemoveFromWishlist(product.id)}>
                  <FaTrash />
                  Remove
                </RemoveButton>
              </ActionButtons>
            </ProductInfo>
          </WishlistCard>
        ))}
      </WishlistGrid>
    </WishlistContainer>
  );
}

export default Wishlist; 
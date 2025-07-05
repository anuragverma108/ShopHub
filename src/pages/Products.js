import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { 
  FaSearch, 
  FaFilter, 
  FaTh, 
  FaList, 
  FaStar, 
  FaShoppingCart,
  FaHeart
} from 'react-icons/fa';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';

const ProductsContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const ProductsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  gap: 1rem;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  color: #2c3e50;
  margin: 0;
`;

const ControlsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  min-width: 250px;
  
  &:focus {
    border-color: #3498db;
  }
`;

const SearchButton = styled.button`
  position: absolute;
  right: 0.5rem;
  background: none;
  border: none;
  color: #667eea;
  cursor: pointer;
  padding: 0.5rem;
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  font-size: 1rem;
  outline: none;
  background: white;
  cursor: pointer;
  
  &:focus {
    border-color: #3498db;
  }
`;

const ViewToggleContainer = styled.div`
  display: flex;
  border: 2px solid #e0e0e0;
  border-radius: 25px;
  overflow: hidden;
`;

const ViewToggleButton = styled.button`
  padding: 0.75rem 1rem;
  border: none;
  background: ${props => props.active ? '#3498db' : 'white'};
  color: ${props => props.active ? 'white' : '#333'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.active ? '#2980b9' : '#f8f9fa'};
  }
`;

const FiltersSection = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  margin-bottom: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FilterTitle = styled.h3`
  margin-bottom: 1rem;
  color: #2c3e50;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const FilterGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
`;

const FilterGroup = styled.div`
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #2c3e50;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.viewMode === 'grid' 
    ? 'repeat(auto-fill, minmax(280px, 1fr))' 
    : '1fr'};
  gap: 2rem;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  display: ${props => props.viewMode === 'list' ? 'flex' : 'block'};
  
  &:hover {
    transform: translateY(-5px);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const ProductImage = styled.img`
  width: ${props => props.viewMode === 'list' ? '200px' : '100%'};
  height: ${props => props.viewMode === 'list' ? '200px' : '200px'};
  object-fit: cover;
`;

const ProductInfo = styled.div`
  padding: 1.5rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
`;

const ProductTitle = styled.h3`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
  flex: 1;
`;

const WishlistButton = styled.button`
  background: none;
  border: none;
  color: #e74c3c;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  
  &:hover {
    color: #c0392b;
  }
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

const ProductDescription = styled.p`
  color: #7f8c8d;
  margin-bottom: 1rem;
  line-height: 1.5;
  display: ${props => props.viewMode === 'list' ? 'block' : 'none'};
`;

const ProductActions = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
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
  flex: 1;
  
  &:hover {
    background: #2980b9;
  }
`;

const ViewDetailsButton = styled(Link)`
  background: transparent;
  color: #3498db;
  border: 2px solid #3498db;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  transition: all 0.3s ease;
  
  &:hover {
    background: #3498db;
    color: white;
  }
`;

const NoProductsMessage = styled.div`
  text-align: center;
  padding: 3rem;
  color: #7f8c8d;
  font-size: 1.2rem;
`;

const LoadingSpinner = styled.div`
  text-align: center;
  padding: 3rem;
  color: #3498db;
  font-size: 1.2rem;
`;

const Products = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { 
    products, 
    loading, 
    searchTerm, 
    setSearchTerm, 
    selectedCategory, 
    setSelectedCategory,
    sortBy,
    setSortBy,
    getCategories
  } = useProducts();
  const { addToCart } = useCart();

  const categories = getCategories();

  const handleAddToCart = (product) => {
    addToCart(product, 1);
  };

  if (loading) {
    return (
      <ProductsContainer>
        <LoadingSpinner>Loading products...</LoadingSpinner>
      </ProductsContainer>
    );
  }

  return (
    <ProductsContainer>
      <ProductsHeader>
        <PageTitle>Products</PageTitle>
        <ControlsContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <SearchButton>
              <FaSearch />
            </SearchButton>
          </SearchContainer>
          
          <FilterSelect
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </FilterSelect>
          
          <FilterSelect
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Sort by Rating</option>
          </FilterSelect>
          
          <ViewToggleContainer>
            <ViewToggleButton
              active={viewMode === 'grid'}
              onClick={() => setViewMode('grid')}
            >
              <FaTh />
            </ViewToggleButton>
            <ViewToggleButton
              active={viewMode === 'list'}
              onClick={() => setViewMode('list')}
            >
              <FaList />
            </ViewToggleButton>
          </ViewToggleContainer>
        </ControlsContainer>
      </ProductsHeader>

      <FiltersSection>
        <FilterTitle onClick={() => setShowFilters(!showFilters)}>
          <FaFilter />
          Advanced Filters
        </FilterTitle>
        {showFilters && (
          <FilterGrid>
            <FilterGroup>
              <label>Price Range</label>
              <FilterSelect>
                <option>All Prices</option>
                <option>Under $50</option>
                <option>$50 - $100</option>
                <option>$100 - $200</option>
                <option>Over $200</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <label>Rating</label>
              <FilterSelect>
                <option>All Ratings</option>
                <option>4+ Stars</option>
                <option>3+ Stars</option>
                <option>2+ Stars</option>
              </FilterSelect>
            </FilterGroup>
            <FilterGroup>
              <label>Availability</label>
              <FilterSelect>
                <option>All Items</option>
                <option>In Stock</option>
                <option>On Sale</option>
              </FilterSelect>
            </FilterGroup>
          </FilterGrid>
        )}
      </FiltersSection>

      {products.length === 0 ? (
        <NoProductsMessage>
          No products found. Try adjusting your search or filters.
        </NoProductsMessage>
      ) : (
        <ProductsGrid viewMode={viewMode}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              viewMode={viewMode}
            >
              <ProductImage 
                src={product.image} 
                alt={product.name} 
                viewMode={viewMode}
              />
              <ProductInfo>
                <div>
                  <ProductHeader>
                    <ProductTitle>{product.name}</ProductTitle>
                    <WishlistButton>
                      <FaHeart />
                    </WishlistButton>
                  </ProductHeader>
                  
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
                  
                  <ProductDescription viewMode={viewMode}>
                    {product.description}
                  </ProductDescription>
                </div>
                
                <ProductActions>
                  <AddToCartButton onClick={() => handleAddToCart(product)}>
                    <FaShoppingCart />
                    Add to Cart
                  </AddToCartButton>
                  <ViewDetailsButton to={`/product/${product.id}`}>
                    View Details
                  </ViewDetailsButton>
                </ProductActions>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>
      )}
    </ProductsContainer>
  );
};

export default Products; 
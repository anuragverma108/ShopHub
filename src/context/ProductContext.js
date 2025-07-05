import React, { createContext, useContext, useState, useEffect } from 'react';

const ProductContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Mock product data
  const mockProducts = [
    {
      id: 1,
      name: "Wireless Bluetooth Headphones",
      price: 89.99,
      originalPrice: 129.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
      description: "High-quality wireless headphones with noise cancellation and long battery life.",
      rating: 4.5,
      reviews: 128,
      inStock: true,
      colors: ["Black", "White", "Blue"],
      sizes: ["One Size"]
    },
    {
      id: 2,
      name: "Smart Fitness Watch",
      price: 199.99,
      originalPrice: 249.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
      description: "Advanced fitness tracking with heart rate monitor and GPS.",
      rating: 4.3,
      reviews: 89,
      inStock: true,
      colors: ["Black", "Silver"],
      sizes: ["One Size"]
    },
    {
      id: 3,
      name: "Organic Cotton T-Shirt",
      price: 24.99,
      originalPrice: 34.99,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400",
      description: "Comfortable and sustainable cotton t-shirt for everyday wear.",
      rating: 4.7,
      reviews: 256,
      inStock: true,
      colors: ["White", "Black", "Gray", "Navy"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 4,
      name: "Leather Crossbody Bag",
      price: 79.99,
      originalPrice: 99.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400",
      description: "Stylish and practical leather bag perfect for daily use.",
      rating: 4.4,
      reviews: 67,
      inStock: true,
      colors: ["Brown", "Black"],
      sizes: ["One Size"]
    },
    {
      id: 5,
      name: "Wireless Charging Pad",
      price: 39.99,
      originalPrice: 59.99,
      category: "electronics",
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400",
      description: "Fast wireless charging pad compatible with all Qi-enabled devices.",
      rating: 4.2,
      reviews: 45,
      inStock: true,
      colors: ["White", "Black"],
      sizes: ["One Size"]
    },
    {
      id: 6,
      name: "Denim Jacket",
      price: 89.99,
      originalPrice: 119.99,
      category: "clothing",
      image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=400",
      description: "Classic denim jacket with modern fit and comfortable design.",
      rating: 4.6,
      reviews: 134,
      inStock: true,
      colors: ["Blue", "Black"],
      sizes: ["S", "M", "L", "XL"]
    },
    {
      id: 7,
      name: "Sunglasses",
      price: 149.99,
      originalPrice: 199.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400",
      description: "Premium polarized sunglasses with UV protection.",
      rating: 4.8,
      reviews: 89,
      inStock: true,
      colors: ["Black", "Brown", "Gray"],
      sizes: ["One Size"]
    },
    {
      id: 8,
      name: "Smartphone Case",
      price: 19.99,
      originalPrice: 29.99,
      category: "accessories",
      image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
      description: "Durable and stylish smartphone case with drop protection.",
      rating: 4.1,
      reviews: 203,
      inStock: true,
      colors: ["Clear", "Black", "Blue", "Pink"],
      sizes: ["iPhone 13", "iPhone 14", "Samsung Galaxy"]
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(mockProducts);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
      default:
        return a.name.localeCompare(b.name);
    }
  });

  const getProductById = (id) => {
    return products.find(product => product.id === parseInt(id));
  };

  const getCategories = () => {
    const categories = [...new Set(products.map(product => product.category))];
    return categories;
  };

  const value = {
    products: sortedProducts,
    allProducts: products,
    loading,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    getProductById,
    getCategories
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}; 
import React, { createContext, useContext, useState, useEffect } from 'react';

const ReviewContext = createContext();

export const useReviews = () => {
  const context = useContext(ReviewContext);
  if (!context) {
    throw new Error('useReviews must be used within a ReviewProvider');
  }
  return context;
};

export const ReviewProvider = ({ children }) => {
  const [reviews, setReviews] = useState({});

  // Load reviews from localStorage on mount
  useEffect(() => {
    const savedReviews = localStorage.getItem('reviews');
    if (savedReviews) {
      setReviews(JSON.parse(savedReviews));
    }
  }, []);

  // Save reviews to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('reviews', JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (productId, review) => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [productId]: [
        ...(prevReviews[productId] || []),
        {
          id: Date.now(),
          ...review,
          date: new Date().toISOString()
        }
      ]
    }));
  };

  const getProductReviews = (productId) => {
    return reviews[productId] || [];
  };

  const getAverageRating = (productId) => {
    const productReviews = reviews[productId] || [];
    if (productReviews.length === 0) return 0;
    
    const totalRating = productReviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / productReviews.length).toFixed(1);
  };

  const deleteReview = (productId, reviewId) => {
    setReviews(prevReviews => ({
      ...prevReviews,
      [productId]: prevReviews[productId]?.filter(review => review.id !== reviewId) || []
    }));
  };

  const value = {
    reviews,
    addReview,
    getProductReviews,
    getAverageRating,
    deleteReview
  };

  return (
    <ReviewContext.Provider value={value}>
      {children}
    </ReviewContext.Provider>
  );
}; 
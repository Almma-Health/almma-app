// Development API URL
const DEV_API_URL = 'http://localhost:5000/api';

// Production API URL (you'll need to update this with your actual API URL)
const PROD_API_URL = 'https://your-production-api.com/api';

// Use development URL in development, production URL in production
const API_URL = __DEV__ ? DEV_API_URL : PROD_API_URL;

export const ENDPOINTS = {
  submitReview: `${API_URL}/submit-review`,
  getReviews: `${API_URL}/past-reviews`,
};

export default API_URL; 
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API service functions
export const portfolioAPI = {
  // Get portfolio content (personal info, home, about)
  getPortfolio: async (language = 'en') => {
    try {
      const response = await apiClient.get(`/portfolio?lang=${language}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch portfolio data');
    }
  },

  // Get timeline/experience data
  getTimeline: async (language = 'en') => {
    try {
      const response = await apiClient.get(`/timeline?lang=${language}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch timeline data');
    }
  },

  // Get projects data
  getProjects: async (language = 'en', featuredOnly = false) => {
    try {
      const response = await apiClient.get(`/projects?lang=${language}&featured_only=${featuredOnly}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch projects data');
    }
  },

  // Get blog posts
  getBlogPosts: async (language = 'en', limit = 10, skip = 0) => {
    try {
      const response = await apiClient.get(`/blog?lang=${language}&limit=${limit}&skip=${skip}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch blog posts');
    }
  },

  // Get single blog post by slug
  getBlogPost: async (slug, language = 'en') => {
    try {
      const response = await apiClient.get(`/blog/${slug}?lang=${language}`);
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch blog post');
    }
  },

  // Submit contact form
  submitContact: async (contactData) => {
    try {
      const response = await apiClient.post('/contact', contactData);
      return response.data;
    } catch (error) {
      throw new Error('Failed to submit contact form');
    }
  },

  // Subscribe to newsletter
  subscribeNewsletter: async (email) => {
    try {
      const response = await apiClient.post('/newsletter', { email });
      return response.data;
    } catch (error) {
      throw new Error('Failed to subscribe to newsletter');
    }
  },

  // Health check
  healthCheck: async () => {
    try {
      const response = await apiClient.get('/health');
      return response.data;
    } catch (error) {
      throw new Error('API health check failed');
    }
  }
};

export default portfolioAPI;
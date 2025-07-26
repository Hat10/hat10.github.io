import { useState, useEffect } from 'react';
import { portfolioAPI } from '../services/api';

export const usePortfolio = (language = 'en') => {
  const [portfolioData, setPortfolioData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getPortfolio(language);
        setPortfolioData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching portfolio:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPortfolio();
  }, [language]);

  return { portfolioData, loading, error };
};

export const useTimeline = (language = 'en') => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeline = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getTimeline(language);
        setTimelineData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching timeline:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTimeline();
  }, [language]);

  return { timelineData, loading, error };
};

export const useProjects = (language = 'en', featuredOnly = false) => {
  const [projectsData, setProjectsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getProjects(language, featuredOnly);
        setProjectsData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, [language, featuredOnly]);

  return { projectsData, loading, error };
};

export const useBlog = (language = 'en', limit = 10) => {
  const [blogData, setBlogData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await portfolioAPI.getBlogPosts(language, limit);
        setBlogData(data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching blog posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [language, limit]);

  return { blogData, loading, error };
};

export default usePortfolio;
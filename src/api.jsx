export const fetchAPI = async (url, options = {}) => {
    try {
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`,
          ...options.headers,
        },
        ...options,
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
  
      return await response.json();
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };
  
/**
 * Utility to get the correct URL for images stored on the backend.
 * Uses the VITE_API_URL environment variable to determine the backend base URL.
 */
export const getImageUrl = (path) => {
    if (!path) return '';
    
    // If it's already a full URL, just return it
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path;
    }

    // Get the base API URL (e.g., https://your-backend.onrender.com/api)
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    
    // Normalize: remove trailing slash, then remove /api if it exists at the end
    const backendUrl = apiUrl.replace(/\/$/, '').replace(/\/api$/, '');

    // Ensure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${backendUrl}${normalizedPath}`;
};

export default getImageUrl;

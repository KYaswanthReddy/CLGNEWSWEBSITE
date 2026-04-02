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
    
    // The backend serves static files from the root `/uploads` directory.
    // We need the backend core URL (without the /api suffix).
    const backendUrl = apiUrl.endsWith('/api') 
        ? apiUrl.slice(0, -4) 
        : apiUrl;

    // Ensure the path starts with a slash
    const normalizedPath = path.startsWith('/') ? path : `/${path}`;

    return `${backendUrl}${normalizedPath}`;
};

export default getImageUrl;

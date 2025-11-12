export const getUrl = (path: string = "") => {
    const baseUrl = process.env.TEST_ENV === "production" 
        ? "https://profile-next-kappa.vercel.app"
        : "http://localhost:3002";
    
    // Ensure path starts with / if provided
    const normalizedPath = path && !path.startsWith("/") ? `/${path}` : path;
    
    return `${baseUrl}${normalizedPath}`;
}
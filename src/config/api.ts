// Dynamic API URL based on environment
export const API_URL = (() => {
  const hostname = window.location.hostname;
  const protocol = window.location.protocol;
  const envUrl = import.meta.env.VITE_API_URL;
  
  console.log('API_URL Detection:', { hostname, protocol, envUrl });
  
  // If running on localhost (dev mode), use local backend
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    console.log('Using localhost backend');
    return 'http://localhost:3001';
  }
  
  // If accessing via ngrok (HTTPS), use the same ngrok URL
  if (hostname.includes('ngrok') || protocol === 'https:') {
    const baseUrl = `${protocol}//${hostname}`;
    console.log('Using ngrok/HTTPS URL:', baseUrl);
    return baseUrl;
  }
  
  // If we have a VITE_API_URL in env, use it
  if (envUrl) {
    console.log('Using env API URL:', envUrl);
    return envUrl;
  }
  
  // Fallback: use same host with port 3001
  const fallback = `http://${hostname}:3001`;
  console.log('Using fallback:', fallback);
  return fallback;
})();
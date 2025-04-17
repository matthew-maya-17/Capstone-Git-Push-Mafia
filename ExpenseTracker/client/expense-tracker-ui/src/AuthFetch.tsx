export function AuthFetch(url: string, options: RequestInit = {}): Promise<Response> {
    // Get jwtToken from localStorage
    const token = localStorage.getItem("jwtToken");
  
    if (!token) {
      return Promise.reject("No token found");
    }
  
    // Default headers we want on every request
    const defaultHeaders: HeadersInit = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  
    // Merge the passed options with default headers
    const allOptions: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...(options.headers || {}),
      },
    };
  
    // Return the URL with all the options we want
    return fetch(url, allOptions);
  }
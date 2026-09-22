/**
 * Central API Client for FoodCanvas
 * 
 * Replaces scattered fetch() calls across the application with a single,
 * robust, backend-aware HTTP client. This prevents Next.js proxy route anomalies,
 * standardizes credentials (cookies), and normalizes error handling.
 */

export const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions extends RequestInit {
  data?: any;
}

export class ApiError extends Error {
  public status: number;
  public data: any;

  constructor(status: number, message: string, data?: any) {
    super(message);
    this.status = status;
    this.data = data;
    this.name = "ApiError";
  }
}

/**
 * Normalizes the URL, ensuring it points to the direct backend if an absolute path is not provided.
 */
function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  
  // Clean endpoint
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  // Enforce /api/ prefix if it's missing (assuming all backend routes use it)
  // But be flexible in case it already includes it.
  if (cleanEndpoint.startsWith("/api/")) {
    return `${BACKEND_URL}${cleanEndpoint}`;
  } else {
    return `${BACKEND_URL}/api${cleanEndpoint}`;
  }
}

async function request<T>(endpoint: string, method: HttpMethod, options: RequestOptions = {}): Promise<T> {
  const url = resolveUrl(endpoint);
  
  const headers = new Headers(options.headers || {});
  
  if (options.data && !(options.data instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const fetchOptions: RequestInit = {
    ...options,
    method,
    headers,
    credentials: options.credentials ?? "include", // Ensure cookies are sent to backend
  };

  if (options.data) {
    fetchOptions.body = options.data instanceof FormData 
      ? options.data 
      : JSON.stringify(options.data);
  }

  try {
    const response = await fetch(url, fetchOptions);
    
    // Check if the response has content
    const text = await response.text();
    let data;
    
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = text;
    }

    if (!response.ok) {
      throw new ApiError(response.status, data.message || data.error || "API Request Failed", data);
    }

    return data as T;
  } catch (error: any) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, error.message || "Network Error");
  }
}

export const apiClient = {
  get: <T>(endpoint: string, options?: Omit<RequestOptions, "data">) => 
    request<T>(endpoint, "GET", options),
  
  post: <T>(endpoint: string, data?: any, options?: RequestOptions) => 
    request<T>(endpoint, "POST", { ...options, data }),
    
  put: <T>(endpoint: string, data?: any, options?: RequestOptions) => 
    request<T>(endpoint, "PUT", { ...options, data }),
    
  patch: <T>(endpoint: string, data?: any, options?: RequestOptions) => 
    request<T>(endpoint, "PATCH", { ...options, data }),
    
  delete: <T>(endpoint: string, options?: Omit<RequestOptions, "data">) => 
    request<T>(endpoint, "DELETE", options),
};

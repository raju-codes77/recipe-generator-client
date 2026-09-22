/**
 * Central API Client for FoodCanvas
 * 
 * Replaces scattered fetch() calls across the application with a single,
 * robust, backend-aware HTTP client. This prevents Next.js proxy route anomalies,
 * standardizes credentials (cookies), and normalizes error handling.
 */

const rawBackendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
export const BACKEND_URL = rawBackendUrl.endsWith("/") ? rawBackendUrl.slice(0, -1) : rawBackendUrl;

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
 * Normalizes the URL to a relative path to leverage Next.js API rewrites.
 * This guarantees the browser sends first-party cookies (preventing 3rd-party cookie blocking).
 */
function resolveUrl(endpoint: string): string {
  if (endpoint.startsWith("http://") || endpoint.startsWith("https://")) {
    return endpoint;
  }
  
  // Clean endpoint
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
  
  if (cleanEndpoint.startsWith("/api/")) {
    return cleanEndpoint;
  } else {
    return `/api${cleanEndpoint}`;
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
    
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>(endpoint, "DELETE", options),
};

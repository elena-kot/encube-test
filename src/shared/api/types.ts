/**
 * Supported HTTP methods for the API client.
 */
export type HttpMethod = {
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE';
};

/**
 * Configuration for a single API request.
 */
export type RequestConfig = {
  readonly headers?: Record<string, string>;
  readonly params?: Record<string, string>;
  readonly signal?: AbortSignal;
};

/**
 * A structured API error with status and parsed body.
 */
export type ApiError = {
  readonly status: number;
  readonly message: string;
  readonly code: string;
};

/**
 * The shape of error responses from the backend.
 */
export type ApiErrorResponse = {
  readonly error: string;
  readonly code: string;
};

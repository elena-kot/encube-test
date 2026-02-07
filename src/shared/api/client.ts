import type { ApiError, ApiErrorResponse, RequestConfig } from '@/shared/api/types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

const DEFAULT_HEADERS: Record<string, string> = {
  'Content-Type': 'application/json',
  'Accept': 'application/json',
};

/**
 * Builds a URL with base path and optional query parameters.
 */
function buildUrl(path: string, params?: Record<string, string>): string {
  const url = new URL(`${BASE_URL}${path}`, window.location.origin);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

/**
 * Parses an error response into a structured ApiError.
 */
async function parseErrorResponse(response: Response): Promise<ApiError> {
  try {
    const body = (await response.json()) as ApiErrorResponse;

    return {
      status: response.status,
      message: body.error,
      code: body.code,
    };
  } catch {
    return {
      status: response.status,
      message: response.statusText,
      code: 'UNKNOWN_ERROR',
    };
  }
}

/**
 * Core request function. All public methods delegate here.
 */
async function request<TResponse, TBody = undefined>(
  method: string,
  path: string,
  config?: RequestConfig,
  body?: TBody,
): Promise<TResponse> {
  const url = buildUrl(path, config?.params);

  const response = await fetch(url, {
    method,
    headers: { ...DEFAULT_HEADERS, ...config?.headers },
    body: body !== undefined ? JSON.stringify(body) : undefined,
    signal: config?.signal,
  });

  if (!response.ok) {
    throw await parseErrorResponse(response);
  }

  // 204 No Content
  if (response.status === 204) {
    return undefined as TResponse;
  }

  return (await response.json()) as TResponse;
}

/**
 * Centralized, typed HTTP client.
 *
 * Every method returns a Promise of the expected response shape.
 * Feature services provide the infrastructure-to-domain mapping on top.
 *
 * @example
 * ```ts
 * const raw = await apiClient.get<DesignElementRaw[]>('/design/elements');
 * ```
 */
export const apiClient = {
  get<TResponse>(path: string, config?: RequestConfig): Promise<TResponse> {
    return request<TResponse>('GET', path, config);
  },

  post<TResponse, TBody>(path: string, body: TBody, config?: RequestConfig): Promise<TResponse> {
    return request<TResponse, TBody>('POST', path, config, body);
  },

  put<TResponse, TBody>(path: string, body: TBody, config?: RequestConfig): Promise<TResponse> {
    return request<TResponse, TBody>('PUT', path, config, body);
  },

  delete<TResponse = void>(path: string, config?: RequestConfig): Promise<TResponse> {
    return request<TResponse>('DELETE', path, config);
  },
} as const;

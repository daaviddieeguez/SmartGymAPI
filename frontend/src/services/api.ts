import { getToken, refreshAccessToken } from "../actions/auth";

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL

export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
};

export const getAuthHeaders = async () => {
  const token = await getToken();

  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const apiFetch = async (input: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
  const authHeaders = await getAuthHeaders();

  let response = await fetch(input, {
    ...init,
    headers: {
      ...authHeaders,
      ...init?.headers,
    },
  });

  if (response.status === 401 || response.status === 403) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      const newAuthHeaders = await getAuthHeaders();
      response = await fetch(input, {
        ...init,
        headers: {
          ...newAuthHeaders,
          ...init?.headers,
        },
      });
    } else {
      if (typeof window !== "undefined") {
        window.location.href = "/login";
      } else {
        const { redirect } = require("next/navigation");
        redirect("/login");
      }
    }
  }

  return response;
};
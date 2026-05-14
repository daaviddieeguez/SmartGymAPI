import { getToken } from "../actions/auth";

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
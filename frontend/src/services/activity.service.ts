import { Activity, ActivityRequest, PageResponse } from "../types";
import { API_BASE_URL, getAuthHeaders } from "./api";

const ENDPOINT = `${API_BASE_URL}/activities`;

export const ActivityService = {
  // GET: Fetch all activities
  getAll: async (page: number = 0, size: number = 9): Promise<PageResponse<Activity>> => {
      const response = await fetch(`${ENDPOINT}?page=${page}&size=${size}`, {
        headers: await getAuthHeaders(),
      });
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  

  // GET: Fetch a single activity by ID
  getById: async (id: number): Promise<Activity> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      headers: await getAuthHeaders(),
    });
    if (!response.ok) throw new Error(`Failed to fetch activity with id ${id}`);
    return response.json();
  },

  // PUT: Send the updated data to the server
  update: async (id: number, activity: ActivityRequest) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: await getAuthHeaders(),
      body: JSON.stringify(activity),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  },

  // POST: Create a new activity
  create: async (activity: Omit<Activity, "id">): Promise<Activity> => {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: await getAuthHeaders(),
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error("Failed to create activity");
    return response.json();
  },

  // DELETE: Remove an activity
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
      headers: await getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to delete activity");
  },

  getMembers: async (id: number) => {
    const response = await fetch(`${ENDPOINT}/${id}/members`, {
      headers: await getAuthHeaders(),
    });
    if (!response.ok) throw new Error("Failed to fetch enrolled members");
    return response.json();
  },

  // --- VOTING ---
  addVote: async (id: number, score: number) => {
    const response = await fetch(`${ENDPOINT}/${id}/votes/${score}`, {
      method: "POST",
      headers: await getAuthHeaders(),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || "Failed to submit rating");
    }
    
    return response.json();
  },
};
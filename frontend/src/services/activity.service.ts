import { Activity, ActivityRequest, PageResponse } from "../types";
import { API_BASE_URL, DEFAULT_HEADERS } from "./api";

const ENDPOINT = `${API_BASE_URL}/activities`;

export const ActivityService = {
  // GET: Fetch all activities
  getAll: async (page: number = 0): Promise<PageResponse<Activity>> => {
      const response = await fetch(`${ENDPOINT}?page=${page}&size=9`);
      if (!response.ok) throw new Error("Failed to fetch activities");
      return response.json();
    },
  

  // GET: Fetch a single activity by ID
  getById: async (id: number): Promise<Activity> => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch activity with id ${id}`);
    return response.json();
  },

  // PUT: Send the updated data to the server
  update: async (id: number, activity: ActivityRequest) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(activity),
    });
    if (!response.ok) throw new Error("Failed to create activity");
    return response.json();
  },

  // DELETE: Remove an activity
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete activity");
  },
};

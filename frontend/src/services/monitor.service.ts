import { Monitor, PageResponse, PersonRequest } from "../types";
import { API_BASE_URL, DEFAULT_HEADERS } from "./api";

const ENDPOINT = `${API_BASE_URL}/monitors`;

export const MonitorService = {
  // GET: Fetch all monitors
  getAll: async (page: number = 0, size: number = 9): Promise<PageResponse<Monitor>> => {
    const response = await fetch(`${ENDPOINT}?page=${page}&size=${size}`);
    if (!response.ok) throw new Error("Failed to fetch monitors");
    return response.json();
  },

  // GET: Fetch a single monitor by ID
  getById: async (id: number): Promise<Monitor> => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch monitor with id ${id}`);
    return response.json();
  },

  // PUT: Send the updated data to the server
  update: async (id: number, monitor: PersonRequest) => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monitor),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  },

  // POST: Create a new monitor
  create: async (monitor: Omit<Monitor, "id">): Promise<Monitor> => {
    const response = await fetch(ENDPOINT, {
      method: "POST",
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(monitor),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw errorData; 
    }

    return response.json();
  },

  // DELETE: Remove a monitor
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete monitor");
  },

  // --- REGISTRATIONS ---
  getActivities: async (id: number) => {
    const res = await fetch(`${ENDPOINT}/${id}/activities`, { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to fetch monitor activities");
    return res.json();
  },

  addActivity: async (id: number, activityId: number) => {
    const res = await fetch(`${ENDPOINT}/${id}/activities/${activityId}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to assign activity");
    return res.json();
  },

  removeActivity: async (id: number, activityId: number) => {
    const res = await fetch(`${ENDPOINT}/${id}/activities/${activityId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove activity");
    return res.json();
  }
};

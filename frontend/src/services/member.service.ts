import { Member, PageResponse, PersonRequest } from "../types";
import { API_BASE_URL, apiFetch } from "./api";

const ENDPOINT = `${API_BASE_URL}/members`;

export const MemberService = {
  // GET: Fetch all members
  getAll: async (
    page: number = 0,
    size: number = 9,
  ): Promise<PageResponse<Member>> => {
    const response = await apiFetch(`${ENDPOINT}?page=${page}&size=${size}`);
    if (!response.ok) throw new Error("Failed to fetch members");
    return response.json();
  },

  // GET: Fetch a single member by ID
  getById: async (id: number): Promise<Member> => {
    const response = await apiFetch(`${ENDPOINT}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch member with ID ${id}`);
    return response.json();
  },

  // PUT: Send the updated data to the server
  update: async (id: number, member: PersonRequest) => {
    const response = await apiFetch(`${ENDPOINT}/${id}`, {
      method: "PUT",
      body: JSON.stringify(member),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  },

  // POST: Create a new member
  create: async (member: Omit<PersonRequest, "id">): Promise<Member> => {
    const response = await apiFetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(member),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  },

  // DELETE: Remove a member
  delete: async (id: number): Promise<void> => {
    const response = await apiFetch(`${ENDPOINT}/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to delete member");
  },

  // --- REGISTRATIONS ---
  getActivities: async (id: number) => {
    const res = await apiFetch(`${ENDPOINT}/${id}/activities`, {
      cache: "no-store",
    });
    if (!res.ok) throw new Error("Failed to fetch member activities");
    return res.json();
  },

  addActivity: async (id: number, activityId: number) => {
    const res = await apiFetch(`${ENDPOINT}/${id}/activities/${activityId}`, {
      method: "POST",
    });
    if (!res.ok) throw new Error("Failed to assign activity");
    return res.json();
  },

  removeActivity: async (id: number, activityId: number) => {
    const res = await apiFetch(`${ENDPOINT}/${id}/activities/${activityId}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("Failed to remove activity");
    return res.json();
  },
};

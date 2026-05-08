import { Member } from '../types';
import { API_BASE_URL, DEFAULT_HEADERS } from './api';

const ENDPOINT = `${API_BASE_URL}/members`;

export const MemberService = {
  
  // GET: Fetch all members
  getAll: async (): Promise<Member[]> => {
    const response = await fetch(ENDPOINT);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },

  // GET: Fetch a single member by ID
  getById: async (id: number): Promise<Member> => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch member with id ${id}`);
    return response.json();
  },

  // POST: Create a new member
  create: async (member: Omit<Member, 'id'>): Promise<Member> => {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(member),
    });
    if (!response.ok) throw new Error('Failed to create member');
    return response.json();
  },

  // DELETE: Remove a member
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete member');
  }
};
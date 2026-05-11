import { Member, PageResponse, PersonRequest } from '../types';
import { API_BASE_URL, DEFAULT_HEADERS } from './api';

const ENDPOINT = `${API_BASE_URL}/members`;

export const MemberService = {
  
  // GET: Fetch all members
  getAll: async (page: number = 0): Promise<PageResponse<Member>> => {
    const response = await fetch(`${ENDPOINT}?page=${page}&size=9`);
    if (!response.ok) throw new Error('Failed to fetch members');
    return response.json();
  },

  // GET: Fetch a single member by ID
  getById: async (dni: string): Promise<Member> => {
    const response = await fetch(`${ENDPOINT}/${dni}`);
    if (!response.ok) throw new Error(`Failed to fetch member with dni ${dni}`);
    return response.json();
  },

  // POST: Create a new member
  create: async (member: Omit<PersonRequest, 'id'>): Promise<Member> => {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
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
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete member');
  }
};
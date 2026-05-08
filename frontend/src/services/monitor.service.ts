import { Monitor } from '../types';
import { API_BASE_URL, DEFAULT_HEADERS } from './api';

const ENDPOINT = `${API_BASE_URL}/monitors`;

export const MonitorService = {
  
  // GET: Fetch all monitors
  getAll: async (): Promise<Monitor[]> => {
    const response = await fetch(ENDPOINT);
    if (!response.ok) throw new Error('Failed to fetch monitors');
    return response.json();
  },

  // GET: Fetch a single monitor by ID
  getById: async (id: number): Promise<Monitor> => {
    const response = await fetch(`${ENDPOINT}/${id}`);
    if (!response.ok) throw new Error(`Failed to fetch monitor with id ${id}`);
    return response.json();
  },

  // POST: Create a new monitor
  create: async (monitor: Omit<Monitor, 'id'>): Promise<Monitor> => {
    const response = await fetch(ENDPOINT, {
      method: 'POST',
      headers: DEFAULT_HEADERS,
      body: JSON.stringify(monitor),
    });
    if (!response.ok) throw new Error('Failed to create monitor');
    return response.json();
  },

  // DELETE: Remove a monitor
  delete: async (id: number): Promise<void> => {
    const response = await fetch(`${ENDPOINT}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete monitor');
  }
};
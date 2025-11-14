/*
 * Simple state management for the mobile app using Zustand.
 *
 * This store holds user data, lists of jobs and invoices, chat messages and
 * membership details.  It also defines asynchronous actions to fetch these
 * resources from the backend API.  The API base URL can be configured via
 * the `EXPO_PUBLIC_API_URL` environment variable (Expo convention) or
 * defaults to http://localhost:8000 for local development.
 */

import create from 'zustand';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8000';

export const useStore = create((set, get) => ({
  // State
  user: null,
  jobs: [],
  invoices: [],
  messages: [],
  membership: null,
  promos: [],
  faqs: [],

  // Actions
  fetchUser: async () => {
    try {
      const res = await fetch(`${API_URL}/me`);
      const data = await res.json();
      set({ user: data });
    } catch (err) {
      console.error('Error fetching user:', err);
    }
  },
  fetchJobs: async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`);
      const data = await res.json();
      set({ jobs: data });
    } catch (err) {
      console.error('Error fetching jobs:', err);
    }
  },
  fetchInvoices: async () => {
    try {
      const res = await fetch(`${API_URL}/invoices`);
      const data = await res.json();
      set({ invoices: data });
    } catch (err) {
      console.error('Error fetching invoices:', err);
    }
  },
  fetchMembership: async () => {
    try {
      const res = await fetch(`${API_URL}/membership`);
      const data = await res.json();
      set({ membership: data });
    } catch (err) {
      console.error('Error fetching membership:', err);
    }
  },
  fetchPromos: async () => {
    try {
      const res = await fetch(`${API_URL}/promos`);
      const data = await res.json();
      set({ promos: data });
    } catch (err) {
      console.error('Error fetching promos:', err);
    }
  },
  fetchFaqs: async () => {
    try {
      const res = await fetch(`${API_URL}/faqs`);
      const data = await res.json();
      set({ faqs: data });
    } catch (err) {
      console.error('Error fetching FAQs:', err);
    }
  },
  fetchMessages: async (jobId) => {
    // Currently no GET /messages endpoint; using dummy data
    set({ messages: [] });
  },
  sendMessage: async (jobId, sender, text) => {
    try {
      const res = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: jobId, sender, text, media: [] }),
      });
      const data = await res.json();
      // Append to local message list
      const msgs = get().messages;
      set({ messages: [...msgs, data] });
    } catch (err) {
      console.error('Error sending message:', err);
    }
  },
}));
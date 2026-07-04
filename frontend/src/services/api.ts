// API service - connects frontend to Go backend

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

// ─── Auth Token Management ───────────────────────────────────────────────────

export const getToken = () => localStorage.getItem('rb_token');
export const getRefreshToken = () => localStorage.getItem('rb_refresh_token');

export const setTokens = (token: string, refreshToken: string) => {
  localStorage.setItem('rb_token', token);
  localStorage.setItem('rb_refresh_token', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('rb_token');
  localStorage.removeItem('rb_refresh_token');
  localStorage.removeItem('rb_user');
};

export const setUser = (user: { id: string; name: string; email: string }) => {
  localStorage.setItem('rb_user', JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem('rb_user');
  if (!raw) return null;
  try { return JSON.parse(raw); } catch { return null; }
};

// ─── HTTP Client ─────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {},
  retry = true
): Promise<T> {
  const token = getToken();
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });

  // Token expired → try refresh
  if (res.status === 401 && retry) {
    const refreshed = await tryRefreshToken();
    if (refreshed) return request<T>(path, options, false);
    clearTokens();
    window.location.href = '/login';
    throw new Error('Session expired');
  }

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error((data as any).error || `Request failed: ${res.status}`);
  }

  return data as T;
}

async function tryRefreshToken(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const data = await res.json();
    localStorage.setItem('rb_token', data.token);
    return true;
  } catch {
    return false;
  }
}

// ─── Auth API ─────────────────────────────────────────────────────────────────

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: { id: string; name: string; email: string };
}

export const authAPI = {
  register: (name: string, email: string, password: string) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    }),

  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  getMe: () => request<{ id: string; name: string; email: string }>('/me'),
};

// ─── Resume API ───────────────────────────────────────────────────────────────

import type { ResumeData } from '@/types/resume';

export interface ResumeListItem {
  id: string;
  title: string;
  template: string;
  updatedAt: string;
  createdAt: string;
  lastSavedAt: string;
  data: { personalInfo: { fullName: string } };
}

export interface ResumeDoc extends ResumeListItem {
  data: ResumeData & { personalInfo: { fullName: string } };
}

export const resumeAPI = {
  list: () => request<{ resumes: ResumeListItem[] }>('/resumes'),

  get: (id: string) => request<ResumeDoc>(`/resumes/${id}`),

  create: (title: string, template: string, data: ResumeData) =>
    request<ResumeDoc>('/resumes', {
      method: 'POST',
      body: JSON.stringify({ title, template, data }),
    }),

  update: (id: string, title: string, template: string, data: ResumeData) =>
    request<{ message: string; lastSavedAt: string }>(`/resumes/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ title, template, data }),
    }),

  autoSave: (id: string, template: string, data: ResumeData) =>
    request<{ lastSavedAt: string }>(`/resumes/${id}/autosave`, {
      method: 'PUT',
      body: JSON.stringify({ template, data }),
    }),

  delete: (id: string) =>
    request<{ message: string }>(`/resumes/${id}`, { method: 'DELETE' }),
};

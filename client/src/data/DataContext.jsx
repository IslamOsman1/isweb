import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { defaultContent } from './defaultContent';

const STORAGE_KEY = 'isweb_content_v3';
const API_URL = import.meta.env.VITE_API_URL || '/api';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || 'admin123';
const DataContext = createContext(null);

const makeId = (prefix) => `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2, 7)}`;

function mergeContent(base, incoming) {
  return { ...base, ...incoming, settings: { ...base.settings, ...(incoming?.settings || {}) }, jobs: incoming?.jobs || base.jobs || [] };
}

export const getAdminPassword = () => ADMIN_PASSWORD;

async function api(path, options = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', 'x-admin-password': ADMIN_PASSWORD },
    ...options,
  });
  const text = await res.text();
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }
  if (!res.ok) {
    const message = data?.error || data || `API request failed: ${res.status} ${res.statusText}`;
    throw new Error(message);
  }
  return data;
}

export function DataProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return mergeContent(defaultContent, saved || {});
    } catch {
      return defaultContent;
    }
  });
  const [isOnlineDb, setIsOnlineDb] = useState(false);

  useEffect(() => {
    api('/content')
      .then((data) => {
        if (data) {
          const merged = mergeContent(defaultContent, data);
          setContent(merged);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
          setIsOnlineDb(true);
        }
      })
      .catch(() => setIsOnlineDb(false));
  }, []);

  const persist = async (next) => {
    setContent(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    try {
      const result = await api('/content', { method: 'PUT', body: JSON.stringify(next) });
      if (result) {
        setIsOnlineDb(true);
        console.log('✅ Data saved to MongoDB');
      }
    } catch (error) {
      setIsOnlineDb(false);
      console.warn('⚠️ Failed to save to MongoDB. Data saved locally only.', error.message || error);
    }
  };

  const addItem = (section, item) => persist({ ...content, [section]: [{ ...item, id: makeId(section) }, ...(content[section] || [])] });
  const updateItem = (section, id, patch) => persist({ ...content, [section]: (content[section] || []).map((item) => item.id === id ? { ...item, ...patch } : item) });
  const deleteItem = (section, id) => persist({ ...content, [section]: (content[section] || []).filter((item) => item.id !== id) });
  const updateSettings = (patch) => persist({ ...content, settings: { ...content.settings, ...patch } });
  const addRequest = (request) => addItem('requests', { ...request, status: 'new', budget: request.budget || '-', createdAt: new Date().toISOString().slice(0, 10) });

  const uploadImage = async (file) => {
    const toDataUrl = (selectedFile) => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(selectedFile);
    });
    const fileData = await toDataUrl(file);
    try {
      const result = await api('/upload', { method: 'POST', body: JSON.stringify({ file: fileData, folder: 'isweb-studio' }) });
      return result.url;
    } catch (error) {
      return fileData;
    }
  };

  const value = useMemo(() => ({ content, isOnlineDb, addItem, updateItem, deleteItem, updateSettings, addRequest, uploadImage, persist }), [content, isOnlineDb]);
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useSiteData = () => useContext(DataContext);

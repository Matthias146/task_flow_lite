import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  getItem(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Storage getItem failed:', error);
      return null;
    }
  }

  setItem(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch (error) {
      console.error('Storage setItem failed:', error);
    }
  }

  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Storage removeItem failed:', error);
    }
  }

  getJson<T>(key: string): T | null {
    const raw = this.getItem(key);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as T;
    } catch (error) {
      console.error('Storage getJson parse failed:', error);
      return null;
    }
  }

  setJson<T>(key: string, value: T): void {
    try {
      const raw = JSON.stringify(value);
      this.setItem(key, raw);
    } catch (error) {
      console.error('Storage setJson stringify failed:', error);
    }
  }
}

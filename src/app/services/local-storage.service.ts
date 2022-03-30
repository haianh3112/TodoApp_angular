import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  storage: Storage;
  constructor() {
    this.storage = window.localStorage;
  }

  setObject(key: string, value: any) {
    if (!value) {
      return;
    }
    return (this.storage[key] = JSON.stringify(value));
  }

  getValue(key: string) {
    const obj = JSON.parse(this.storage[key] || null);
    return obj || null;
  }

  remove(key: string) {
    return this.storage.removeItem(key);
  }
  
}

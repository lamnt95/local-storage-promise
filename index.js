class LocalStorage {
  constructor() {
    this.localStorage = window.localStorage;
  }

  clear() {
    this.localStorage.clear();
  }

  length() {
    return this.localStorage.length;
  }

  async set(key, value) {
    try {
      await this.localStorage.setItem(key, value);
      const item = await this.localStorage.getItem(key);
      return { key, value: item };
    } catch (e) {
      return e;
    }
  }

  async get(key) {
    try {
      const value = await this.localStorage.getItem(key);
      return { key, value };
    } catch (e) {
      return e;
    }
  }

  async remove(key) {
    try {
      const value = await this.localStorage.getItem(key);
      await this.localStorage.removeItem(key);
      return { key, value };
    } catch (e) {
      return e;
    }
  }

  async getAll() {
    try {
      const length = this.localStorage.length;
      let keys = [];
      for (let i = 0; i < length; i += 1) {
        const key = this.localStorage.key(i);
        if (key === null) break;
        const value = await this.localStorage.getItem(key);
        keys.push({ key, value });
      }
      return keys;
    } catch (e) {
      return e;
    }
  }

  async keys() {
    try {
      const length = this.localStorage.length;
      let keys = [];
      for (let i = 0; i < length; i += 1) {
        const key = this.localStorage.key(i);
        if (key === null) break;
        keys.push(key);
      }
      return keys;
    } catch (e) {
      return e;
    }
  }

  async values() {
    const keys = await this.keys();
    if (keys.length === 0) return [];
    const values = keys.map(key => this.localStorage.getItem(key));
    return values;
  }
}

module.exports = LocalStorage;

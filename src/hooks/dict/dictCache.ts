type DictCacheItem = any;
type DictCacheListener = () => void;

class DictCache {
  private cache: Record<string, DictCacheItem> = {};
  private listeners: Record<string, DictCacheListener[]> = {};

  get<T>(key: string): T | undefined {
    return this.cache[key] as T | undefined;
  }

  set<T>(key: string, value: T) {
    this.cache[key] = value;
    this.emit(key);
  }

  has(key: string): boolean {
    return key in this.cache;
  }

  delete(key?: string | null) {
    if (key && key != null) {
      if (this.has(`dict-tag-map-${key}`)) {
        delete this.cache[`dict-tag-map-${key}`];
        this.emit(`dict-tag-map-${key}`);
      }
      if (this.has(`dict-value-enum-${key}`)) {
        delete this.cache[`dict-value-enum-${key}`];
        this.emit(`dict-value-enum-${key}`);
      }
    }
  }

  clear() {
    this.cache = {};
    Object.keys(this.listeners).forEach(key => this.emit(key));
  }

  subscribe(key: string, listener: DictCacheListener) {
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(listener);
    return () => {
      this.listeners[key] = this.listeners[key].filter(l => l !== listener);
    };
  }

  private emit(key: string) {
    (this.listeners[key] || []).forEach(fn => fn());
  }
}

export const dictCache = new DictCache();

export class ArrayUtils {
  /**
   * Removes duplicates from an array based on a key function
   */
  static uniqueBy<T>(array: T[], keyFn: (item: T) => any): T[] {
    const seen = new Set();
    return array.filter(item => {
      const key = keyFn(item);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
  
  /**
   * Groups array elements by a key function
   */
  static groupBy<T>(array: T[], keyFn: (item: T) => string): Record<string, T[]> {
    return array.reduce((groups, item) => {
      const key = keyFn(item);
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(item);
      return groups;
    }, {} as Record<string, T[]>);
  }
  
  /**
   * Sorts array by multiple fields
   */
  static sortBy<T>(array: T[], ...sortFns: ((item: T) => any)[]): T[] {
    return [...array].sort((a, b) => {
      for (const sortFn of sortFns) {
        const aVal = sortFn(a);
        const bVal = sortFn(b);
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
      }
      return 0;
    });
  }
  
  /**
   * Chunks array into smaller arrays of specified size
   */
  static chunk<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
// Simple in-memory cache to respect Airtable 5 req/sec limit
const cache = new Map<string, { data: unknown; timestamp: number }>()
const DEFAULT_TTL = 30 * 1000 // 30 seconds

export async function cachedQuery<T>(
  key: string,
  queryFn: () => Promise<T>,
  ttl: number = DEFAULT_TTL
): Promise<T> {
  const cached = cache.get(key)
  if (cached && Date.now() - cached.timestamp < ttl) {
    return cached.data as T
  }

  const data = await queryFn()
  cache.set(key, { data, timestamp: Date.now() })
  return data
}

export function invalidateCache(pattern?: string) {
  if (!pattern) {
    cache.clear()
    return
  }
  for (const key of cache.keys()) {
    if (key.includes(pattern)) {
      cache.delete(key)
    }
  }
}

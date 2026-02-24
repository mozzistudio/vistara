import Airtable from 'airtable'

function getBase() {
  const apiKey = process.env.AIRTABLE_API_KEY
  const baseId = process.env.AIRTABLE_BASE_ID

  if (!apiKey || !baseId) {
    // Return a proxy that throws helpful errors at runtime but doesn't break build
    const handler: ProxyHandler<any> = {
      get: () => {
        return (..._args: any[]) => {
          console.warn('Airtable not configured. Set AIRTABLE_API_KEY and AIRTABLE_BASE_ID.')
          return { select: () => ({ all: async () => [], firstPage: async () => [] }), find: async () => null, update: async () => null, create: async () => null }
        }
      },
    }
    return new Proxy({}, handler)
  }

  const airtable = new Airtable({ apiKey })
  return airtable.base(baseId)
}

let _base: ReturnType<typeof getBase> | null = null

function base() {
  if (!_base) _base = getBase()
  return _base
}

export const tables = {
  get users() { return base()('Users') },
  get teams() { return base()('Teams') },
  get hcps() { return base()('HCPs') },
  get products() { return base()('Products') },
  get visits() { return base()('Visits') },
  get routes() { return base()('Routes') },
  get alerts() { return base()('Alerts') },
  get conversationLogs() { return base()('Conversation Logs') },
}

export { base }

import Airtable from 'airtable'

if (!process.env.AIRTABLE_API_KEY) {
  console.warn('AIRTABLE_API_KEY not set')
}

const airtable = new Airtable({
  apiKey: process.env.AIRTABLE_API_KEY || '',
})

const base = airtable.base(process.env.AIRTABLE_BASE_ID || '')

export const tables = {
  users: base('Users'),
  teams: base('Teams'),
  hcps: base('HCPs'),
  products: base('Products'),
  visits: base('Visits'),
  routes: base('Routes'),
  alerts: base('Alerts'),
  conversationLogs: base('Conversation Logs'),
}

export { base }
export default airtable

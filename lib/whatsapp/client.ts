const WA_TOKEN = process.env.WHATSAPP_API_TOKEN!
const WA_PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID!

export async function sendWhatsAppMessage(to: string, text: string) {
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${WA_PHONE_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${WA_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { body: text },
      }),
    }
  )
  if (!res.ok) {
    const err = await res.text()
    throw new Error(`WhatsApp send failed: ${err}`)
  }
  return res.json()
}

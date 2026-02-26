// Convert markdown to WhatsApp-friendly plain text with emojis
export function formatForWhatsApp(markdown: string): string {
  return markdown
    .replace(/\*\*(.*?)\*\*/g, '*$1*') // bold → WA bold
    .replace(/^#{1,3}\s+/gm, '')        // remove headings
    .replace(/`{3}[\s\S]*?`{3}/g, '')   // remove code blocks
    .replace(/`([^`]+)`/g, '$1')        // inline code
    .replace(/\|.+\|/g, '')             // remove tables
    .replace(/^\s*[-*]\s/gm, '• ')      // bullet points
    .replace(/\n{3,}/g, '\n\n')         // collapse blank lines
    .trim()
}

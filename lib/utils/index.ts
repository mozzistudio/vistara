export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ')
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleDateString('es-PA', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return d.toLocaleTimeString('es-PA', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function getSegmentColor(segment: string): string {
  switch (segment) {
    case 'A+': return '#22D3EE'
    case 'A': return '#8B5CF6'
    case 'B+': return '#34D399'
    case 'B': return '#FB923C'
    case 'C': return '#94A3B8'
    default: return '#94A3B8'
  }
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'completed': return '#34D399'
    case 'cancelled': return '#EF4444'
    case 'in progress': return '#8B5CF6'
    case 'pending': return '#94A3B8'
    default: return '#94A3B8'
  }
}

export function getSpecialtyIcon(specialty: string): string {
  const lower = specialty.toLowerCase()
  if (lower.includes('cardio')) return '❤️'
  if (lower.includes('endocrin')) return '🧬'
  if (lower.includes('neuro')) return '🧠'
  if (lower.includes('intern')) return '🩺'
  if (lower.includes('neumo') || lower.includes('pulm')) return '🫁'
  if (lower.includes('gastro')) return '🔬'
  if (lower.includes('reuma')) return '🦴'
  return '👨‍⚕️'
}

export function daysAgo(date: string): number {
  const d = new Date(date)
  const now = new Date()
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24))
}

export function getDateRange(range: '7d' | '30d' | '90d' | 'all'): { from: string; to: string } {
  const to = new Date().toISOString().split('T')[0]
  const from = new Date()

  switch (range) {
    case '7d':
      from.setDate(from.getDate() - 7)
      break
    case '30d':
      from.setDate(from.getDate() - 30)
      break
    case '90d':
      from.setDate(from.getDate() - 90)
      break
    case 'all':
      from.setFullYear(from.getFullYear() - 1)
      break
  }

  return { from: from.toISOString().split('T')[0], to }
}

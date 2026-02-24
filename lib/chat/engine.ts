import {
  ChatMessage,
  morningRouteMessage,
  briefingMessage,
  checkinConfirmMessage,
  ratingAckMessage,
  noteSavedMessage,
  cancellationMessage,
  endOfDaySummary,
  helpMessage,
} from './templates'

const visits = [
  { num: 1, name: 'Dr. Ricardo Arias', time: '08:30', specialty: 'Cardiólogo', segment: 'A+' },
  { num: 2, name: 'Dra. Carmen Quintero', time: '09:45', specialty: 'Endocrinóloga', segment: 'A' },
  { num: 3, name: 'Dr. Manuel Espinosa', time: '11:15', specialty: 'Internista', segment: 'B+' },
  { num: 4, name: 'Dr. Alejandro Batista', time: '14:00', specialty: 'Neurólogo', segment: 'A' },
  { num: 5, name: 'Dra. Rosa Moreno', time: '15:30', specialty: 'Cardióloga', segment: 'B' },
]

export function processUserMessage(text: string): ChatMessage | null {
  const lower = text.toLowerCase().trim()

  // Route request
  if (lower.includes('mi ruta') || lower.includes('ruta del día') || lower.includes('quién veo') || lower === '✅ confirmar') {
    return morningRouteMessage()
  }

  // Briefing / prep
  if (lower.startsWith('prep') || lower.includes('briefing')) {
    for (const visit of visits) {
      if (lower.includes(visit.num.toString()) || lower.toLowerCase().includes(visit.name.toLowerCase().split(' ').pop()!)) {
        return briefingMessage(visit.name)
      }
    }
    return briefingMessage(visits[0].name)
  }

  // Check-in / visit complete
  if (lower.includes('visita') && lower.includes('terminada') || lower.includes('check')) {
    const numMatch = lower.match(/\d+/)
    const num = numMatch ? parseInt(numMatch[0]) : 1
    const visit = visits.find(v => v.num === num) || visits[0]
    return checkinConfirmMessage(visit.num, visit.name)
  }

  // Rating responses
  if (lower.includes('excelente') || lower.includes('buena') || lower.includes('regular') || lower.includes('difícil')) {
    return ratingAckMessage()
  }

  // Notes saved (any freeform text after rating)
  if (lower.includes('receptivo') || lower.includes('interesado') || lower.includes('guardado')) {
    return noteSavedMessage('Dra. Quintero', '09:45', 18)
  }

  // Cancellation
  if (lower.includes('canceló') || lower.includes('cancelo') || lower.includes('cancelación')) {
    return cancellationMessage('Dra. Carmen Quintero', 'Dra. Miriam Sánchez (Cardióloga A, 10 min)')
  }

  // Stats / summary
  if (lower.includes('stats') || lower.includes('resumen') || lower.includes('estadísticas')) {
    return endOfDaySummary()
  }

  // Tomorrow
  if (lower.includes('mañana')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
      text: '📅 Tu ruta de mañana tiene 4 visitas planificadas. Se optimizará automáticamente a las 7:00 AM.',
      quickReplies: ['📋 Ver detalles', '✏️ Modificar'],
    }
  }

  // Overdue
  if (lower.includes('no he visto') || lower.includes('30 días') || lower.includes('pendientes')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
      text: `⚠️ *HCPs sin visitar (+30 días):*

1. Dr. Fernando Ruiz — Neumólogo A+ (42 días)
2. Dra. Patricia Vega — Reumatóloga A (35 días)
3. Dr. Omar Castillo — Gastro B+ (31 días)

¿Quieres que los incluya en la ruta de esta semana?`,
      quickReplies: ['✅ Incluir todos', '📋 Ver detalles', '⏩ Después'],
    }
  }

  // Late
  if (lower.includes('tarde') || lower.includes('retraso')) {
    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
      text: '⏰ Recalculando tiempos... Ajustado. Tu próxima visita sigue siendo posible.',
    }
  }

  // Help
  if (lower === 'help' || lower === 'ayuda' || lower.includes('comandos')) {
    return helpMessage()
  }

  // Accept reroute
  if (lower === '✅ aceptar') {
    return {
      id: `msg-${Date.now()}`,
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
      text: '✅ Ruta actualizada. Dra. Miriam Sánchez añadida a las 10:00. 🚗 10 min desde tu ubicación.',
    }
  }

  // Default fallback
  return {
    id: `msg-${Date.now()}`,
    sender: 'bot',
    timestamp: new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' }),
    text: `Entendido. ¿Puedo ayudarte con algo más? Escribe "help" para ver los comandos disponibles.`,
    quickReplies: ['🗺️ Mi ruta', '📊 Stats', '❓ Help'],
  }
}

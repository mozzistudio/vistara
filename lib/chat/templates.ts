export interface ChatMessage {
  id: string
  sender: 'bot' | 'user'
  text: string
  timestamp: string
  quickReplies?: string[]
  type?: 'text' | 'route' | 'briefing' | 'checkin' | 'summary'
}

let messageCounter = 0
function nextId() {
  return `msg-${++messageCounter}-${Date.now()}`
}

function now() {
  return new Date().toLocaleTimeString('es-PA', { hour: '2-digit', minute: '2-digit' })
}

export function morningRouteMessage(): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    type: 'route',
    text: `🗺️ *¡Buenos días, Carlos!*

Tu ruta del *lunes 23 de febrero* está lista.
5 visitas optimizadas · 1h12 de ruta · Score: 94/100

──────────────

1️⃣ *08:30* — Dr. Ricardo Arias
   🏥 Hospital Santo Tomás
   ❤️ Cardiólogo · Segmento *A+*
   📍 Av. Balboa, Calle 34

2️⃣ *09:45* — Dra. Carmen Quintero
   🏥 Hospital Nacional
   🧬 Endocrinóloga · Segmento *A*
   📍 Av. Cuba y Calle 38
   🚗 _12 min_

3️⃣ *11:15* — Dr. Manuel Espinosa
   🏥 Centro Médico Paitilla
   🩺 Internista · Segmento *B+*
   📍 Av. Balboa y Calle 53
   🚗 _8 min_

4️⃣ *14:00* — Dr. Alejandro Batista
   🏥 Hospital Punta Pacífica
   🧠 Neurólogo · Segmento *A*
   📍 Blvd. Pacífica
   🚗 _15 min_

5️⃣ *15:30* — Dra. Rosa Moreno
   🏥 Clín. Hospital San Fernando
   ❤️ Cardióloga · Segmento *B*
   📍 Vía España
   🚗 _10 min_

──────────────
📊 2 Seg.A+ | 2 Seg.A | 1 Seg.B
⏱️ 1h12 (vs 2h03 sin optimización)`,
    quickReplies: ['✅ Confirmar', '✏️ Modificar', '📋 Detalles'],
  }
}

export function briefingMessage(doctorName: string): ChatMessage {
  const briefings: Record<string, string> = {
    'Dr. Ricardo Arias': `📋 *Briefing — Dr. Ricardo Arias*

👨‍⚕️ Cardiólogo · Segmento A+ · Hosp. Santo Tomás
📊 Última visita: 10 feb (13 días) · Feedback: interesado datos ADVANCE
💊 Mensajes clave: datos ADVANCE post-hoc, programa adherencia, congreso ACP
🎯 Consejo IA: _Es analítico. Retoma caso paciente diabética con HTA resistente._`,
    'Dra. Carmen Quintero': `📋 *Briefing — Dra. Carmen Quintero*

👩‍⚕️ Endocrinóloga · Segmento A · Hosp. Nacional
📊 Última visita: 5 feb (18 días) · Feedback: solicita más datos de adherencia
💊 Mensajes clave: programa paciente, resultados renales, congreso ALAD
🎯 Consejo IA: _Prefiere evidencia local. Presenta datos del registro panameño._`,
    'Dr. Manuel Espinosa': `📋 *Briefing — Dr. Manuel Espinosa*

👨‍⚕️ Internista · Segmento B+ · Centro Médico Paitilla
📊 Última visita: 20 ene (34 días) · Feedback: neutral, poco tiempo
💊 Mensajes clave: simplicidad de dosis, perfil de seguridad
🎯 Consejo IA: _Visitas cortas. Ve directo al punto con el resumen de una página._`,
  }

  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    type: 'briefing',
    text: briefings[doctorName] || `📋 *Briefing — ${doctorName}*\n\nInformación no disponible. Consulta el CRM para más detalles.`,
    quickReplies: ['💡 Objeciones', '📊 Datos clínicos', '🚗 Itinerario'],
  }
}

export function checkinConfirmMessage(visitNum: number, doctorName: string): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    type: 'checkin',
    text: `✅ *${doctorName} — registrada*
⏱️ 24 min. ¿Cómo fue?`,
    quickReplies: ['⭐⭐⭐ Excelente', '⭐⭐ Buena', '⭐ Regular', '😐 Difícil', '❌ No visto'],
  }
}

export function ratingAckMessage(): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    text: `👍 ¿Notas? (texto o 🎤 audio)`,
  }
}

export function noteSavedMessage(nextDoctor: string, time: string, driveMin: number): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    text: `📝 Guardado. Próxima: ${nextDoctor} ${time} (${driveMin} min) 🚗`,
  }
}

export function cancellationMessage(cancelledDoctor: string, replacementDoctor: string): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    text: `⚠️ Cancelación de ${cancelledDoctor}.
🔄 Recalculando...

✅ Sustitución: ${replacementDoctor}`,
    quickReplies: ['✅ Aceptar', '🔄 Otra', '⏩ Saltar'],
  }
}

export function endOfDaySummary(): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    type: 'summary',
    text: `📊 *Resumen — Lun. 23 feb*

✅ 4/5 visitas · ⭐ 4.2/5 · 🚗 34 km
📈 Semana: 18/20 (90%) · 🏆 2do/6 reps

¡Buen trabajo hoy, Carlos! 💪`,
  }
}

export function helpMessage(): ChatMessage {
  return {
    id: nextId(),
    sender: 'bot',
    timestamp: now(),
    text: `📖 *Comandos disponibles:*

🗺️ "mi ruta" — Ver ruta del día
📋 "prep [doctor]" — Briefing de visita
✅ "visita X terminada" — Registrar visita
⭐ "calificar X" — Calificar visita
❌ "[doctor] canceló" — Reportar cancelación
📊 "stats" — Estadísticas del mes
🔍 "historial [doctor]" — Ver historial
❓ "help" — Ver esta ayuda`,
  }
}

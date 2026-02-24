'use client'

export default function SettingsPage() {
  return (
    <div className="p-6 h-full overflow-auto">
      <h1 className="text-2xl font-bold text-[#F8FAFC] mb-6" style={{ fontFamily: 'var(--font-syne)' }}>
        Configuración
      </h1>

      <div className="space-y-6 max-w-3xl">
        {/* Users */}
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            👥 Gestión de Usuarios
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Carlos Mendoza', role: 'Rep', territory: 'Panamá Centro', status: 'active' },
              { name: 'Ana García', role: 'Rep', territory: 'Panamá Norte', status: 'active' },
              { name: 'Luis Rodríguez', role: 'Rep', territory: 'San Miguelito', status: 'active' },
              { name: 'Maria Silva', role: 'Manager', territory: 'Metro', status: 'active' },
              { name: 'Jorge Fernández', role: 'Director', territory: 'Nacional', status: 'active' },
            ].map(user => (
              <div key={user.name} className="flex items-center justify-between p-3 rounded-lg bg-[#0A0E17]/50 border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium" style={{ background: 'linear-gradient(135deg, #22D3EE, #8B5CF6)' }}>
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-[#F8FAFC]">{user.name}</p>
                    <p className="text-xs text-[#94A3B8]">{user.role} · {user.territory}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-xs text-[#34D399]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" /> Activo
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Rules */}
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            🛡️ Reglas de Cumplimiento
          </h2>
          <div className="space-y-4">
            {[
              { rule: 'Frecuencia máxima segmento A+', value: 'Cada 14 días', enabled: true },
              { rule: 'Frecuencia máxima segmento A', value: 'Cada 21 días', enabled: true },
              { rule: 'Frecuencia máxima segmento B+', value: 'Cada 30 días', enabled: true },
              { rule: 'Registro obligatorio de productos', value: 'Sí', enabled: true },
              { rule: 'Nota mínima por visita', value: '10 caracteres', enabled: false },
              { rule: 'Aprobación de gerente para cancelaciones', value: 'No', enabled: false },
            ].map(item => (
              <div key={item.rule} className="flex items-center justify-between py-2">
                <div>
                  <p className="text-sm text-[#F8FAFC]">{item.rule}</p>
                  <p className="text-xs text-[#94A3B8]">{item.value}</p>
                </div>
                <div className={`w-10 h-5 rounded-full relative cursor-pointer transition-colors ${
                  item.enabled ? 'bg-[#22D3EE]' : 'bg-[#1A2236]'
                }`}>
                  <div className={`w-4 h-4 rounded-full bg-white absolute top-0.5 transition-all ${
                    item.enabled ? 'left-5.5' : 'left-0.5'
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Airtable Status */}
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            🗄️ Estado de Airtable
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { table: 'Users', records: '9', status: 'ok' },
              { table: 'Teams', records: '2', status: 'ok' },
              { table: 'HCPs', records: '70', status: 'ok' },
              { table: 'Products', records: '6', status: 'ok' },
              { table: 'Visits', records: '1,808', status: 'ok' },
              { table: 'Routes', records: '168', status: 'ok' },
              { table: 'Alerts', records: '30', status: 'ok' },
              { table: 'Conversation Logs', records: '300', status: 'ok' },
            ].map(t => (
              <div key={t.table} className="flex items-center justify-between p-3 rounded-lg bg-[#0A0E17]/50 border border-white/[0.04]">
                <div>
                  <p className="text-sm text-[#F8FAFC]">{t.table}</p>
                  <p className="text-xs text-[#94A3B8]">{t.records} registros</p>
                </div>
                <span className="flex items-center gap-1 text-xs text-[#34D399]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34D399]" /> Conectado
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Integrations */}
        <div className="rounded-xl bg-[#111827]/70 backdrop-blur-xl border border-white/[0.06] p-6">
          <h2 className="text-lg font-bold text-[#F8FAFC] mb-4" style={{ fontFamily: 'var(--font-syne)' }}>
            🔗 Integraciones
          </h2>
          <div className="space-y-3">
            {[
              { name: 'Veeva CRM', status: 'Disponible', icon: '💊', connected: false },
              { name: 'Salesforce', status: 'Disponible', icon: '☁️', connected: false },
              { name: 'SAP ERP', status: 'Próximamente', icon: '📦', connected: false },
              { name: 'IQVIA', status: 'Próximamente', icon: '📊', connected: false },
            ].map(integration => (
              <div key={integration.name} className="flex items-center justify-between p-3 rounded-lg bg-[#0A0E17]/50 border border-white/[0.04]">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{integration.icon}</span>
                  <div>
                    <p className="text-sm font-medium text-[#F8FAFC]">{integration.name}</p>
                    <p className="text-xs text-[#94A3B8]">{integration.status}</p>
                  </div>
                </div>
                <button className="px-3 py-1.5 rounded-full text-xs font-medium bg-[#1A2236] text-[#94A3B8] border border-white/[0.06] hover:border-[#22D3EE]/30 transition-colors cursor-pointer">
                  Conectar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

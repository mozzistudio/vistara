'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import DateRangePicker, {
  getDefaultRange,
  type DateRange,
} from '../components/DateRangePicker'
import KPICard from '../components/KPICard'
import ChartVisitsPerRep from '../components/ChartVisitsPerRep'
import ChartDailyTrend from '../components/ChartDailyTrend'
import ChartRatings from '../components/ChartRatings'
import ChartProducts from '../components/ChartProducts'
import ChartOptScore from '../components/ChartOptScore'
import ChartCoverage from '../components/ChartCoverage'
import RepLeaderboard from '../components/RepLeaderboard'

/* ── Sample / fallback data ──────────────────────────────── */

const SAMPLE_VISITS_PER_REP = [
  { rep: 'C. Mendoza', count: 142 },
  { rep: 'A. García', count: 138 },
  { rep: 'L. Rodríguez', count: 125 },
  { rep: 'S. Torres', count: 118 },
  { rep: 'M. Herrera', count: 112 },
  { rep: 'I. Vargas', count: 105 },
]

const SAMPLE_DAILY_TREND = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (13 - i))
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    count: Math.floor(Math.random() * 30 + 50),
  }
})

const SAMPLE_RATINGS = [
  { rating: 5, count: 120 },
  { rating: 4, count: 85 },
  { rating: 3, count: 40 },
  { rating: 2, count: 12 },
  { rating: 1, count: 5 },
]

const SAMPLE_PRODUCTS = [
  { product: 'Atorvastatina', count: 95 },
  { product: 'Losartán', count: 82 },
  { product: 'Metformina', count: 74 },
  { product: 'Omeprazol', count: 68 },
  { product: 'Amlodipino', count: 55 },
]

const SAMPLE_OPT_SCORE = Array.from({ length: 14 }, (_, i) => {
  const d = new Date()
  d.setDate(d.getDate() - (13 - i))
  return {
    date: `${d.getMonth() + 1}/${d.getDate()}`,
    score: Math.floor(Math.random() * 15 + 75),
  }
})

/* ── Skeleton loader ─────────────────────────────────────── */

function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-xl ${className}`}
      style={{ background: '#1A2236' }}
    />
  )
}

/* ── Dashboard Page ──────────────────────────────────────── */

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultRange())

  const { data, isLoading } = useQuery({
    queryKey: ['analytics', dateRange],
    queryFn: () =>
      fetch(
        `/api/analytics?type=all&dateFrom=${dateRange.from}&dateTo=${dateRange.to}`
      ).then((r) => {
        if (!r.ok) throw new Error('Analytics fetch failed')
        return r.json()
      }),
    retry: false,
  })

  // Use API data if available, otherwise fallback to sample data
  const kpis = data?.kpis ?? null
  const visitsPerRep = data?.visitsPerRep ?? SAMPLE_VISITS_PER_REP
  const dailyTrend = data?.dailyTrend ?? SAMPLE_DAILY_TREND
  const ratings = data?.ratings ?? SAMPLE_RATINGS
  const products = data?.products ?? SAMPLE_PRODUCTS
  const optScore = data?.optScore ?? SAMPLE_OPT_SCORE
  const leaderboard = data?.leaderboard ?? undefined

  return (
    <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
      {/* Header + Date Range */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1
            className="text-2xl font-bold text-[#F8FAFC]"
            style={{ fontFamily: 'var(--font-syne)' }}
          >
            Dashboard
          </h1>
          <p className="text-sm text-[#94A3B8] mt-1">
            Resumen de actividad del equipo comercial
          </p>
        </div>
        <DateRangePicker value={dateRange} onChange={setDateRange} />
      </div>

      {/* KPI Cards */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-[140px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            icon="📋"
            label="Total Visitas"
            value={kpis?.totalVisits ?? 740}
            delta={kpis?.totalVisitsDelta ?? 12}
            comparison="vs. periodo anterior"
          />
          <KPICard
            icon="📊"
            label="Promedio por Rep/Día"
            value={kpis?.avgPerRepDay ?? '8.2'}
            delta={kpis?.avgPerRepDayDelta ?? 5}
            comparison="vs. periodo anterior"
          />
          <KPICard
            icon="🎯"
            label="Cobertura A+"
            value={kpis?.coverageA ?? '94%'}
            delta={kpis?.coverageADelta ?? 3}
            comparison="vs. periodo anterior"
          />
          <KPICard
            icon="🛣️"
            label="Score Promedio Ruta"
            value={kpis?.avgRouteScore ?? '87%'}
            delta={kpis?.avgRouteScoreDelta ?? -2}
            comparison="vs. periodo anterior"
          />
        </div>
      )}

      {/* Charts Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[350px]" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <ChartVisitsPerRep data={visitsPerRep} />
          <ChartDailyTrend data={dailyTrend} />
          <ChartRatings data={ratings} />
          <ChartProducts data={products} />
          <ChartOptScore data={optScore} />
          <ChartCoverage />
        </div>
      )}

      {/* Leaderboard */}
      {isLoading ? (
        <Skeleton className="h-[400px]" />
      ) : (
        <RepLeaderboard data={leaderboard} />
      )}
    </div>
  )
}

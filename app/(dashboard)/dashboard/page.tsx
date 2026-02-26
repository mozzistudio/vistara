import { getDashboardKpis, getSalesData } from '@/lib/supabase/queries/sales'
import { getStockAlerts, getStockSummary } from '@/lib/supabase/queries/stock'
import { TopBar } from '@/components/layout/TopBar'
import { KpiCard } from '@/components/dashboard/KpiCard'
import { SalesChart } from '@/components/dashboard/SalesChart'
import { StockDistribution } from '@/components/dashboard/StockDistribution'
import { TopProducts } from '@/components/dashboard/TopProducts'
import { RecentAlerts } from '@/components/dashboard/RecentAlerts'
import { formatCurrency, formatNumber, formatPercent } from '@/lib/utils/formatters'
import { Package, Building2, TrendingUp, AlertTriangle } from 'lucide-react'
import type { StockAlert } from '@/types'

export const dynamic = 'force-dynamic'

export default async function DashboardPage() {
  const from = '2025-01-01'
  const to = '2025-06-30'

  const [kpis, dailySales, topProducts, stockSummary, stockAlerts] = await Promise.all([
    getDashboardKpis(from, to),
    getSalesData({ date_from: from, date_to: to, group_by: 'day', limit: 180 }),
    getSalesData({ date_from: from, date_to: to, group_by: 'product', order_by: 'revenue_desc', limit: 10 }),
    getStockSummary(),
    getStockAlerts(),
  ])

  const typedAlerts = stockAlerts.map(a => ({
    id: a.id,
    product_name: a.product?.name ?? '',
    pharmacy_name: a.pharmacy?.name ?? '',
    region: a.pharmacy?.region ?? '',
    quantity: a.quantity,
    level: a.level,
    min_threshold: a.min_threshold,
    last_updated: a.last_updated,
    product_id: a.product?.id ?? '',
    pharmacy_id: a.pharmacy?.id ?? '',
  })) as StockAlert[]

  return (
    <>
      <TopBar title="Network Overview" subtitle="Resumen general de la plataforma farmacéutica" />
      <div className="p-6 space-y-6">

        {/* KPI Row */}
        <div className="grid grid-cols-4 gap-4">
          <KpiCard
            label="Total Productos"
            value={formatNumber(kpis.totalProducts)}
            change="+12 activos"
            icon={<Package className="w-4 h-4" style={{ color: 'var(--forest)' }} />}
          />
          <KpiCard
            label="Farmacias Activas"
            value={formatNumber(kpis.activePharmacies)}
            change="+3 incorporadas"
            icon={<Building2 className="w-4 h-4" style={{ color: 'var(--forest)' }} />}
          />
          <KpiCard
            label="Ingresos (H1 2025)"
            value={formatCurrency(kpis.totalRevenue)}
            change={formatPercent(kpis.revenueGrowth) + ' crecimiento'}
            changePositive={kpis.revenueGrowth >= 0}
            icon={<TrendingUp className="w-4 h-4" style={{ color: 'var(--forest)' }} />}
          />
          <KpiCard
            label="Alertas Stock"
            value={String(kpis.stockAlerts)}
            change={`${kpis.criticalAlerts} críticas`}
            alert
            icon={<AlertTriangle className="w-4 h-4" style={{ color: 'var(--alert)' }} />}
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <SalesChart
              data={dailySales as { key: string; label: string; revenue: number; units: number }[]}
              title="Ventas Diarias (Ene–Jun 2025)"
            />
          </div>
          <StockDistribution data={stockSummary} />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2">
            <TopProducts
              data={topProducts as { key: string; label: string; revenue: number; units: number }[]}
            />
          </div>
          <RecentAlerts alerts={typedAlerts} />
        </div>

      </div>
    </>
  )
}

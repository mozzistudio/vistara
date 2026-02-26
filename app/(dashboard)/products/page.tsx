'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { Search, Package, ChevronRight } from 'lucide-react'
import { TopBar } from '@/components/layout/TopBar'
import { StockBadge } from '@/components/products/StockBadge'
import type { StockLevel } from '@/types'

interface ProductRow {
  id: string
  name: string
  molecule: string
  therapeutic_class: string
  dosage_form: string
  presentations: string[]
  regulatory_status: string
  stock: { quantity: number; level: StockLevel }[]
}

function getTotalStock(stock: { quantity: number }[]) {
  return stock.reduce((s, x) => s + x.quantity, 0)
}

function getWorstLevel(stock: { level: StockLevel }[]): StockLevel | null {
  const order: StockLevel[] = ['RUPTURA', 'BAJO', 'MEDIO', 'ALTO']
  for (const l of order) {
    if (stock.some(s => s.level === l)) return l
  }
  return null
}

const CLASS_COLORS: Record<string, string> = {
  'Cardiovascular': '#DCFCE7',
  'Diabetes': '#FEF9C3',
  'Gastroenterología': '#DBEAFE',
  'Dolor': '#FEE2E2',
  'Antibióticos': '#F3E8FF',
  'Respiratorio': '#E0F2FE',
  'Neurología': '#FCE7F3',
  'Dermatología': '#FFF7ED',
}

export default function ProductsPage() {
  const [query, setQuery] = useState('')
  const [activeClass, setActiveClass] = useState<string | null>(null)

  const { data: classesData } = useQuery({
    queryKey: ['therapeutic-classes'],
    queryFn: () => fetch('/api/products?classes=true').then(r => r.json()).then(r => r.data as string[]),
  })

  const { data, isLoading } = useQuery({
    queryKey: ['products', query, activeClass],
    queryFn: () =>
      fetch(`/api/products?q=${encodeURIComponent(query)}${activeClass ? `&class=${encodeURIComponent(activeClass)}` : ''}&limit=50`)
        .then(r => r.json())
        .then(r => r.data as ProductRow[]),
  })

  return (
    <>
      <TopBar title="Productos" subtitle={`${data?.length ?? 0} productos en la red`} />
      <div className="p-6 space-y-5">

        {/* Search + Filters */}
        <div className="flex flex-col gap-3">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-faint)' }} />
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar por nombre, molécula o clase..."
              className="w-full pl-10 pr-4 py-2.5 rounded-[10px] text-sm border outline-none transition-colors"
              style={{
                background: 'white',
                borderColor: 'var(--border)',
                color: 'var(--text-dark)',
              }}
            />
          </div>

          {/* Class filter chips */}
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setActiveClass(null)}
              className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
              style={{
                background: !activeClass ? 'var(--forest)' : 'white',
                color: !activeClass ? 'white' : 'var(--text-muted)',
                borderColor: !activeClass ? 'var(--forest)' : 'var(--border)',
              }}
            >
              Todos
            </button>
            {(classesData ?? []).map(cls => (
              <button
                key={cls}
                onClick={() => setActiveClass(activeClass === cls ? null : cls)}
                className="text-xs px-3 py-1.5 rounded-full border font-medium transition-colors"
                style={{
                  background: activeClass === cls ? 'var(--forest)' : CLASS_COLORS[cls] ?? 'white',
                  color: activeClass === cls ? 'white' : 'var(--text-muted)',
                  borderColor: activeClass === cls ? 'var(--forest)' : 'var(--border)',
                }}
              >
                {cls}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="bg-white rounded-[12px] border h-36 animate-pulse" style={{ borderColor: 'var(--border)' }} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {(data ?? []).map(product => {
              const total = getTotalStock(product.stock)
              const worstLevel = getWorstLevel(product.stock)
              return (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className="bg-white rounded-[12px] border p-4 hover:shadow-md transition-all hover:border-[var(--leaf)] group"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div
                      className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0"
                      style={{ background: CLASS_COLORS[product.therapeutic_class] ?? 'var(--mint-light)' }}
                    >
                      <Package className="w-4 h-4" style={{ color: 'var(--forest)' }} />
                    </div>
                    <ChevronRight
                      className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
                      style={{ color: 'var(--text-faint)' }}
                    />
                  </div>
                  <h3 className="font-semibold text-sm mt-2 mb-0.5 leading-tight" style={{ color: 'var(--text-dark)' }}>
                    {product.name}
                  </h3>
                  <p className="text-[11px] mb-2" style={{ color: 'var(--text-faint)' }}>
                    {product.molecule}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[10px] px-2 py-0.5 rounded-full font-medium"
                      style={{
                        background: CLASS_COLORS[product.therapeutic_class] ?? 'var(--mint-light)',
                        color: 'var(--forest)',
                      }}
                    >
                      {product.therapeutic_class}
                    </span>
                    {worstLevel && <StockBadge level={worstLevel} />}
                  </div>

                  {/* Stock bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px]" style={{ color: 'var(--text-faint)' }}>Stock total</span>
                      <span className="font-mono text-[10px]" style={{ color: 'var(--text-faint)' }}>{total.toLocaleString()} uds</span>
                    </div>
                    <div className="h-1 rounded-full" style={{ background: 'var(--border)' }}>
                      <div
                        className="h-1 rounded-full"
                        style={{
                          width: `${Math.min(100, (total / 500) * 100)}%`,
                          background: worstLevel === 'RUPTURA' ? 'var(--alert)' : worstLevel === 'BAJO' ? 'var(--warning)' : 'var(--forest)',
                        }}
                      />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}

        {data?.length === 0 && !isLoading && (
          <div className="text-center py-12">
            <p style={{ color: 'var(--text-faint)' }}>No se encontraron productos</p>
          </div>
        )}
      </div>
    </>
  )
}

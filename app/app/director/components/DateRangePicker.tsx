'use client'

import { useState, useMemo } from 'react'

export interface DateRange {
  from: string
  to: string
  label: string
}

interface DateRangePickerProps {
  value: DateRange
  onChange: (range: DateRange) => void
}

const presets = [
  { label: '7d', days: 7 },
  { label: '30d', days: 30 },
  { label: '90d', days: 90 },
  { label: 'Todo', days: 365 },
]

function daysAgo(n: number): string {
  const d = new Date()
  d.setDate(d.getDate() - n)
  return d.toISOString().split('T')[0]
}

function today(): string {
  return new Date().toISOString().split('T')[0]
}

export function getDefaultRange(): DateRange {
  return { from: daysAgo(30), to: today(), label: '30d' }
}

export default function DateRangePicker({
  value,
  onChange,
}: DateRangePickerProps) {
  return (
    <div className="flex items-center gap-2">
      {presets.map((preset) => {
        const isActive = value.label === preset.label

        return (
          <button
            key={preset.label}
            onClick={() =>
              onChange({
                from: daysAgo(preset.days),
                to: today(),
                label: preset.label,
              })
            }
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
              isActive
                ? 'text-[#0A0E17] bg-[#22D3EE] shadow-lg'
                : 'text-[#94A3B8] bg-[#1A2236] hover:text-[#F8FAFC] hover:bg-[rgba(255,255,255,0.08)]'
            }`}
            style={
              isActive
                ? { boxShadow: '0 0 16px rgba(34,211,238,0.3)' }
                : undefined
            }
          >
            {preset.label}
          </button>
        )
      })}
    </div>
  )
}

'use client'

import { useEffect, useRef } from 'react'
import type { StockLevel } from '@/types'

interface PharmacyMapPoint {
  id: string
  name: string
  latitude?: number
  longitude?: number
  stock: { level: StockLevel }[]
  region: string
}

interface PharmacyMapProps {
  pharmacies: PharmacyMapPoint[]
}

function getMarkerColor(stock: { level: StockLevel }[]) {
  const hasCritical = stock.some(s => s.level === 'RUPTURA')
  const hasLow = stock.some(s => s.level === 'BAJO')
  if (hasCritical) return '#EF4444'
  if (hasLow) return '#F59E0B'
  return '#2D7A4F'
}

export function PharmacyMap({ pharmacies }: PharmacyMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<unknown>(null)

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return

    const initMap = async () => {
      const L = (await import('leaflet')).default
      // CSS injected via globals.css (leaflet/dist/leaflet.css)

      const map = L.map(mapRef.current!, {
        center: [8.99, -79.52],
        zoom: 8,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 18,
      }).addTo(map)

      pharmacies
        .filter(p => p.latitude && p.longitude)
        .forEach(pharmacy => {
          const color = getMarkerColor(pharmacy.stock)
          const icon = L.divIcon({
            html: `<div style="
              width:28px;height:28px;border-radius:50%;
              background:${color};border:2px solid white;
              box-shadow:0 2px 8px rgba(0,0,0,0.25);
              display:flex;align-items:center;justify-content:center;
              font-size:12px;color:white;font-weight:bold;
            ">🏥</div>`,
            className: '',
            iconSize: [28, 28],
            iconAnchor: [14, 14],
          })

          const marker = L.marker([pharmacy.latitude!, pharmacy.longitude!], { icon })
          const alertCount = pharmacy.stock.filter(s => s.level === 'BAJO' || s.level === 'RUPTURA').length
          marker.bindPopup(`
            <div style="font-family:sans-serif;min-width:160px">
              <strong style="font-size:13px">${pharmacy.name}</strong><br/>
              <span style="color:#666;font-size:11px">${pharmacy.region}</span><br/>
              ${alertCount > 0 ? `<span style="color:#EF4444;font-size:11px;font-weight:600">${alertCount} alertas activas</span>` : '<span style="color:#16A34A;font-size:11px">Stock OK</span>'}
              <br/><a href="/pharmacies/${pharmacy.id}" style="color:#2D7A4F;font-size:11px;text-decoration:underline">Ver detalle →</a>
            </div>
          `)
          marker.addTo(map)
        })

      mapInstanceRef.current = map
    }

    initMap()

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove()
        mapInstanceRef.current = null
      }
    }
  }, [pharmacies])

  return (
    <div
      ref={mapRef}
      className="w-full rounded-[12px] border overflow-hidden"
      style={{ height: '500px', borderColor: 'var(--border)' }}
    />
  )
}

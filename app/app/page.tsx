'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function AppRedirect() {
  const router = useRouter()

  useEffect(() => {
    const savedRole = localStorage.getItem('vistara-role')
    if (savedRole === 'director') {
      router.replace('/app/director/dashboard')
    } else {
      router.replace('/app/rep')
    }
  }, [router])

  return null
}

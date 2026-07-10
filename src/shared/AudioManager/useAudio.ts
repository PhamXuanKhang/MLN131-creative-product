/** Cầu nối store ↔ audioManager: đồng bộ ambient theo state. */
import { useEffect } from 'react'
import { useMuseumStore } from '@/store/useMuseumStore'
import { setAmbient } from './audioManager'

export function useAudio(): void {
  const ambient = useMuseumStore((s) => s.ambient)

  useEffect(() => {
    setAmbient(ambient ? (`ambient-${ambient}` as const) : null)
  }, [ambient])
}

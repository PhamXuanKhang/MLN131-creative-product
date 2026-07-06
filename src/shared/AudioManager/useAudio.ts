/** Cầu nối store ↔ audioManager: đồng bộ mute + ambient theo state. */
import { useEffect } from 'react'
import { useMuseumStore } from '@/store/useMuseumStore'
import { setAmbient, setMuted } from './audioManager'

export function useAudio(): void {
  const audioMuted = useMuseumStore((s) => s.audioMuted)
  const ambient = useMuseumStore((s) => s.ambient)

  useEffect(() => {
    setMuted(audioMuted)
  }, [audioMuted])

  useEffect(() => {
    setAmbient(ambient ? (`ambient-${ambient}` as const) : null)
  }, [ambient])
}

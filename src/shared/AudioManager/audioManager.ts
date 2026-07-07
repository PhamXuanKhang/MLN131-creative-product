/**
 * Audio skeleton — module thuần (không React). File âm thanh thật được gắn
 * tuần 4; hiện registry rỗng nên mọi lệnh đều no-op an toàn.
 * Đăng ký file: registerSound('click', '/audio/click.mp3') khi có asset.
 */

export type SoundKey = 'click' | 'paper' | 'film' | 'ambient-world' | 'ambient-vietnam'

const registry = new Map<SoundKey, HTMLAudioElement>()
let muted = false
let currentAmbient: SoundKey | null = null
let openingContext: AudioContext | null = null
let openingGain: GainNode | null = null
let openingOscillators: OscillatorNode[] = []

export function registerSound(key: SoundKey, src: string, loop = false): void {
  const audio = new Audio(src)
  audio.loop = loop
  audio.muted = muted
  registry.set(key, audio)
}

/** Phát hiệu ứng một lần (click / paper / film). No-op nếu chưa có file. */
export function play(key: SoundKey): void {
  const audio = registry.get(key)
  if (!audio || muted) return
  audio.currentTime = 0
  void audio.play().catch(() => {
    /* autoplay bị chặn trước tương tác đầu tiên — bỏ qua */
  })
}

/** Đổi nhạc nền theo mode; null để tắt. */
export function setAmbient(key: 'ambient-world' | 'ambient-vietnam' | null): void {
  if (currentAmbient === key) return
  const prev = currentAmbient ? registry.get(currentAmbient) : null
  prev?.pause()
  currentAmbient = key
  if (key && !muted) {
    const next = registry.get(key)
    if (next) void next.play().catch(() => {})
  }
}

export function setMuted(value: boolean): void {
  muted = value
  for (const audio of registry.values()) audio.muted = value
  if (openingGain) openingGain.gain.value = value ? 0 : 0.035
  if (!value && currentAmbient) {
    const ambient = registry.get(currentAmbient)
    if (ambient) void ambient.play().catch(() => {})
  }
}

/** Nhạc nền opening nhẹ bằng Web Audio để không phụ thuộc asset ngoài. */
export function startOpeningAmbient(): void {
  if (openingContext) {
    if (!muted) void openingContext.resume().catch(() => {})
    return
  }
  if (muted) return
  const AudioContextCtor = window.AudioContext
  if (!AudioContextCtor) return

  const context = new AudioContextCtor()
  const gain = context.createGain()
  gain.gain.value = 0.035
  gain.connect(context.destination)

  openingOscillators = [110, 164.81, 220].map((frequency) => {
    const oscillator = context.createOscillator()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    oscillator.connect(gain)
    oscillator.start()
    return oscillator
  })

  openingContext = context
  openingGain = gain
  void context.resume().catch(() => {})
}

export function stopOpeningAmbient(): void {
  for (const oscillator of openingOscillators) oscillator.stop()
  openingOscillators = []
  void openingContext?.close().catch(() => {})
  openingContext = null
  openingGain = null
}

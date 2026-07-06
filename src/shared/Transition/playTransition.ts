/**
 * API mệnh lệnh của film transition — tách khỏi Transition.tsx để file
 * component chỉ export component (yêu cầu react-refresh).
 */

export type PlayFn = (onCovered: () => void) => void

let playFn: PlayFn | null = null

/** Transition component đăng ký/huỷ đăng ký khi mount/unmount. */
export function setPlayFn(fn: PlayFn | null): void {
  playFn = fn
}

/** Gọi từ bất kỳ đâu; nếu Transition chưa mount thì chạy onCovered luôn. */
export function playTransition(onCovered: () => void): void {
  if (playFn) playFn(onCovered)
  else onCovered()
}

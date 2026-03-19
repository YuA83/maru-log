import { useState, useEffect } from 'react'

const STORAGE_KEY = 'maru-theme'

/**
 * 다크모드 훅
 * 1. localStorage에 저장된 값 우선
 * 2. 없으면 시스템 설정(prefers-color-scheme) 따라감
 * 3. <html>에 data-theme="dark" | "light" 속성으로 적용
 */
export function useDarkMode() {
  const [ isDark, setIsDark ] = useState<boolean>(() => {
    // SSR 대응 — window 없으면 false
    if (typeof window === 'undefined') return false

    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored !== null) return stored === 'dark'

    // 저장값 없으면 시스템 설정
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.setAttribute('data-theme', 'dark')
    } else {
      root.setAttribute('data-theme', 'light')
    }
    localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [ isDark ])

  const toggle = () => setIsDark((prev) => !prev)

  return { isDark, toggle }
}
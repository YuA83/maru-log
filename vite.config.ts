import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포 시 레포지토리 이름으로 base 경로 설정
// 예: https://yua83.github.io/maru-log/
export default defineConfig({
  plugins: [react()],
  base: '/maru-log/',
})
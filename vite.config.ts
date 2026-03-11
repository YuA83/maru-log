import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages 배포 시 레포지토리 이름으로 base 경로 설정
// 예: https://yua83.github.io/maru-log/
export default defineConfig({
  plugins: [react()],
  base: '/maru-log/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // 코드 스플리팅으로 초기 번들 크기 최소화
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          markdown: ['react-markdown', 'remark-gfm', 'rehype-highlight'],
        },
      },
    },
  },
  // public 디렉토리의 md 파일을 정적 에셋으로 처리
  assetsInclude: ['**/*.md'],
})
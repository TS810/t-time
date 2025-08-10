import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

export default defineConfig({
  base: '/t-time/', // <-- 배포 전 REPO_NAME으로 바꿔주세요. (커스텀 도메인 사용 시 '/' 로 변경)
  plugins: [react()],
  // 아래 server.https 블록은 로컬에서 HTTPS 개발용(인증서 파일 필요)입니다.
  // 인증서 없으면 이 블록을 제거하거나 주석 처리하세요.
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost-cert.pem')),
    },
  },
})

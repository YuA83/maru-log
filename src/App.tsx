import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import Home from "./pages/Home.tsx"
import PostList from './pages/PostList.tsx'
import PostDetail from './pages/PostDetail.tsx'
import About from './pages/About.tsx'
import NotFound from './pages/NotFound.tsx'

/**
 * 앱 루트 컴포넌트 — 라우팅 구조
 *
 * 라우트 구조:
 *   /              → 홈 (최근 포스트 표시)
 *   /posts         → 전체 포스트 목록
 *   /posts/:slug   → 개별 포스트 (slug = md 파일명)
 *   /about         → 소개 페이지
 *   *              → 404
 *
 * GitHub Pages는 SPA 라우팅을 지원하지 않으므로
 * HashRouter 또는 404.html 리다이렉트 트릭이 필요합니다.
 * 현재는 BrowserRouter를 사용하고 public/404.html로 처리합니다.
 */
export default function App() {
  return (
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/posts" element={<PostList/>}/>
          {/* :slug는 post1, post2, ... 등 md 파일명에 대응 */}
          <Route path="/posts/:slug" element={<PostDetail/>}/>
          <Route path="/about" element={<About/>}/>
          <Route path="/404" element={<NotFound/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
  )
}
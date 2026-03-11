import {Link} from 'react-router-dom'
import styles from '../styles/components/Footer.module.css'

export default function Footer() {
  return (
      <footer className={styles.footer}>
        {/* 상단 광택 라인 */}
        <div className={styles.topLine} aria-hidden="true"/>

        <div className={styles.inner}>
          {/* 좌: 브랜드 */}
          <div className={styles.brand}>
            <span className={styles.gem} aria-hidden="true"/>
            <span className={styles.brandText}>Maru-Log</span>
          </div>

          {/* 중: 카피라이트 */}
          <p className={styles.copy}>
            © {new Date().getFullYear()} — Made with care
          </p>

          {/* 우: 링크 */}
          <nav className={styles.links} aria-label="푸터 메뉴">
            <Link to="/">Home</Link>
            <Link to="/posts">Posts</Link>
            <Link to="/about">About</Link>
          </nav>
        </div>
      </footer>
  )
}
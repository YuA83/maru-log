import {useState, useEffect} from 'react'
import {Link, NavLink} from 'react-router-dom'
import styles from '../styles/components/Header.module.css'

/**
 * Liquid Glass 헤더
 * - 스크롤 시 blur/opacity 강화 (dynamic glass)
 */
export default function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, {passive: true})
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
      <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.topLine} aria-hidden="true"/>
        <div className={styles.inner}>
          <Link to="/" className={styles.logo}>
            <span className={styles.logoGem} aria-hidden="true"/>
            <span className={styles.logoText}>Maru-Log</span>
          </Link>

          <nav className={styles.nav}>
            {[
              {to: '/', label: 'Home', end: true},
              {to: '/posts', label: 'Posts', end: false},
              {to: '/about', label: 'About', end: true},
            ].map(({to, label, end}) => (
                <NavLink
                    key={to}
                    to={to}
                    end={end}
                    className={({isActive}) =>
                        `${styles.navLink} ${isActive ? styles.navActive : ''}`
                    }
                >
                  {label}
                </NavLink>
            ))}
          </nav>

          <div className={styles.actions}>
            <Link to="/posts" className={styles.writeBtn}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M1 12L5 7.5M5 7.5L9.5 1L12.5 4L5 7.5ZM1 12H3.5L5 7.5L1 12Z"
                      stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Write</span>
            </Link>
          </div>
        </div>
      </header>
  )
}
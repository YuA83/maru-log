import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDarkMode } from '../hooks/useDarkMode'
import styles from '../styles/components/Header.module.css'

export default function Header() {
  const [ scrolled, setScrolled ] = useState(false)
  const { isDark, toggle } = useDarkMode()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
      <header className={ `${ styles.header } ${ scrolled ? styles.scrolled : '' }` }>
        <div className={ styles.topLine } aria-hidden="true"/>
        <div className={ styles.inner }>

          <Link to="/" className={ styles.logo }>
            <img
                src={ `${ import.meta.env.BASE_URL }favicon.ico` }
                alt="logo" aria-hidden="true"
                className={ styles.logoGem } width={ 20 } height={ 20 }
            />
            <span className={ styles.logoText }>Maru-Log</span>
          </Link>

          <nav className={ styles.nav }>
            { [
              { to: '/', label: 'Home', end: true },
              { to: '/posts', label: 'Posts', end: false },
              { to: '/about', label: 'About', end: true },
            ].map(({ to, label, end }) => (
                <NavLink
                    key={ to } to={ to } end={ end }
                    className={ ({ isActive }) =>
                        `${ styles.navLink } ${ isActive ? styles.navActive : '' }`
                    }
                >
                  { label }
                </NavLink>
            )) }
          </nav>

          <div className={ styles.actions }>
            {/*
            C-3 토글:
            - 트랙에 ☀️ · knob · 🌙 배치
            - knob이 슬라이드하며 아이콘 위를 지나감
            - 라이트: knob 왼쪽(☀️ 위) / 다크: knob 오른쪽(🌙 위)
          */ }
            <button
                className={ styles.themeBtn }
                onClick={ toggle }
                aria-label={ isDark ? '라이트 모드로 전환' : '다크 모드로 전환' }
                title={ isDark ? '라이트 모드' : '다크 모드' }
            >
              <span className={ styles.themeBtnIcon } aria-hidden="true">☀️</span>
              <div className={ styles.themeBtnTrack } aria-hidden="true"/>
              <span className={ styles.themeBtnIcon } aria-hidden="true">🌙</span>
            </button>
          </div>

        </div>
      </header>
  )
}
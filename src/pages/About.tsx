import styles from '../styles/pages/About.module.css'

export default function About() {
  return (
      <main className={`${styles.main} page-enter`}>
        <div className={styles.card}>
          <div className={styles.orb} aria-hidden="true"/>

          <div className={styles.avatar} aria-hidden="true">✦</div>

          <header className={styles.header}>
            <p className={styles.eyebrow}>About</p>
            <h1 className={styles.title}>안녕하세요 👋</h1>
          </header>

          <div className={`prose ${styles.prose}`}>
            <p>
              이 공간은 개발과 일상에서 배운 것들을 기록하는 개인 블로그입니다.
              글을 쓰며 생각을 정리하고, 그 과정에서 누군가에게도 도움이 되길 바랍니다.
            </p>
            <h2>관심사</h2>
            <ul>
              <li>프론트엔드 개발 (React, TypeScript)</li>
              <li>UI/UX 디자인</li>
              <li>오픈소스 기여</li>
            </ul>
            <h2>연락처</h2>
            <p>GitHub, 이메일 등 연락처를 여기에 추가하세요.</p>
          </div>
        </div>
      </main>
  )
}
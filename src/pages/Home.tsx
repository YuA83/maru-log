import {Link} from 'react-router-dom'
import {posts, CATEGORIES} from '../posts'
import PostCard from '../components/PostCard'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const featured = posts.slice(0, 3)
  const activeParents = CATEGORIES.filter((parent) =>
      posts.some((p) => p.category.startsWith(parent.id + '/'))
  )

  return (
      <main className={`${styles.main} page-enter`}>

        {/* ── 히어로 ── */}
        <section className={styles.hero}>
          <div className={styles.orb1} aria-hidden="true"/>
          <div className={styles.orb2} aria-hidden="true"/>
          <div className={styles.orb3} aria-hidden="true"/>

          <div className={styles.heroContent}>
            <p className={styles.heroEyebrow}>Maru-Log</p>
            <h1 className={styles.heroTitle}>
              Thoughts,<br/>
              <em>carefully written.</em>
            </h1>
            <p className={styles.heroSub}>
              개발과 일상에서 배운 것들을 기록합니다.
            </p>
            <div className={styles.heroPills}>
              {activeParents.map((p) => (
                  <Link key={p.id} to={`/posts?category=${p.id}`} className={styles.heroPill}>
                    <span>{p.icon}</span>
                    <span>{p.label}</span>
                  </Link>
              ))}
              <Link to="/posts" className={styles.heroPillPrimary}>
                All Posts →
              </Link>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className={styles.heroStats}>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{posts.length}</span>
              <span className={styles.statLabel}>Posts</span>
            </div>
            <div className={styles.statCard}>
              <span className={styles.statNum}>{CATEGORIES.length}</span>
              <span className={styles.statLabel}>Categories</span>
            </div>
            <div className={styles.statCard}>
            <span className={styles.statNum}>
              {CATEGORIES.reduce((a, c) => a + c.children.length, 0)}
            </span>
              <span className={styles.statLabel}>Topics</span>
            </div>
          </div>
        </section>

        {/* ── 최신 포스트 ── */}
        <section className={styles.section}>
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Recent</h2>
            <Link to="/posts" className={styles.seeAll}>View all →</Link>
          </div>
          <div className={styles.grid}>
            {featured.map((post, i) => (
                <PostCard key={post.slug} post={post} index={i}/>
            ))}
          </div>
        </section>

        {/* ── 카테고리별 섹션 ── */}
        {activeParents.map((parent) => {
          const catPosts = posts
              .filter((p) => p.category.startsWith(parent.id + '/'))
              .slice(0, 2)
          if (catPosts.length === 0) return null
          const total = posts.filter((p) =>
              p.category.startsWith(parent.id + '/')
          ).length

          return (
              <section key={parent.id} className={styles.section}>
                <div className={styles.sectionHead}>
                  <h2 className={styles.sectionTitle}>
                    <span className={styles.sectionIcon}>{parent.icon}</span>
                    {parent.label}
                  </h2>
                  <Link to={`/posts?category=${parent.id}`} className={styles.seeAll}>
                    {total}편 →
                  </Link>
                </div>
                <div className={styles.grid}>
                  {catPosts.map((post, i) => (
                      <PostCard key={post.slug} post={post} index={i}/>
                  ))}
                </div>
              </section>
          )
        })}

      </main>
  )
}
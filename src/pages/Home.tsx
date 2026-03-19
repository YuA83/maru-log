import { Link } from 'react-router-dom'
import { posts, CATEGORIES } from '../assets/data/posts.ts'
import PostCard from '../components/PostCard'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const featured = posts[0]                        // 메인 피처드 1개
  const secondary = posts.slice(1, 4)               // 우측 서브 3개
  const remaining = posts.slice(4, 10)              // 하단 그리드
  const activeParents = CATEGORIES.filter((parent) =>
      posts.some((p) => p.category.startsWith(parent.id + '/'))
  )

  return (
      <main className={ `${ styles.main } page-enter` }>

        {/* ══════════════════════════════════════
          히어로 — 큰 타이포 + 카테고리 인덱스
          ══════════════════════════════════════ */ }
        <section className={ styles.hero }>

          {/* 좌: 타이포 블록 */ }
          <div className={ styles.heroLeft }>
            <span className={ styles.heroKicker }>Maru-Log</span>
            <h1 className={ styles.heroTitle }>
              Thoughts,<br/>
              <em>carefully</em><br/>
              written.
            </h1>
          </div>

          {/* 우: 카테고리 인덱스 */ }
          <nav className={ styles.heroIndex } aria-label="카테고리">
            <span className={ styles.heroIndexLabel }>Index</span>
            <ol className={ styles.heroIndexList }>
              { activeParents.map((p, i) => (
                  <li key={ p.id } className={ styles.heroIndexItem }>
                    <Link to={ `/posts?category=${ p.id }` } className={ styles.heroIndexLink }>
                  <span className={ styles.heroIndexNum }>
                    { String(i + 1).padStart(2, '0') }
                  </span>
                      <span className={ styles.heroIndexIcon }>{ p.icon }</span>
                      <span className={ styles.heroIndexText }>{ p.label }</span>
                      <span className={ styles.heroIndexArrow }>→</span>
                    </Link>
                  </li>
              )) }
            </ol>
            <Link to="/posts" className={ styles.heroAllLink }>
              전체 { posts.length }편 보기 ↗
            </Link>
          </nav>

        </section>

        {/* ══════════════════════════════════════
          피처드 — 큰 카드 1 + 서브 3
          ══════════════════════════════════════ */ }
        { featured && (
            <section className={ styles.featuredSection }>

              {/* 섹션 헤더 */ }
              <div className={ styles.sectionBar }>
                <span className={ styles.sectionBarLabel }>Latest</span>
                <span className={ styles.sectionBarLine } aria-hidden="true"/>
              </div>

              <div className={ styles.featuredGrid }>

                {/* 메인 피처드 카드 */ }
                <Link
                    to={ `/posts/${ featured.slug }` }
                    className={ styles.featuredMain }
                >
                  <div className={ styles.featuredMainMeta }>
                <span className={ styles.featuredMainCat }>
                  { featured.category.split('/').pop() }
                </span>
                    <span className={ styles.featuredMainDate }>
                  { featured.date }
                </span>
                  </div>
                  <h2 className={ styles.featuredMainTitle }>{ featured.title }</h2>
                  { featured.description && (
                      <p className={ styles.featuredMainDesc }>{ featured.description }</p>
                  ) }
                  <span className={ styles.featuredMainCta }>Read →</span>
                </Link>

                {/* 서브 카드 3개 */ }
                <div className={ styles.featuredSub }>
                  { secondary.map((post) => (
                      <Link
                          key={ post.slug }
                          to={ `/posts/${ post.slug }` }
                          className={ styles.subCard }
                      >
                        <div className={ styles.subCardMeta }>
                    <span className={ styles.subCardCat }>
                      { post.category.split('/').pop() }
                    </span>
                          <span className={ styles.subCardDate }>{ post.date }</span>
                        </div>
                        <h3 className={ styles.subCardTitle }>{ post.title }</h3>
                      </Link>
                  )) }
                </div>

              </div>
            </section>
        ) }

        {/* ══════════════════════════════════════
          나머지 포스트 — 3열 그리드
          ══════════════════════════════════════ */ }
        { remaining.length > 0 && (
            <section className={ styles.gridSection }>
              <div className={ styles.sectionBar }>
                <span className={ styles.sectionBarLabel }>More</span>
                <span className={ styles.sectionBarLine } aria-hidden="true"/>
                <Link to="/posts" className={ styles.sectionBarLink }>View all →</Link>
              </div>
              <div className={ styles.postGrid }>
                { remaining.map((post, i) => (
                    <PostCard key={ post.slug } post={ post } index={ i }/>
                )) }
              </div>
            </section>
        ) }

      </main>
  )
}
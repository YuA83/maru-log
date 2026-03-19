import { Link } from 'react-router-dom'
import { posts, CATEGORIES } from '../assets/data/posts.ts'
import PostCard from '../components/PostCard'
import styles from '../styles/pages/Home.module.css'

export default function Home() {
  const featured = posts[0]
  const secondary = posts.slice(1, 4)
  const remaining = posts.slice(4, 10)
  const activeParents = CATEGORIES.filter((parent) =>
      posts.some((p) => p.category.startsWith(parent.id + '/'))
  )

  // /* 카테고리별 포스트 수 */
  // const countByParent = (parentId: string) =>
  //     posts.filter((p) => p.category.startsWith(parentId + '/')).length

  /* 전체 태그 수 (중복 제거) */
  const totalTags = new Set(posts.flatMap((p) => p.tags)).size

  return (
      <main className={ `${ styles.main } page-enter` }>

        {/* ── 히어로 — B-2: 센터 + 통계 배지 + 카테고리 pill ── */ }
        <section className={ styles.hero }>
          {/* 이모지 */ }
          <div className={ styles.heroEmoji } aria-hidden="true">🍅✍️</div>

          {/* 제목 */ }
          <h1 className={ styles.heroTitle }>마루의 기록장</h1>

          {/* 소개 */ }
          <p className={ styles.heroSub }>
            개발과 일상에서 배운 것들을<br/>
            천천히, 꾸준히 씁니다.
          </p>

          {/* 통계 배지 */ }
          <div className={ styles.heroStats }>
            <div className={ styles.statBadge }>
              <span className={ styles.statNum }>{ posts.length }</span>
              <span className={ styles.statLabel }>Posts</span>
            </div>
            <div className={ styles.statBadge }>
              <span className={ styles.statNum }>{ activeParents.length }</span>
              <span className={ styles.statLabel }>Topics</span>
            </div>
            <div className={ styles.statBadge }>
              <span className={ styles.statNum }>{ totalTags }</span>
              <span className={ styles.statLabel }>Tags</span>
            </div>
          </div>

          {/* 카테고리 pill + 전체보기 */ }
          <div className={ styles.heroPills }>
            { activeParents.map((p) => (
                <Link key={ p.id } to={ `/posts?category=${ p.id }` } className={ styles.heroPill }>
                  <span>{ p.icon }</span>
                  <span>{ p.label }</span>
                </Link>
            )) }
            <Link to="/posts" className={ styles.heroPillPrimary }>
              전체 보기 →
            </Link>
          </div>
        </section>

        {/* ── 피처드 — 큰 카드 1 + 서브 3 ── */ }
        { featured && (
            <section className={ styles.featuredSection }>
              <div className={ styles.sectionBar }>
                <span className={ styles.sectionBarLabel }>Latest</span>
                <span className={ styles.sectionBarLine } aria-hidden="true"/>
              </div>

              <div className={ styles.featuredGrid }>
                <Link to={ `/posts/${ featured.slug }` } className={ styles.featuredMain }>
                  <div className={ styles.featuredMainMeta }>
                <span className={ styles.featuredMainCat }>
                  { featured.category.split('/').pop() }
                </span>
                    <span className={ styles.featuredMainDate }>{ featured.date }</span>
                  </div>
                  <h2 className={ styles.featuredMainTitle }>{ featured.title }</h2>
                  { featured.description && (
                      <p className={ styles.featuredMainDesc }>{ featured.description }</p>
                  ) }
                  <span className={ styles.featuredMainCta }>Read →</span>
                </Link>

                <div className={ styles.featuredSub }>
                  { secondary.map((post) => (
                      <Link key={ post.slug } to={ `/posts/${ post.slug }` } className={ styles.subCard }>
                        <div className={ styles.subCardMeta }>
                          <span className={ styles.subCardCat }>{ post.category.split('/').pop() }</span>
                          <span className={ styles.subCardDate }>{ post.date }</span>
                        </div>
                        <h3 className={ styles.subCardTitle }>{ post.title }</h3>
                      </Link>
                  )) }
                </div>
              </div>
            </section>
        ) }

        {/* ── 나머지 포스트 — 3열 그리드 ── */ }
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
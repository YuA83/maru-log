import {useParams, Link, Navigate} from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import {format} from 'date-fns'
import {ko} from 'date-fns/locale'
import {posts, findCategory, getCategoryLabel} from '../posts'
import {usePost} from '../hooks/usePost.ts'
import styles from '../styles/pages/PostDetail.module.css'

// 코드 하이라이트 CSS (highlight.js github-dark 테마)
import 'highlight.js/styles/github-dark.css'

/**
 * 개별 포스트 상세 페이지 (/posts/:slug)
 *
 * - useParams()로 slug 추출
 * - posts.ts에서 메타데이터 조회
 * - usePost()로 public/posts/{slug}.md를 fetch
 * - ReactMarkdown으로 렌더링
 */
export default function PostDetail() {
  const {slug} = useParams<{ slug: string }>()

  // slug가 없으면 목록으로 리다이렉트
  if (!slug) return <Navigate to="/posts" replace/>

  // posts.ts에서 메타데이터 찾기
  const meta = posts.find((p) => p.slug === slug)

  // 등록되지 않은 slug는 404
  if (!meta) return <Navigate to="/404" replace/>

  return <PostContent slug={slug} meta={meta}/>
}

// ─── 실제 컨텐츠 렌더링 (분리하여 조건부 훅 호출 문제 방지) ───

import type {PostMeta} from '../posts'

interface PostContentProps {
  slug: string
  meta: PostMeta
}

function PostContent({slug, meta}: PostContentProps) {
  const {content, isLoading, error, readingTime} = usePost(slug)

  const formattedDate = format(new Date(meta.date), 'yyyy년 M월 d일 (EEE)', {
    locale: ko,
  })

  // ── 로딩 상태 ──
  if (isLoading) {
    return (
        <main className={styles.main}>
          <div className={styles.skeleton}>
            <div className={`${styles.skeletonLine} ${styles.skeletonTitle}`}/>
            <div className={`${styles.skeletonLine} ${styles.skeletonMeta}`}/>
            {Array.from({length: 6}).map((_, i) => (
                <div
                    key={i}
                    className={styles.skeletonLine}
                    style={{width: `${75 + Math.random() * 25}%`}}
                />
            ))}
          </div>
        </main>
    )
  }

  // ── 에러 상태 ──
  if (error || !content) {
    return (
        <main className={styles.main}>
          <div className={styles.error}>
            <p className={styles.errorIcon}>✦</p>
            <p className={styles.errorTitle}>포스트를 불러올 수 없습니다</p>
            <p className={styles.errorDesc}>{error}</p>
            <Link to="/posts" className={styles.errorBack}>
              ← 목록으로 돌아가기
            </Link>
          </div>
        </main>
    )
  }

  return (
      <main className={`${styles.main} page-enter`}>
        <article className={styles.article}>
          {/* 브레드크럼 — Home > Category > 제목 */}
          <nav className={styles.breadcrumb}>
            <Link to="/">Home</Link>
            <span>›</span>
            {(() => {
              const cat = findCategory(meta.category)
              if (!cat) return <Link to="/posts">Posts</Link>
              return (
                  <>
                    <Link to={`/posts?category=${cat.parent.id}`}>
                      {cat.parent.label}
                    </Link>
                    {cat.child && (
                        <>
                          <span>›</span>
                          <Link to={`/posts?category=${cat.child.id}`}>
                            {cat.child.label}
                          </Link>
                        </>
                    )}
                  </>
              )
            })()}
            <span>›</span>
            <span className={styles.breadcrumbCurrent}>{meta.title}</span>
          </nav>

          {/* 포스트 헤더 */}
          <header className={styles.header}>
            {/* 태그 */}
            {meta.tags.length > 0 && (
                <div className={styles.tags}>
                  {meta.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                  {tag}
                </span>
                  ))}
                </div>
            )}

            {/* 제목 */}
            <h1 className={styles.title}>{meta.title}</h1>

            {/* 메타 정보 */}
            <div className={styles.meta}>
              <time dateTime={meta.date}>{formattedDate}</time>
              <span>·</span>
              <span>{readingTime}분 읽기</span>
            </div>

            {/* 요약 */}
            <p className={styles.description}>{meta.description}</p>
          </header>

          {/* 구분선 */}
          <div className={styles.divider} aria-hidden="true">✦</div>

          {/* 마크다운 본문 */}
          <div className="prose">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[
                  rehypeHighlight,
                  rehypeSlug,
                  [rehypeAutolinkHeadings, {behavior: 'wrap'}],
                ]}
            >
              {content}
            </ReactMarkdown>
          </div>

          {/* 포스트 푸터 */}
          <footer className={styles.footer}>
            <Link
                to={`/posts?category=${meta.category}`}
                className={styles.backLink}
            >
              ← {getCategoryLabel(meta.category)}으로 돌아가기
            </Link>
          </footer>
        </article>
      </main>
  )
}
import {useMemo} from 'react'
import {useSearchParams} from 'react-router-dom'
import {posts, CATEGORIES, getCategoryLabel, getParentId} from '../assets/data/posts.ts'
import PostCard from '../components/PostCard'
import CategorySidebar from '../components/CategorySidebar'
import CategoryFilter from '../components/CategoryFilter'
import styles from '../styles/pages/PostList.module.css'

/**
 * 전체 포스트 목록 페이지 (/posts?category=...)
 *
 * - category 쿼리 없음 → 전체 포스트 표시
 * - category=dev       → parent "dev" 하위 전체
 * - category=dev/react → child "dev/react" 만
 *
 * 레이아웃: [사이드바 220px] | [포스트 목록 flex-1]
 */
export default function PostList() {

  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? ''

  /** 카테고리 필터 적용 */
  const filtered = useMemo(() => {
    if (!activeCategory) return posts

    return posts.filter((p) => {
      // parent id 선택 시 (예: "dev") → "dev/*" 전체 포함
      if (!activeCategory.includes('/')) {
        return p.category.startsWith(activeCategory + '/')
      }
      // child id 선택 시 정확히 일치
      return p.category === activeCategory
    })
  }, [activeCategory]);

  /** 현재 선택된 카테고리의 표시 제목 */
  const pageTitle = useMemo(() => {
    if (!activeCategory) return 'All Posts'
    // parent id인 경우 parent label
    if (!activeCategory.includes('/')) {
      const parent = CATEGORIES.find((c) => c.id === activeCategory)
      return parent ? `${parent.icon} ${parent.label}` : activeCategory
    }
    // child id인 경우 "parent › child"
    const parentId = getParentId(activeCategory)
    const parent = CATEGORIES.find((c) => c.id === parentId)
    const childLabel = getCategoryLabel(activeCategory)
    return parent ? `${parent.icon} ${parent.label} › ${childLabel}` : childLabel
  }, [activeCategory])

  return (
      <div className={`${styles.wrapper} page-enter`}>
        {/* 사이드바 (860px 이상에서 표시) */}
        <CategorySidebar/>

        {/* 메인 콘텐츠 */}
        <main className={styles.main}>
          {/* 모바일 필터 (860px 이하에서 표시) */}
          <CategoryFilter/>

          {/* 페이지 헤더 */}
          <div className={styles.header}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p className={styles.count}>
              {filtered.length === posts.length
                  ? `총 ${posts.length}편`
                  : `${filtered.length} / ${posts.length}편`}
            </p>
          </div>

          {/* 포스트 목록 */}
          {filtered.length > 0 ? (
              <div className={styles.list}>
                {filtered.map((post, i) => (
                    <PostCard key={post.slug} post={post} index={i}/>
                ))}
              </div>
          ) : (
              /* 빈 상태 */
              <div className={styles.empty}>
                <p className={styles.emptyIcon}></p>
                <p className={styles.emptyText}>아직 포스트가 없습니다.</p>
              </div>
          )}
        </main>
      </div>
  )
}
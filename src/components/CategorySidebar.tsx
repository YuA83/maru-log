import {useState, useEffect} from 'react'
import {useSearchParams, Link} from 'react-router-dom'
import {CATEGORIES, posts, getParentId} from '../posts.ts'
import styles from '../styles/components/CategorySidebar.module.css'

/**
 * 2depth 카테고리 사이드바
 *
 * URL: /posts?category=dev/react
 *   - category 쿼리가 없으면 "전체" 선택
 *   - parent 클릭 → 해당 parent 전체 포스트 필터
 *   - child 클릭  → 해당 child 포스트 필터
 *   - 선택된 category의 parent는 자동으로 열림 (아코디언)
 */
export default function CategorySidebar() {
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? ''

  // 현재 선택된 카테고리의 parent id를 기반으로 초기 열림 상태 결정
  const initialOpenParent = activeCategory ? getParentId(activeCategory) : null
  const [openParents, setOpenParents] = useState<Set<string>>(
      initialOpenParent ? new Set([initialOpenParent]) : new Set()
  )

  // URL 변경 시 해당 parent 자동 열기
  useEffect(() => {
    if (activeCategory) {
      const parentId = getParentId(activeCategory)
      setOpenParents((prev) => new Set([...prev, parentId]))
    }
  }, [activeCategory])

  /** parent 아코디언 토글 */
  const toggleParent = (parentId: string) => {
    setOpenParents((prev) => {
      const next = new Set(prev)
      if (next.has(parentId)) next.delete(parentId)
      else next.add(parentId)
      return next
    })
  }

  /** 카테고리별 포스트 수 계산 */
  const countByCategory = (categoryId: string): number => {
    // parent id면 하위 child 전체 합산
    return posts.filter((p) =>
        categoryId.includes('/')
            ? p.category === categoryId
            : p.category.startsWith(categoryId + '/')
    ).length
  }

  return (
      <aside className={styles.sidebar}>
        <p className={styles.sidebarLabel}>Categories</p>

        <nav className={styles.tree}>
          {/* 전체 보기 */}
          <Link
              to="/posts"
              className={`${styles.allLink} ${activeCategory === '' ? styles.allActive : ''}`}
          >
            <span className={styles.allIcon}>⊞</span>
            <span>All Posts</span>
            <span className={styles.count}>{posts.length}</span>
          </Link>

          {/* 카테고리 트리 */}
          {CATEGORIES.map((parent) => {
            const isOpen = openParents.has(parent.id)
            const isParentActive =
                activeCategory === parent.id ||
                activeCategory.startsWith(parent.id + '/')
            const parentCount = countByCategory(parent.id)

            return (
                <div key={parent.id} className={styles.group}>
                  {/* Parent 행 — 클릭 시 아코디언 토글 + 필터 링크 */}
                  <div
                      className={`${styles.parentRow} ${isParentActive ? styles.parentActive : ''}`}
                  >
                    {/* 아코디언 토글 버튼 */}
                    <button
                        className={styles.toggleBtn}
                        onClick={() => toggleParent(parent.id)}
                        aria-expanded={isOpen}
                        aria-label={`${parent.label} 펼치기/접기`}
                    >
                  <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}>
                    ›
                  </span>
                    </button>

                    {/* Parent 레이블 — 클릭 시 parent 전체 필터 */}
                    <Link
                        to={`/posts?category=${parent.id}`}
                        className={styles.parentLink}
                    >
                      <span className={styles.parentIcon}>{parent.icon}</span>
                      <span className={styles.parentLabel}>{parent.label}</span>
                      <span className={styles.count}>{parentCount}</span>
                    </Link>
                  </div>

                  {/* Child 목록 — 아코디언 */}
                  <div
                      className={`${styles.children} ${isOpen ? styles.childrenOpen : ''}`}
                      aria-hidden={!isOpen}
                  >
                    {parent.children.map((child) => {
                      const childCount = countByCategory(child.id)
                      // 포스트가 없는 child는 렌더링하지 않음
                      if (childCount === 0) return null

                      const isChildActive = activeCategory === child.id

                      return (
                          <Link
                              key={child.id}
                              to={`/posts?category=${child.id}`}
                              className={`${styles.childLink} ${isChildActive ? styles.childActive : ''}`}
                          >
                            <span className={styles.childDot} aria-hidden="true"/>
                            <span>{child.label}</span>
                            <span className={styles.count}>{childCount}</span>
                          </Link>
                      )
                    })}
                  </div>
                </div>
            )
          })}
        </nav>
      </aside>
  )
}
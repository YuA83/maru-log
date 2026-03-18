import {useSearchParams, Link} from 'react-router-dom'
import {CATEGORIES, posts} from '../assets/data/posts.ts'
import styles from '../styles/components/CategoryFilter.module.css'

/**
 * 모바일용 가로 스크롤 카테고리 필터 바
 * 860px 이하에서만 노출 (사이드바 대신 사용)
 *
 * 구조: [All] [Dev] [Dev/React] [Dev/TS] ... [Life] [Life/Essay] ...
 * parent는 굵게, child는 일반 스타일로 구분
 */
export default function CategoryFilter() {
  const [searchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? ''

  const countByCategory = (categoryId: string): number =>
      posts.filter((p) =>
          categoryId.includes('/')
              ? p.category === categoryId
              : p.category.startsWith(categoryId + '/')
      ).length

  return (
      <div className={styles.wrapper}>
        <div className={styles.scroll}>
          {/* 전체 */}
          <Link
              to="/posts"
              className={`${styles.chip} ${activeCategory === '' ? styles.active : ''}`}
          >
            All
          </Link>

          {/* parent + children 순서대로 flat하게 나열 */}
          {CATEGORIES.map((parent) => (
              <div key={parent.id} className={styles.group}>
                <Link
                    to={`/posts?category=${parent.id}`}
                    className={`${styles.chip} ${styles.parentChip} ${
                        activeCategory === parent.id ? styles.active : ''
                    }`}
                >
                  {parent.icon} {parent.label}
                </Link>
                {parent.children.map((child) => {
                  if (countByCategory(child.id) === 0) return null
                  return (
                      <Link
                          key={child.id}
                          to={`/posts?category=${child.id}`}
                          className={`${styles.chip} ${
                              activeCategory === child.id ? styles.active : ''
                          }`}
                      >
                        {child.label}
                      </Link>
                  )
                })}
              </div>
          ))}
        </div>
      </div>
  )
}
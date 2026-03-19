import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import type { PostMeta } from '../assets/data/posts.ts'
import { findCategory } from '../assets/data/posts.ts'
import styles from '../styles/components/PostCard.module.css'

interface PostCardProps {
  post: PostMeta
  index?: number
}

/**
 * 포스트 목록 카드
 * 카테고리 뱃지 (parent > child) 포함
 */
export default function PostCard({ post, index = 0 }: PostCardProps) {
  const formattedDate = format(new Date(post.date), 'yyyy년 M월 d일', { locale: ko })
  const categoryInfo = findCategory(post.category)

  return (
      <article
          className={ styles.card }
          style={ { animationDelay: `${ index * 80 }ms` } }
      >
        {/* 상단: 카테고리 뱃지 + 날짜 */ }
        <div className={ styles.topMeta }>
          {/* 카테고리 경로 뱃지 */ }
          { categoryInfo && (
              <div className={ styles.categoryBadge }>
                <Link
                    to={ `/posts?category=${ categoryInfo.parent.id }` }
                    className={ styles.categoryParent }
                    onClick={ (e) => e.stopPropagation() }
                >
                  { categoryInfo.parent.icon } { categoryInfo.parent.label }
                </Link>
                { categoryInfo.child && (
                    <>
                      <span className={ styles.categorySep }>›</span>
                      <Link
                          to={ `/posts?category=${ categoryInfo.child.id }` }
                          className={ styles.categoryChild }
                          onClick={ (e) => e.stopPropagation() }
                      >
                        { categoryInfo.child.label }
                      </Link>
                    </>
                ) }
              </div>
          ) }

          {/* 날짜 */ }
          <time dateTime={ post.date } className={ styles.date }>
            { formattedDate }
          </time>
        </div>

        {/* 제목 */ }
        <h2 className={ styles.title }>
          <Link to={ `/posts/${ post.slug }` } className={ styles.titleLink }>
            { post.title }
          </Link>
        </h2>

        {/* 요약 */ }
        <p className={ styles.description }>{ post.description }</p>

        {/* 하단: 태그 + 읽기 시간 */ }
        <div className={ styles.bottomMeta }>
          { post.tags.length > 0 && (
              <div className={ styles.tags }>
                { post.tags.map((tag) => (
                    <span key={ tag } className={ styles.tag }>
                { tag }
              </span>
                )) }
              </div>
          ) }
          { post.readingTime && (
              <span className={ styles.readingTime }>{ post.readingTime }분 읽기</span>
          ) }
        </div>
      </article>
  )
}
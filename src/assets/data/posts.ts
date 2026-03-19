/**
 * 포스트 메타데이터 + 카테고리 시스템
 *
 * 카테고리는 2 depth 구조: parent > child
 *   예) "dev/react", "dev/typescript", "life/essay"
 *
 * 새 포스트 추가 절차:
 *   1. public/posts/{slug}.md 생성
 *   2. 아래 posts 배열에 메타데이터 추가
 *   3. 필요 시 CATEGORIES에 새 카테고리 항목 추가
 */

// ── 카테고리 트리 정의 ─────────────────────────────────────────

export interface CategoryChild {
  /** URL 쿼리에 사용되는 값 (parent/child 형태) */
  id: string
  label: string
}

export interface CategoryParent {
  id: string
  label: string
  /** 사이드바에 표시할 아이콘 */
  icon: string
  children: CategoryChild[]
}

/**
 * 카테고리 계층 구조
 * parent.id = "dev"
 * child.id  = "dev/react"  (슬래시로 계층 표현)
 */
export const CATEGORIES: CategoryParent[] = [
  {
    id: 'dev',
    label: 'Development',
    icon: '',
    children: [
      { id: 'dev/aws', label: 'AWS' },
      { id: 'dev/linux', label: 'Linux' },
      { id: 'dev/java', label: 'Java' },
      { id: 'dev/js', label: 'JavaScript' },
      { id: 'dev/etc', label: 'Etc' },
    ],
  },
  {
    id: 'life',
    label: 'Life',
    icon: '',
    children: [
      { id: 'life/daily', label: 'Daily' },
      { id: 'life/book', label: 'Book' },
    ],
  },
  // {
  //   id: 'note',
  //   label: 'Notes',
  //   icon: '',
  //   children: [
  //     { id: 'note/tools', label: 'Tools' },
  //   ],
  // },
]

// ── 유틸리티 함수 ──────────────────────────────────────────────

/** "dev/react" → { parent, child } 반환 */
export const findCategory = (categoryId: string) => {
  for (const parent of CATEGORIES) {
    if (parent.id === categoryId) return { parent, child: null }
    const child = parent.children.find((c) => c.id === categoryId)
    if (child) return { parent, child }
  }
  return null;
}

/** "dev/react" → 부모 id "dev" 반환 */
export const getParentId = (categoryId: string): string => {
  return categoryId.includes('/') ? categoryId.split('/')[0] : categoryId;
}

/** category id로 표시 레이블 반환 */
export const getCategoryLabel = (categoryId: string): string => {
  const found = findCategory(categoryId)
  if (!found) return categoryId
  return found.child ? found.child.label : found.parent.label;
}

// ── 포스트 타입 ────────────────────────────────────────────────

export interface PostMeta {
  slug: string
  title: string
  date: string        // ISO 8601 (예: "2024-01-15")
  description: string
  tags: string[]
  /**
   * 카테고리 id — CATEGORIES의 child.id와 일치해야 함
   * 예: "dev/react", "life/essay", "note/til"
   */
  category: string
  readingTime?: number
}

// ── 포스트 목록 (최신순) ───────────────────────────────────────
const CATEGORY = {
  AWS: "dev/aws",
  LINUX: "dev/linux",
  JAVA: "dev/java",
  JS: "dev/js",
  ETC: "dev/etc",
  DAILY: "life/daily",
  BOOK: "life/book",
};

export const posts: PostMeta[] = [

  {
    slug: "sample",
    title: "[SAMPLE] 첫 번째 포스트에 오신 것을 환영합니다",
    date: "2026-03-19",
    description: "블로그를 시작하며 앞으로 다룰 주제들과 계획을 소개합니다.",
    tags: [ "일상" ],
    category: CATEGORY.DAILY,
  },
]
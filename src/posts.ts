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
    icon: '⌨',
    children: [
      {id: 'dev/react', label: 'React'},
      {id: 'dev/typescript', label: 'TypeScript'},
      {id: 'dev/vite', label: 'Vite'},
      {id: 'dev/etc', label: 'Etc'},
    ],
  },
  {
    id: 'life',
    label: 'Life',
    icon: '✿',
    children: [
      {id: 'life/essay', label: 'Essay'},
      {id: 'life/review', label: 'Review'},
      {id: 'life/daily', label: 'Daily'},
    ],
  },
  {
    id: 'note',
    label: 'Notes',
    icon: '◈',
    children: [
      {id: 'note/til', label: 'TIL'},
      {id: 'note/book', label: 'Book'},
      {id: 'note/tools', label: 'Tools'},
    ],
  },
]

// ── 유틸리티 함수 ──────────────────────────────────────────────

/** "dev/react" → { parent, child } 반환 */
export function findCategory(categoryId: string) {
  for (const parent of CATEGORIES) {
    if (parent.id === categoryId) return {parent, child: null}
    const child = parent.children.find((c) => c.id === categoryId)
    if (child) return {parent, child}
  }
  return null
}

/** "dev/react" → 부모 id "dev" 반환 */
export function getParentId(categoryId: string): string {
  return categoryId.includes('/') ? categoryId.split('/')[0] : categoryId
}

/** category id로 표시 레이블 반환 */
export function getCategoryLabel(categoryId: string): string {
  const found = findCategory(categoryId)
  if (!found) return categoryId
  return found.child ? found.child.label : found.parent.label
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

export const posts: PostMeta[] = [
  {
    slug: 'react-query-guide',
    title: 'React Query 완벽 가이드',
    date: '2024-07-28',
    description: 'TanStack Query v5의 핵심 개념과 실전 패턴을 정리합니다. 캐싱, 무효화, 낙관적 업데이트까지.',
    tags: ['React', 'React Query', 'TanStack'],
    category: 'dev/react',
  },
  {
    slug: 'typescript-tips',
    title: 'TypeScript 실용 팁 모음',
    date: '2024-07-22',
    description: '실무에서 자주 쓰는 TypeScript 유틸리티 타입과 패턴들을 예제와 함께 정리합니다.',
    tags: ['TypeScript'],
    category: 'dev/typescript',
  },
  {
    slug: 'post2',
    title: 'React와 TypeScript로 블로그 만들기',
    date: '2024-07-20',
    description: 'Vite + React + TypeScript 환경에서 GitHub Pages에 배포하는 개인 블로그를 구축하는 과정을 공유합니다.',
    tags: ['React', 'TypeScript', 'Vite', 'GitHub Pages'],
    category: 'dev/vite',
  },
  {
    slug: 'reading-atomic-habits',
    title: '아주 작은 습관의 힘을 읽고',
    date: '2024-07-18',
    description: '제임스 클리어의 습관 형성 이론을 개발자의 관점에서 재해석해봤습니다.',
    tags: ['독서', '자기계발'],
    category: 'life/review',
  },
  {
    slug: 'vite-plugin-deep-dive',
    title: 'Vite 플러그인 구조 파헤치기',
    date: '2024-07-16',
    description: 'Rollup 플러그인 호환성부터 Vite 전용 훅까지, 플러그인 제작의 A to Z.',
    tags: ['Vite', '번들러'],
    category: 'dev/vite',
  },
  {
    slug: 'post1',
    title: '첫 번째 포스트에 오신 것을 환영합니다',
    date: '2024-07-15',
    description: '블로그를 시작하며 앞으로 다룰 주제들과 계획을 소개합니다.',
    tags: ['일상'],
    category: 'life/essay',
  },
]
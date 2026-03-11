import {useState, useEffect} from 'react'

interface UsePostResult {
  content: string | null
  isLoading: boolean
  error: string | null
  readingTime: number // 분 단위
}

/**
 * 포스트 md 파일을 fetch하는 커스텀 훅
 * public/posts/{slug}.md를 동적으로 불러옴
 *
 * @param slug - 포스트 slug (파일명 기준)
 */
export function usePost(slug: string): UsePostResult {
  const [content, setContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [readingTime, setReadingTime] = useState(0)

  useEffect(() => {
    let cancelled = false

    const fetchPost = async () => {
      setIsLoading(true)
      setError(null)
      setContent(null)

      try {
        // Vite의 base URL을 고려한 경로 (import.meta.env.BASE_URL)
        const response = await fetch(`${import.meta.env.BASE_URL}posts/${slug}.md`)

        if (!response.ok) {
          throw new Error(`포스트를 찾을 수 없습니다 (${response.status})`)
        }

        const text = await response.text()

        if (!cancelled) {
          setContent(text)
          // 평균 읽기 속도 200 wpm 기준으로 읽기 시간 계산
          const wordCount = text.trim().split(/\s+/).length
          setReadingTime(Math.max(1, Math.ceil(wordCount / 200)))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다')
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false)
        }
      }
    }

    fetchPost()

    // 클린업: 컴포넌트 언마운트 시 비동기 결과 무시
    return () => {
      cancelled = true
    }
  }, [slug])

  return {content, isLoading, error, readingTime}
}
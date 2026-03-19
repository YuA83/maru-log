import { useEffect, useCallback } from 'react'
import styles from '../styles/components/Modal.module.css'
import aboutData from '../assets/data/aboutData'
import type { ResumeProject } from '../assets/data/aboutData'

export type DocumentType = 'resume' | 'coverLetter' | null

interface Props {
  type: DocumentType
  onClose: () => void
}

const DOC_META: Record<NonNullable<DocumentType>, { label: string; emoji: string }> = {
  resume: { label: '경력 기술서', emoji: '📄' },
  coverLetter: { label: '자기소개서', emoji: '✍️' },
}

/* ── 경력 기술서 렌더러 ── */
const ResumeContent = () => (
    <div className={ styles.resumeList }>
      { aboutData.resume.map((project: ResumeProject, i: number) => (
          <div key={ i } className={ styles.resumeCard }>

            {/* 프로젝트명 + 기간 */ }
            <div className={ styles.resumeHeader }>
              <h3 className={ styles.resumeTitle }>{ project.name }</h3>
              <span className={ styles.resumePeriod }>{ project.period }</span>
            </div>

            {/* 메타 테이블 */ }
            <dl className={ styles.resumeMeta }>
              <div className={ styles.resumeRow }>
                <dt className={ styles.resumeKey }>발주처</dt>
                <dd className={ styles.resumeVal }>{ project.client }</dd>
              </div>
              <div className={ styles.resumeRow }>
                <dt className={ styles.resumeKey }>주업무</dt>
                <dd className={ styles.resumeVal }>{ project.role }</dd>
              </div>
              { project.note && (
                  <div className={ styles.resumeRow }>
                    <dt className={ styles.resumeKey }>특이사항</dt>
                    <dd className={ styles.resumeVal }>{ project.note }</dd>
                  </div>
              ) }
            </dl>

          </div>
      )) }
    </div>
)

/* ── 자기소개서 — 메일 문의 안내 ── */
const CoverLetterContent = () => {
  const email = aboutData.contact.find((c) => c.k === 'email')?.v ?? ''

  return (
      <div className={ styles.contactInquiry }>
        <div className={ styles.contactInquiryIcon } aria-hidden="true">✉️</div>
        <h3 className={ styles.contactInquiryTitle }>메일 부탁드립니다</h3>
        <p className={ styles.contactInquiryDesc }>
          자기소개서는 메일로 요청 주시면 전달드리겠습니다.<br/>
          관심 가져주셔서 감사합니다 🙇🏻‍♀️<br/>
        </p>
        <a
            href={ `mailto:${ email }` }
            className={ styles.contactInquiryBtn }
        >
          { email } 으로 메일 보내기 →
        </a>
        <p className={ styles.contactInquiryNote }>
          * 회사명과 채용 포지션을 함께 남겨주시면 감사하겠습니다.
        </p>
      </div>
  )
}

/* ── 메인 컴포넌트 ── */
export default function DocumentModal({ type, onClose }: Props) {
  const handleKeyDown = useCallback(
      (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      },
      [ onClose ],
  )

  useEffect(() => {
    // type이 없으면 아무것도 하지 않음 — hooks는 항상 실행되어야 하므로 조건은 안으로
    if (!type) return
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      // 명시적으로 auto로 복원 — 빈 문자열은 일부 브라우저에서 미복원될 수 있음
      document.body.style.overflow = 'auto'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [ type, handleKeyDown ])  // type을 의존성에 추가 — 닫힐 때(null) cleanup 실행

  // type이 null이면 렌더링하지 않음 — hooks 이후에 위치해야 Rules of Hooks 준수
  if (!type) return null

  const meta = DOC_META[type]

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
      <div
          className={ styles.overlay }
          onClick={ handleOverlayClick }
          role="dialog"
          aria-modal="true"
          aria-label={ meta.label }
      >
        <div className={ styles.panel }>

          {/* 헤더 */ }
          <div className={ styles.header }>
            <div className={ styles.titleRow }>
              <span className={ styles.titleEmoji } aria-hidden="true">{ meta.emoji }</span>
              <h2 className={ styles.title }>{ meta.label }</h2>
            </div>
            <button className={ styles.closeBtn } onClick={ onClose } aria-label="닫기">
              ✕
            </button>
          </div>

          {/* 본문 */ }
          <div className={ styles.body }>
            { type === 'resume' && <ResumeContent/> }
            { type === 'coverLetter' && <CoverLetterContent/> }
          </div>

        </div>
      </div>
  )
}
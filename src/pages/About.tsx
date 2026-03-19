import { useState } from 'react'
import styles from '../styles/pages/About.module.css'
import aboutData from '../assets/data/aboutData.ts'
import DocumentModal, { type DocumentType } from '../components/Modal.tsx'

const isUrl = (v: string) => v.startsWith('http://') || v.startsWith('https://')
const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)

const About = () => {
  /* 현재 열린 문서 타입 — null이면 닫힘 */
  const [ openDoc, setOpenDoc ] = useState<DocumentType>(null)

  return (
      <>
        <main className={ `${ styles.main } page-enter` }>
          <div className={ styles.card }>
            <div className={ styles.orb } aria-hidden="true"/>
            <div className={ styles.avatar } aria-hidden="true">🙇🏻‍♀️</div>

            <header className={ styles.header }>
              <p className={ styles.eyebrow }>About</p>
              <h1 className={ styles.title }>안녕하세요 👋</h1>
            </header>

            <div className={ `prose ${ styles.prose }` }>
              <p>{ aboutData.intro }</p>

              {/* ── 프로필 뱃지 (B안 — 둥근 뱃지) ── */ }
              <div className={ styles.profileMeta }>
                { aboutData.profile.map((item, i) => (
                    <span key={ i } className={ styles.profileMetaItem }>
                    <span className={ styles.profileMetaIcon } aria-hidden="true">{ item.icon }</span>
                      { item.text }
                  </span>
                )) }
              </div>

              {/* ── 문서 버튼 그룹 ── */ }
              <div className={ styles.docButtons }>
                <button
                    className={ styles.docBtn }
                    onClick={ () => setOpenDoc('resume') }
                >
                  <span className={ styles.docBtnEmoji } aria-hidden="true">📄</span>
                  <span className={ styles.docBtnText }>
                  <span className={ styles.docBtnLabel }>경력 기술서</span>
                  <span className={ styles.docBtnSub }>Resume</span>
                </span>
                  <span className={ styles.docBtnArrow } aria-hidden="true">›</span>
                </button>

                <button
                    className={ styles.docBtn }
                    onClick={ () => setOpenDoc('coverLetter') }
                >
                  <span className={ styles.docBtnEmoji } aria-hidden="true">✍️</span>
                  <span className={ styles.docBtnText }>
                  <span className={ styles.docBtnLabel }>자기소개서</span>
                  <span className={ styles.docBtnSub }>Cover Letter</span>
                </span>
                  <span className={ styles.docBtnArrow } aria-hidden="true">›</span>
                </button>
              </div>

              <h2>🛠 Tech Stack</h2>
              <div className={ styles.techGrid }>
                { aboutData.techList.map(({ name, icon }: { name: string; icon: string }) => (
                    <div key={ name } className={ styles.techCard }>
                      <img
                          src={ `${ import.meta.env.BASE_URL }icons/${ icon }` }
                          alt={ name }
                          width={ 28 }
                          height={ 28 }
                          className={ styles.techIcon }
                          onError={ (e) => {
                            e.currentTarget.style.display = 'none'
                            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null
                            if (fallback) fallback.style.display = 'inline'
                          } }
                      />
                      <span className={ styles.techIconFallback } aria-hidden="true">🔧</span>
                      <span className={ styles.techName }>{ name }</span>
                    </div>
                )) }
              </div>

              <h2>📞 Contact</h2>
              <ul className={ styles.contactList }>
                { aboutData.contact.map(({ k, v }: { k: string; v: string }) => (
                    <li key={ k } className={ styles.contactItem }>
                      <span className={ styles.contactKey }>{ k }</span>
                      { isUrl(v) ? (
                          <a href={ v } className={ styles.contactValue } target="_blank" rel="noopener noreferrer">
                            { v }
                          </a>
                      ) : isEmail(v) ? (
                          <a href={ `mailto:${ v }` } className={ styles.contactValue }>
                            { v }
                          </a>
                      ) : (
                          <span className={ styles.contactValue }>{ v }</span>
                      ) }
                    </li>
                )) }
              </ul>
            </div>
          </div>
        </main>

        {/* 문서 팝업 — type이 null이면 렌더링 안 함 */ }
        <DocumentModal type={ openDoc } onClose={ () => setOpenDoc(null) }/>
      </>
  )
}

export default About
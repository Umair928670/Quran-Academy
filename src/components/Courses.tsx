import { useState, useRef, useEffect } from 'react'
import { CheckCircle } from 'lucide-react'
import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'

import tajweedImg from '../assets/course-tajweed.jpg'
import hifzImg from '../assets/course-hifz.jpg'
import islamicStudiesImg from '../assets/course-islamic-studies.jpg'
import ladiesImg from '../assets/course-ladies.jpg'

const courseImages = [
  tajweedImg,
  hifzImg,
  islamicStudiesImg,
  ladiesImg,
]

function CourseCard({ title, desc, points, img, visible, delay, lang }: {
  title: string; desc: string; points: string[]; img: string
  visible: boolean; delay: number; lang: string
}) {
  return (
    <article
      className="card"
      style={{
        overflow: 'hidden',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(24px)',
        transition: `opacity 0.5s ease ${delay}s, transform 0.5s ease ${delay}s`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="img-hover-zoom" style={{ aspectRatio: '16/9', overflow: 'hidden' }}>
        <img
          src={img}
          alt={title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
      </div>
      <div style={{ padding: 'var(--space-5)', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flexGrow: 1 }}>
        <h3
          style={{
            fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
            fontSize: 'var(--text-lg)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
            lineHeight: 1.3,
          }}
        >
          {title}
        </h3>
        <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
          {desc}
        </p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', margin: 0, padding: 0, listStyle: 'none' }}>
          {points.map(pt => (
            <li key={pt} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <CheckCircle size={13} color="var(--color-primary)" style={{ flexShrink: 0 }} />
              <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)' }}>
                {pt}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default function Courses() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()
  const [activeSlide, setActiveSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = sliderRef.current
    if (!el) return
    const onScroll = () => {
      const index = Math.round(el.scrollLeft / el.offsetWidth)
      setActiveSlide(Math.min(index, t.courses.items.length - 1))
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [t.courses.items.length])

  return (
    <section
      id="courses"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--color-bg)' }}
      dir={dir}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
            <span className="badge" style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)' }}>
              {t.courses.badge}
            </span>
          </div>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', marginBottom: 'var(--space-4)' }}
          >
            {t.courses.heading}
          </h2>
          <p
            className="section-subheading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', margin: '0 auto' }}
          >
            {t.courses.sub}
          </p>
        </div>

        {/* ── Desktop grid (hidden on mobile via CSS) ── */}
        <div
          className="courses-grid-desktop"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-6)',
          }}
        >
          {t.courses.items.map(({ title, desc, points }, i) => (
            <CourseCard
              key={title}
              title={title} desc={desc} points={points}
              img={courseImages[i % courseImages.length]} visible={visible} delay={i * 0.1} lang={lang}
            />
          ))}
        </div>

        {/* ── Mobile slider (hidden on desktop via CSS) ── */}
        <div style={{ position: 'relative' }}>
          <div
            ref={sliderRef}
            className="courses-slider-mobile"
            style={{
              display: 'none',           /* CSS shows this on mobile */
              overflowX: 'auto',
              gap: 'var(--space-4)',
              paddingBottom: 'var(--space-4)',
              scrollSnapType: 'x mandatory',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              /* Bleed edge hint: cards are 82vw so ~18vw of next card peeks */
            }}
          >
            {t.courses.items.map(({ title, desc, points }, i) => (
              <div
                key={title}
                style={{
                  flex: '0 0 82vw',
                  maxWidth: '320px',
                  scrollSnapAlign: 'start',
                }}
              >
                <CourseCard
                  title={title} desc={desc} points={points}
                  img={courseImages[i % courseImages.length]} visible={visible} delay={i * 0.1} lang={lang}
                />
              </div>
            ))}
          </div>

          {/* Swipe hint dots */}
          <div
            className="courses-slider-dots"
            style={{
              display: 'none',
              justifyContent: 'center',
              gap: 'var(--space-2)',
              marginTop: 'var(--space-4)',
            }}
          >
            {t.courses.items.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === activeSlide ? '18px' : '6px',
                  height: '6px',
                  borderRadius: 'var(--radius-full)',
                  background: i === activeSlide ? 'var(--color-primary)' : 'var(--color-border)',
                  transition: 'width 0.25s ease, background 0.25s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop: 4-col → 2-col at 1100 */
        .courses-grid-desktop { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 1100px) and (min-width: 768px) {
          .courses-grid-desktop { grid-template-columns: repeat(2, 1fr) !important; }
        }
        /* Mobile: hide desktop grid, show slider */
        @media (max-width: 767px) {
          .courses-grid-desktop { display: none !important; }
          .courses-slider-mobile { display: flex !important; }
          .courses-slider-mobile::-webkit-scrollbar { display: none; }
          .courses-slider-dots { display: flex !important; }
        }
      `}</style>
    </section>
  )
}

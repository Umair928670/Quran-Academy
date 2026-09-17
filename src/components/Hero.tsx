import { useEffect, useRef } from 'react'
import { Video, Users, Clock, BarChart2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

import heroImage from '../assets/hero-bg.jpg'
import heroImageMobile from '../assets/hero-bg-mobile.jpg'

export default function Hero() {
  const { t, lang, dir } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = ref.current?.querySelectorAll<HTMLElement>('[data-reveal]')
    if (!els) return
    els.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(24px)'
      setTimeout(() => {
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
      }, 120 * i)
    })
  }, [lang])

  const features = [
    { icon: Video, label: t.hero.feat1 },
    { icon: Users, label: t.hero.feat2 },
    { icon: Clock, label: t.hero.feat3 },
    { icon: BarChart2, label: t.hero.feat4 },
  ]

  return (
    <section
      ref={ref}
      className="hero-section"
      style={{
        position: 'relative',
        paddingTop: 'calc(var(--navbar-height) + var(--space-16))',
        paddingBottom: 'var(--space-20)',
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'var(--color-bg)',
      }}
      dir={dir}
    >
      {/* Full Background Image Layer with smooth horizontal flip for Urdu */}
      <div
        className="hero-bg-img"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: lang === 'ur' ? 'scaleX(-1)' : 'none',
          transition: 'transform 0.5s ease',
          zIndex: 0,
        }}
      />

      {/* Background Gradient Overlay for optimal readability */}
      <div
        className="hero-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            dir === 'rtl'
              ? 'linear-gradient(to left, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 50%, var(--hero-overlay-end) 60%)'
              : 'linear-gradient(to right, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 50%, var(--hero-overlay-end) 60%)',
          zIndex: 1,
          pointerEvents: 'none',
          transition: 'background 0.4s ease',
        }}
      />

      {/* Hero Content */}
      <div className="section-container" style={{ position: 'relative', zIndex: 2, width: '100%' }}>
        <div
          style={{
            maxWidth: '620px',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-6)',
          }}
        >
          {/* Badge */}
          <div data-reveal style={{ display: 'inline-flex' }}>
            <span className="badge" style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)' }}>
              <span style={{ fontSize: '8px' }}>●</span> {t.hero.badge}
            </span>
          </div>

          {/* Heading */}
          <h1
            data-reveal
            className="section-heading"
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
              fontSize: 'clamp(2.2rem, 4.5vw, 3.75rem)',
              lineHeight: 1.15,
            }}
          >
            {t.hero.heading}
          </h1>

          {/* Subheading */}
          <p
            data-reveal
            className="hero-subheading"
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-secondary)',
              lineHeight: 1.75,
              maxWidth: '540px',
            }}
          >
            {t.hero.subheading}
          </p>

          {/* Feature pills */}
          <div
            data-reveal
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 'var(--space-3)',
              marginTop: 'var(--space-4)',
              maxWidth: '540px',
            }}
          >
            {features.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="hero-feature-box"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border-light)',
                  borderRadius: 'var(--radius-md)',
                  padding: 'var(--space-3) var(--space-4)',
                  boxShadow: 'var(--shadow-sm)',
                  backdropFilter: 'blur(8px)',
                }}
              >
                <span
                  className="hero-feature-icon"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--color-primary-muted)',
                    color: 'var(--color-primary)',
                    flexShrink: 0,
                  }}
                >
                  <Icon size={14} />
                </span>
                <span
                  className="hero-feature-label"
                  style={{
                    fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-primary)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .hero-bg-img {
          background-image: url(${heroImage});
        }
        @media (max-width: 768px) {
          .hero-bg-img {
            background-image: url(${heroImageMobile}) !important;
          }
          .hero-overlay {
            background: linear-gradient(to bottom, var(--hero-overlay-start) 0%, var(--hero-overlay-mid) 75%, var(--hero-overlay-start) 100%) !important;
          }
        }
      `}</style>
    </section>
  )
}

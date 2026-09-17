import { useEffect, useRef } from 'react'
import { Video, Users, Clock, BarChart2 } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

const heroImage =
  'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&h=700&fit=crop&auto=format'

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
      className="geo-pattern"
      style={{
        paddingTop: 'calc(var(--navbar-height) + var(--space-16))',
        paddingBottom: 'var(--space-16)',
        background: 'var(--color-bg)',
        overflow: 'hidden',
      }}
      dir={dir}
    >
      <div className="section-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--space-16)',
            alignItems: 'center',
          }}
          className="hero-grid"
        >
          {/* Left */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
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
                fontSize: 'clamp(2rem, 4vw, 3.5rem)',
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
                maxWidth: '520px',
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

          {/* Right — image */}
          <div
            data-reveal
            style={{ position: 'relative' }}
          >
            {/* Decorative ring */}
            <div
              style={{
                position: 'absolute',
                inset: '-16px',
                borderRadius: 'var(--radius-2xl)',
                background: 'linear-gradient(135deg, var(--color-primary-muted) 0%, var(--color-accent-light) 100%)',
                zIndex: 0,
              }}
            />
            {/* Islamic pattern overlay top-right */}
            <div
              style={{
                position: 'absolute',
                top: '-24px',
                right: dir === 'rtl' ? 'auto' : '-24px',
                left: dir === 'rtl' ? '-24px' : 'auto',
                width: '80px',
                height: '80px',
                zIndex: 2,
                opacity: 0.7,
              }}
            >
              <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="40" cy="40" r="36" stroke="#c9a84c" strokeWidth="2" strokeDasharray="6 4"/>
                <circle cx="40" cy="40" r="20" stroke="#1b5e38" strokeWidth="1.5"/>
                <path d="M40 4L40 76M4 40L76 40M11.7 11.7L68.3 68.3M68.3 11.7L11.7 68.3" stroke="#1b5e38" strokeWidth="0.5" opacity="0.4"/>
              </svg>
            </div>

            <div
              className="img-hover-zoom"
              style={{
                position: 'relative',
                zIndex: 1,
                borderRadius: 'var(--radius-xl)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-xl)',
              }}
            >
              <img
                src={heroImage}
                alt="Muslim student learning Quran online at home with a laptop"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
              {/* Overlay gradient at bottom */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '40%',
                  background: 'linear-gradient(to top, rgba(27,94,56,0.4) 0%, transparent 100%)',
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              style={{
                position: 'absolute',
                bottom: '24px',
                left: dir === 'rtl' ? 'auto' : '-32px',
                right: dir === 'rtl' ? '-32px' : 'auto',
                zIndex: 3,
                background: 'var(--color-bg-card)',
                border: '1px solid var(--color-border-light)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                boxShadow: 'var(--shadow-lg)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                minWidth: '180px',
              }}
            >
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Users size={18} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xl)', fontWeight: 700, color: 'var(--color-primary)' }}>
                  {t.hero.enrolledCount}
                </div>
                <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)' }}>
                  {t.hero.enrolledLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-grid > div:last-child {
            display: none;
          }
        }
      `}</style>
    </section>
  )
}

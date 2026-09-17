import { CheckCircle, ArrowRight } from 'lucide-react'
import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'

import ladiesImage from '../assets/ladies-section.jpg'

export default function LadiesSection() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  return (
    <section
      id="ladies"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--color-bg)' }}
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
          className="ladies-grid"
        >
          {/* Image side */}
          <div
            style={{
              position: 'relative',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : `translateX(${dir === 'rtl' ? '24px' : '-24px'})`,
              transition: 'opacity 0.6s ease, transform 0.6s ease',
              order: dir === 'rtl' ? 1 : 0,
            }}
          >
            {/* Gold decorative frame */}
            <div
              style={{
                position: 'absolute',
                top: '-12px',
                left: '-12px',
                right: '12px',
                bottom: '12px',
                borderRadius: 'var(--radius-2xl)',
                border: '2px solid var(--color-accent)',
                opacity: 0.4,
                zIndex: 0,
              }}
            />
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
                src={ladiesImage}
                alt="Muslim woman learning Quran online at home"
                style={{ width: '100%', aspectRatio: '5/4', objectFit: 'cover', display: 'block' }}
              />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(135deg, rgba(201,168,76,0.1) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          {/* Text side */}
          <div
            style={{
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : `translateX(${dir === 'rtl' ? '-24px' : '24px'})`,
              transition: 'opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s',
              order: dir === 'rtl' ? 0 : 1,
            }}
          >
            {/* Badge */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <span
                className="badge"
                style={{
                  background: 'var(--color-accent-light)',
                  color: 'var(--color-accent)',
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                }}
              >
                {t.ladies.badge}
              </span>
            </div>

            <h2
              className="section-heading"
              style={{
                fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
                marginBottom: 'var(--space-4)',
              }}
            >
              {t.ladies.heading}
            </h2>

            <p
              style={{
                fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-secondary)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-8)',
              }}
            >
              {t.ladies.sub}
            </p>

            <div className="ladies-features-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', marginBottom: 'var(--space-8)' }}>
              {t.ladies.features.map(f => (
                <div
                  key={f}
                  className="ladies-feature-box"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    background: 'var(--color-accent-light)',
                    padding: 'var(--space-4) var(--space-5)',
                    borderRadius: 'var(--radius-lg)',
                    minHeight: '60px',
                  }}
                >
                  <CheckCircle className="ladies-feature-icon" size={20} color="var(--color-accent)" style={{ flexShrink: 0 }} />
                  <span className="ladies-feature-text" style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <button
              className="btn-accent"
              onClick={() => document.querySelector('#trial')?.scrollIntoView({ behavior: 'smooth' })}
              style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)' }}
            >
              <ArrowRight size={16} />
              {t.ladies.cta}
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .ladies-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 900px) {
          .ladies-grid { grid-template-columns: 1fr !important; }
          .ladies-grid > div { order: unset !important; }
        }
        @media (max-width: 767px) {
          .ladies-feature-box {
            padding: 8px 10px !important;
            gap: 6px !important;
            min-height: unset !important;
            border-radius: var(--radius-md) !important;
            align-items: flex-start !important;
          }
          .ladies-feature-icon {
            width: 14px !important;
            height: 14px !important;
            margin-top: 2px;
          }
          .ladies-feature-text {
            font-size: 11px !important;
            font-weight: 500 !important;
            line-height: 1.35 !important;
          }
          .ladies-features-grid {
            gap: var(--space-2) !important;
          }
        }
      `}</style>
    </section>
  )
}

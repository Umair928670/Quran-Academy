import { User, Users, Calendar, Globe, FileText, Heart } from 'lucide-react'
import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'

const featureIcons = [User, Users, Calendar, Globe, FileText, Heart]

export default function WhyChooseUs() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  return (
    <section
      id="why-us"
      ref={ref}
      className="section-py"
      style={{ background: 'var(--color-bg-section-alt)' }}
      dir={dir}
    >
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', marginBottom: 'var(--space-4)' }}
          >
            {t.whyUs.heading}
          </h2>
          <p
            className="section-subheading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', margin: '0 auto' }}
          >
            {t.whyUs.sub}
          </p>
        </div>

        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-5)' }}
          className="why-grid"
        >
          {t.whyUs.items.map(({ h, s }, i) => {
            const Icon = featureIcons[i % featureIcons.length]
            return (
              <div
                key={h}
                className="card"
                style={{
                  padding: 'var(--space-8)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: `opacity 0.5s ease ${i * 0.08}s, transform 0.5s ease ${i * 0.08}s`,
                }}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-lg)',
                    background: 'var(--color-primary-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Icon size={20} />
                </div>
                <div>
                  <h3
                    style={{
                      fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    {h}
                  </h3>
                  <p
                    style={{
                      fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      lineHeight: 1.6,
                    }}
                  >
                    {s}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <style>{`
        .why-grid { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) { .why-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 500px) { .why-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}


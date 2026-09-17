import { useState } from 'react'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'

export default function Testimonials() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()
  const [active, setActive] = useState(0)

  const items = t.testimonials.items
  const prev = () => setActive(a => (a - 1 + items.length) % items.length)
  const next = () => setActive(a => (a + 1) % items.length)

  return (
    <section
      ref={ref}
      className="section-py"
      style={{ background: 'var(--color-bg)' }}
      dir={dir}
    >
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)' }}
          >
            {t.testimonials.heading}
          </h2>
        </div>

        {/* Desktop grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 'var(--space-5)',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease, transform 0.6s ease',
          }}
          className="testimonials-desktop"
        >
          {items.map(({ text, name, role, country, flag }) => (
            <div
              key={name}
              className="card"
              style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
            >
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />
                ))}
              </div>
              <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontStyle: 'italic', flexGrow: 1 }}>
                "{text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', borderTop: '1px solid var(--color-border-light)', paddingTop: 'var(--space-4)' }}>
                <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 700, flexShrink: 0 }}>
                  {name[0]}
                </div>
                <div>
                  <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {name}
                  </div>
                  <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                    {role} · {flag} {country}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="testimonials-mobile" style={{ display: 'none' }}>
          <div
            style={{
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border-light)',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
            }}
          >
            {(() => {
              const current = items[active % items.length]
              if (!current) return null
              const { text, name, role, country, flag } = current
              return (
                <>
                  <div style={{ display: 'flex', gap: '2px' }}>
                    {[...Array(5)].map((_, i) => <Star key={i} size={14} fill="#c9a84c" color="#c9a84c" />)}
                  </div>
                  <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-base)', color: 'var(--color-text-secondary)', lineHeight: 1.7, fontStyle: 'italic' }}>
                    "{text}"
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700 }}>{name[0]}</div>
                      <div>
                        <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{name}</div>
                        <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>{role} · {flag} {country}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                      <button onClick={prev} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary)' }}><ChevronLeft size={16} /></button>
                      <button onClick={next} style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid var(--color-border)', background: 'var(--color-bg)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-primary)' }}><ChevronRight size={16} /></button>
                    </div>
                  </div>
                </>
              )
            })()}
          </div>
          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-2)', marginTop: 'var(--space-4)' }}>
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: i === active ? '24px' : '8px',
                  height: '8px',
                  borderRadius: 'var(--radius-full)',
                  background: i === active ? 'var(--color-primary)' : 'var(--color-border)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s ease, background 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-grid { grid-template-columns: repeat(4, 1fr); }
        @media (max-width: 900px) {
          .testimonials-desktop { display: none !important; }
          .testimonials-mobile { display: block !important; }
        }
      `}</style>
    </section>
  )
}

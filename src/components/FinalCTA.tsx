import { MessageCircle, Mail } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useIntersection } from '../hooks/useIntersection'

export default function FinalCTA() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  return (
    <section
      ref={ref}
      id="contact"
      style={{
        background: 'var(--color-bg-dark-hero)',
        padding: 'var(--space-24) 0',
        position: 'relative',
        overflow: 'hidden',
      }}
      dir={dir}
    >
      {/* Decorative geometric background */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23c9a84c' stroke-width='1'%3E%3Cpolygon points='40,4 76,22 76,58 40,76 4,58 4,22'/%3E%3Cpolygon points='40,16 64,28 64,52 40,64 16,52 16,28'/%3E%3Ccircle cx='40' cy='40' r='12'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Gold arc top */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-120px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '600px',
          height: '240px',
          borderRadius: '50%',
          border: '1px solid rgba(201,168,76,0.15)',
        }}
      />

      <div
        className="section-container"
        style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'var(--space-6)',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'opacity 0.6s ease, transform 0.6s ease',
        }}
      >
        {/* Arabic decorative element */}
        <div
          style={{
            fontFamily: 'var(--font-urdu)',
            fontSize: 'var(--text-2xl)',
            color: 'var(--color-accent)',
            opacity: 0.7,
            letterSpacing: '0.05em',
          }}
        >
          {t.finalCta.bismillah}
        </div>

        <h2
          className="section-heading"
          style={{
            fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
            color: 'white',
            fontSize: 'clamp(1.75rem, 4vw, 3rem)',
          }}
        >
          {t.finalCta.heading}
        </h2>

        <p
          style={{
            fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
            fontSize: 'var(--text-lg)',
            color: 'rgba(255,255,255,0.75)',
            maxWidth: '560px',
            lineHeight: 1.7,
          }}
        >
          {t.finalCta.sub}
        </p>

        <div style={{ display: 'flex', gap: 'var(--space-4)', flexWrap: 'wrap', justifyContent: 'center', marginTop: 'var(--space-4)' }}>
          <button
            className="btn-accent"
            onClick={() => document.querySelector('#trial')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
              fontSize: 'var(--text-base)',
              padding: 'var(--space-4) var(--space-8)',
            }}
          >
            {t.finalCta.cta1}
          </button>
          <a
            href="mailto:taleemulquranlearning@gmail.com"
            className="btn-secondary"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              padding: 'var(--space-4) var(--space-6)',
              background: 'rgba(255,255,255,0.08)',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'white',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              textDecoration: 'none',
              borderRadius: 'var(--radius-full)',
              transition: 'all 0.2s ease',
            }}
          >
            <Mail size={16} color="var(--color-accent)" />
            <span>taleemulquranlearning@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  )
}

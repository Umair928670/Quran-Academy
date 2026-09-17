import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'

export default function HowItWorks() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  const steps = [
    { n: '01', h: t.howItWorks.step1h, s: t.howItWorks.step1s },
    { n: '02', h: t.howItWorks.step2h, s: t.howItWorks.step2s },
    { n: '03', h: t.howItWorks.step3h, s: t.howItWorks.step3s },
  ]

  const items: React.ReactNode[] = []

  steps.forEach(({ n, h, s }, i) => {
    items.push(
      <div
        key={`step-${n}`}
        className="hiw-step"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          maxWidth: '280px',
          flex: '0 0 260px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: `opacity 0.6s ease ${i * 0.25}s, transform 0.6s ease ${i * 0.25}s`,
        }}
      >
        <div
          className="hiw-circle"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: i === 1 ? 'var(--color-primary)' : 'var(--color-bg)',
            border: `3px solid ${i === 1 ? 'var(--color-primary)' : 'var(--color-border)'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-display)',
            fontSize: 'var(--text-2xl)',
            fontWeight: 700,
            color: i === 1 ? 'white' : 'var(--color-primary)',
            marginBottom: 'var(--space-6)',
            flexShrink: 0,
            boxShadow: i === 1 ? '0 8px 24px rgba(27,94,56,0.3)' : 'var(--shadow-md)',
            position: 'relative',
          }}
        >
          {i === 1 && (
            <div style={{ position: 'absolute', inset: '-6px', borderRadius: '50%', border: '2px solid var(--color-accent)', opacity: 0.5 }} />
          )}
          {n}
        </div>

        <h3
          className="hiw-title"
          style={{
            fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
            fontSize: 'var(--text-base)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-3)',
            lineHeight: 1.3,
          }}
        >
          {h}
        </h3>
        <p
          className="hiw-body"
          style={{
            fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            color: 'var(--color-text-secondary)',
            lineHeight: 1.7,
            maxWidth: '220px',
          }}
        >
          {s}
        </p>
      </div>
    )

    if (i < steps.length - 1) {
      items.push(
        <div
          key={`arrow-${i}`}
          className="step-arrow"
          style={{
            flex: '0 0 80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '28px',
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease ${i * 0.25 + 0.4}s`,
          }}
        >
          <svg
            width="80"
            height="24"
            viewBox="0 0 80 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }}
          >
            <path
              d="M0 12 Q20 4 40 12 Q60 20 78 12"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeDasharray="5 4"
              fill="none"
              style={{
                strokeDashoffset: visible ? 0 : 120,
                transition: `stroke-dashoffset 0.8s ease ${i * 0.25 + 0.5}s`,
              }}
            />
            <path
              d="M72 7 L79 12 L72 17"
              stroke="var(--color-accent)"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              style={{ opacity: visible ? 1 : 0, transition: `opacity 0.3s ease ${i * 0.25 + 1.1}s` }}
            />
          </svg>
        </div>
      )
    }
  })

  return (
    <section
      id="how-it-works"
      ref={ref}
      className="section-py geo-pattern"
      style={{ background: 'var(--color-bg-card)' }}
      dir={dir}
    >
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-16)' }}>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)' }}
          >
            {t.howItWorks.heading}
          </h2>
        </div>

        <div
          className="steps-row"
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            gap: 0,
            flexWrap: 'nowrap',
          }}
        >
          {items}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-12)' }}>
          <button
            className="btn-primary"
            onClick={() => document.querySelector('#trial')?.scrollIntoView({ behavior: 'smooth' })}
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)' }}
          >
            {t.howItWorks.cta}
          </button>
        </div>
      </div>

      <style>{`
        /* Desktop stays as-is */
        .steps-row { flex-direction: row; }

        /* Mobile: all 3 steps stay horizontal, scaled down to fit */
        @media (max-width: 767px) {
          .steps-row {
            flex-wrap: nowrap !important;
            justify-content: center !important;
            overflow-x: visible !important;
            gap: 0 !important;
          }
          .hiw-step {
            flex: 0 0 88px !important;
            max-width: 88px !important;
            padding: 0 2px !important;
          }
          .hiw-circle {
            width: 42px !important;
            height: 42px !important;
            font-size: 13px !important;
            margin-bottom: 10px !important;
          }
          .hiw-title {
            font-size: 9.5px !important;
            margin-bottom: 4px !important;
          }
          .hiw-body {
            font-size: 8.5px !important;
            line-height: 1.45 !important;
            max-width: 82px !important;
          }
          .step-arrow {
            flex: 0 0 32px !important;
            padding-top: 12px !important;
          }
          .step-arrow svg {
            width: 32px !important;
            height: 14px !important;
          }
        }
      `}</style>
    </section>
  )
}

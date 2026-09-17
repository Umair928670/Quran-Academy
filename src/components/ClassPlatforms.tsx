import { Video, Smartphone, Check, ArrowRight, Monitor, Laptop } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'
import { useIntersection } from '../hooks/useIntersection'

export default function ClassPlatforms() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  const platforms = [
    {
      id: 'whatsapp',
      title: t.platforms.whatsappTitle,
      tag: t.platforms.whatsappTag,
      desc: t.platforms.whatsappDesc,
      features: t.platforms.whatsappFeatures,
      themeColor: '#25D366',
      bgColor: 'rgba(37, 211, 102, 0.08)',
      borderColor: 'rgba(37, 211, 102, 0.25)',
      badgeBg: 'rgba(37, 211, 102, 0.12)',
      badgeColor: '#128C7E',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#25D366">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.669-.699c.969.539 1.95.823 2.791.823 3.182 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.768-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.062-1.109-.071-.247-.079-.569-.191-.986-.372-1.761-.767-2.906-2.553-2.994-2.671-.088-.118-.718-.956-.718-1.822 0-.866.454-1.292.616-1.468.162-.176.353-.221.471-.221.118 0 .235.001.338.006.109.005.253-.041.396.3.147.353.501 1.222.545 1.311.044.089.073.193.015.309-.059.118-.088.192-.176.295-.088.103-.186.23-.265.309-.088.088-.18.184-.077.361.103.176.458.756.983 1.224.676.602 1.246.788 1.423.876.177.088.279.074.382-.045.103-.118.442-.515.56-.691.118-.176.235-.147.397-.088.162.059 1.029.485 1.206.574.177.088.294.132.338.206.044.073.044.426-.1 1.831z"/>
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.434 5.176L2 22l4.981-1.306A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18.182c-1.63 0-3.149-.477-4.43-1.299l-.317-.201-2.964.777.791-2.89-.208-.33A8.14 8.14 0 013.818 12c0-4.511 3.67-8.182 8.182-8.182 4.511 0 8.182 3.671 8.182 8.182 0 4.511-3.671 8.182-8.182 8.182z"/>
        </svg>
      ),
    },
    {
      id: 'zoom',
      title: t.platforms.zoomTitle,
      tag: t.platforms.zoomTag,
      desc: t.platforms.zoomDesc,
      features: t.platforms.zoomFeatures,
      themeColor: '#2D8CFF',
      bgColor: 'rgba(45, 140, 255, 0.08)',
      borderColor: 'rgba(45, 140, 255, 0.25)',
      badgeBg: 'rgba(45, 140, 255, 0.12)',
      badgeColor: '#0E71EB',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30" fill="#2D8CFF">
          <path d="M4.5 5.5A2.5 2.5 0 002 8v8a2.5 2.5 0 002.5 2.5h10a2.5 2.5 0 002.5-2.5V8a2.5 2.5 0 00-2.5-2.5h-10zM18 9.5l3.24-2.16A1 1 0 0123 8.17v7.66a1 1 0 01-1.76.83L18 14.5v-5z"/>
        </svg>
      ),
    },
    {
      id: 'meet',
      title: t.platforms.meetTitle,
      tag: t.platforms.meetTag,
      desc: t.platforms.meetDesc,
      features: t.platforms.meetFeatures,
      themeColor: '#00AC47',
      bgColor: 'rgba(0, 172, 71, 0.08)',
      borderColor: 'rgba(0, 172, 71, 0.25)',
      badgeBg: 'rgba(0, 172, 71, 0.12)',
      badgeColor: '#008738',
      icon: (
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path fill="#00832d" d="M15 8l4.5-3.5v15L15 16V8z"/>
          <path fill="#0066da" d="M3 6.5A2.5 2.5 0 015.5 4H13a2 2 0 012 2v12a2 2 0 01-2 2H5.5A2.5 2.5 0 013 17.5v-11z"/>
          <path fill="#e53935" d="M3 6.5C3 5.12 4.12 4 5.5 4H10v5H3V6.5z"/>
          <path fill="#ffba00" d="M3 17.5C3 18.88 4.12 20 5.5 20H10v-5H3v2.5z"/>
          <path fill="#00ac47" d="M10 9h5v6h-5z"/>
        </svg>
      ),
    },
  ]

  return (
    <section
      id="platforms"
      ref={ref}
      className="section-py"
      style={{
        background: 'var(--color-bg)',
        borderTop: '1px solid var(--color-border-light)',
        borderBottom: '1px solid var(--color-border-light)',
      }}
      dir={dir}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <div style={{ display: 'inline-flex', marginBottom: 'var(--space-4)' }}>
            <span
              className="badge"
              style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)' }}
            >
              {t.platforms.badge}
            </span>
          </div>

          <h2
            className="section-heading"
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {t.platforms.heading}
          </h2>

          <p
            className="section-subheading"
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
              margin: '0 auto',
              maxWidth: '640px',
            }}
          >
            {t.platforms.sub}
          </p>
        </div>

        {/* 3 Platforms Cards */}
        <div
          className="platforms-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-12)',
          }}
        >
          {platforms.map((p, index) => (
            <div
              key={p.id}
              className="card platform-card"
              style={{
                padding: 'var(--space-6)',
                display: 'flex',
                flexDirection: 'column',
                borderRadius: 'var(--radius-xl)',
                border: `1px solid var(--color-border-light)`,
                background: 'var(--color-bg-card)',
                boxShadow: 'var(--shadow-md)',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(24px)',
                transition: `all 0.5s ease ${index * 0.12}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Subtle top accent bar */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: p.themeColor,
                }}
              />

              {/* Icon & Tag header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: 'var(--space-3)',
                  marginBottom: 'var(--space-5)',
                }}
              >
                <div
                  style={{
                    width: '54px',
                    height: '54px',
                    borderRadius: 'var(--radius-lg)',
                    background: p.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `1px solid ${p.borderColor}`,
                    flexShrink: 0,
                  }}
                >
                  {p.icon}
                </div>

                <span
                  style={{
                    fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    background: p.badgeBg,
                    color: p.badgeColor,
                  }}
                >
                  {p.tag}
                </span>
              </div>

              {/* Title & Description */}
              <h3
                style={{
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-2)',
                }}
              >
                {p.title}
              </h3>

              <p
                style={{
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.6,
                  marginBottom: 'var(--space-5)',
                  flexGrow: 1,
                }}
              >
                {p.desc}
              </p>

              {/* Feature Points */}
              <div
                style={{
                  borderTop: '1px solid var(--color-border-light)',
                  paddingTop: 'var(--space-4)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-2)',
                }}
              >
                {p.features.map(f => (
                  <div
                    key={f}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--space-2)',
                    }}
                  >
                    <span
                      style={{
                        width: '18px',
                        height: '18px',
                        borderRadius: '50%',
                        background: p.bgColor,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: p.themeColor,
                        flexShrink: 0,
                        marginTop: '2px',
                      }}
                    >
                      <Check size={11} strokeWidth={3} />
                    </span>
                    <span
                      style={{
                        fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--color-text-secondary)',
                        lineHeight: 1.5,
                      }}
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Device Compatibility Ribbon */}
        <div
          style={{
            background: 'var(--color-bg-section-alt)',
            border: '1px solid var(--color-border-light)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-6) var(--space-8)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-6)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', gap: 'var(--space-3)', color: 'var(--color-primary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                <Smartphone size={18} />
                <span>Mobile</span>
              </div>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                <Laptop size={18} />
                <span>Tablet / iPad</span>
              </div>
              <span style={{ color: 'var(--color-border)' }}>•</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)', fontWeight: 600 }}>
                <Monitor size={18} />
                <span>Laptop & PC</span>
              </div>
            </div>
            <p
              style={{
                margin: 0,
                fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                color: 'var(--color-text-secondary)',
              }}
            >
              {t.platforms.footerNote}
            </p>
          </div>

          <button
            className="btn-primary"
            onClick={() => document.querySelector('#trial')?.scrollIntoView({ behavior: 'smooth' })}
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              padding: 'var(--space-3) var(--space-6)',
            }}
          >
            <span>{t.platforms.cta}</span>
            <ArrowRight size={15} />
          </button>
        </div>
      </div>

      <style>{`
        .platforms-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        @media (max-width: 1024px) and (min-width: 641px) {
          .platforms-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .platforms-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}

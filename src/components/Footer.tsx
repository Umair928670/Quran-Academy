import { useLanguage } from '../context/LanguageContext'

export default function Footer() {
  const { t, lang, setLang, dir } = useLanguage()

  const cols = [
    {
      heading: t.footer.academy,
      links: [
        { label: t.footer.about, href: '#about' },
        { label: t.footer.coursesLink, href: '#courses' },
        { label: t.footer.whyUsLink, href: '#why-us' },
      ],
    },
    {
      heading: t.footer.support,
      links: [
        { label: t.footer.faqLink, href: '#faq' },
        { label: t.footer.contactLink, href: '#contact' },
        { label: 'taleemulquranlearning@gmail.com', href: 'mailto:taleemulquranlearning@gmail.com', external: true },
        { label: t.footer.whatsappLink, href: 'https://wa.me/923701396275', external: true },
      ],
    },
    {
      heading: t.footer.courses,
      links: [
        { label: t.footer.quranReading, href: '#courses' },
        { label: t.footer.hifz, href: '#courses' },
        { label: t.footer.islamicStudies, href: '#courses' },
        { label: t.footer.ladiesClasses, href: '#courses' },
      ],
    },
    {
      heading: t.footer.legal,
      links: [
        { label: t.footer.privacyPolicy, href: '#' },
        { label: t.footer.terms, href: '#' },
      ],
    },
  ]

  const scrollTo = (href: string) => {
    if (href.startsWith('http')) return
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer
      id="about"
      style={{
        background: 'var(--color-bg-card)',
        borderTop: '1px solid var(--color-border-light)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
      }}
      dir={dir}
    >
      <div className="section-container">
        {/* Top grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '280px repeat(4, 1fr)',
            gap: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid var(--color-border-light)',
          }}
          className="footer-grid"
        >
          {/* Brand column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <a
              href="#"
              onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            >
              <img
                src="/logo.png"
                alt="Taleem ul Quran Learning"
                style={{ height: '56px', width: 'auto', display: 'block', objectFit: 'contain' }}
              />
            </a>
            <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-accent)' }}>
              {t.footer.tagline}
            </p>
            <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
              {t.footer.description}
            </p>
            {/* Language selector */}
            <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
              <button
                type="button"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  background: lang === 'en' ? 'var(--color-primary)' : 'transparent',
                  color: lang === 'en' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setLang('en')}
              >
                English
              </button>
              <button
                type="button"
                style={{
                  fontFamily: 'var(--font-urdu)',
                  fontSize: 'var(--text-xs)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--color-border)',
                  cursor: 'pointer',
                  background: lang === 'ur' ? 'var(--color-primary)' : 'transparent',
                  color: lang === 'ur' ? 'white' : 'var(--color-text-secondary)',
                  transition: 'all 0.2s ease',
                }}
                onClick={() => setLang('ur')}
              >
                اردو
              </button>
            </div>
          </div>

          {/* Link columns */}
          {cols.map(({ heading, links }) => (
            <div key={heading}>
              <div
                style={{
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-5)',
                  letterSpacing: lang === 'ur' ? 0 : '0.05em',
                  textTransform: lang === 'ur' ? 'none' : 'uppercase',
                }}
              >
                {heading}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                {links.map(({ label, href, external }) => (
                  <a
                    key={label}
                    href={href}
                    target={external ? '_blank' : undefined}
                    rel={external ? 'noopener noreferrer' : undefined}
                    onClick={e => { if (!external) { e.preventDefault(); scrollTo(href) } }}
                    style={{
                      fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text-secondary)',
                      textDecoration: 'none',
                      transition: 'color var(--transition-fast)',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-secondary)')}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div
          style={{
            paddingTop: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
          }}
        >
          <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-muted)' }}>
            {t.footer.copyright}
          </p>
          <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {t.footer.bottomNote}
          </p>
        </div>
      </div>

      <style>{`
        .footer-grid { grid-template-columns: 280px repeat(4, 1fr); }
        @media (max-width: 1024px) { .footer-grid { grid-template-columns: 1fr 1fr 1fr !important; } }
        @media (max-width: 600px) { .footer-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </footer>
  )
}

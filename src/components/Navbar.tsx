import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Globe } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

export default function Navbar() {
  const { lang, setLang, t, dir } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [darkMode, setDarkMode] = useState(false)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    const onResize = () => {
      const desktop = window.innerWidth >= 1024
      setIsDesktop(desktop)
      if (desktop) setMenuOpen(false)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const navLinks = [
    { label: t.nav.courses, href: '#courses' },
    { label: t.nav.whyUs, href: '#why-us' },
    { label: t.nav.howItWorks, href: '#how-it-works' },
    { label: t.nav.ladies, href: '#ladies' },
    { label: t.nav.faq, href: '#faq' },
    { label: t.nav.contact, href: '#contact' },
  ]

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`} dir={dir}>
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6)',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
          }}
        >
          {/* Logo */}
          <a
            href="#"
            onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, textDecoration: 'none', minWidth: 0 }}
          >
            <img
              src="/logo.png"
              alt="Taleem ul Quran Learning"
              style={{ height: isDesktop ? '52px' : '38px', width: 'auto', display: 'block', flexShrink: 0, objectFit: 'contain' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2, minWidth: 0 }}>
              <span style={{
                fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)',
                fontSize: isDesktop ? 'var(--text-base)' : '12px',
                fontWeight: 700,
                color: 'var(--color-primary)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {t.brand.name}
              </span>
              <span style={{
                fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                fontSize: isDesktop ? 'var(--text-xs)' : '10px',
                fontWeight: 500,
                color: 'var(--color-accent)',
                letterSpacing: lang === 'ur' ? 0 : '0.03em',
                whiteSpace: 'nowrap',
              }}>
                {isDesktop ? t.brand.subDesktop : t.brand.subMobile}
              </span>
            </div>
          </a>

          {/* Desktop nav links — hidden on mobile */}
          {isDesktop && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1, justifyContent: 'center' }}>
              {navLinks.map(link => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                  style={{
                    fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 500,
                    color: 'var(--color-text-secondary)',
                    textDecoration: 'none',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-md)',
                    transition: 'color var(--transition-fast), background var(--transition-fast)',
                    whiteSpace: 'nowrap',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--color-primary)'
                    el.style.background = 'var(--color-primary-muted)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.color = 'var(--color-text-secondary)'
                    el.style.background = 'transparent'
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          )}

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flexShrink: 0 }}>
            {/* Language switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ur' : 'en')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                background: 'var(--color-bg-section-alt)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-full)',
                padding: '4px 10px',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                whiteSpace: 'nowrap',
              }}
              title={lang === 'en' ? 'اردو میں دیکھیں' : 'Switch to English'}
            >
              <Globe size={12} />
              {lang === 'en' ? 'اردو' : 'EN'}
            </button>

            {/* Dark mode toggle */}
            <button
              onClick={() => setDarkMode(d => !d)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--color-border)',
                background: 'var(--color-bg-section-alt)',
                color: 'var(--color-text-secondary)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                flexShrink: 0,
              }}
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Book trial — desktop only */}
            {isDesktop && (
              <button
                className="btn-primary"
                onClick={() => scrollTo('#trial')}
                style={{
                  padding: '8px 18px',
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.nav.bookTrial}
              </button>
            )}

            {/* Hamburger — mobile only */}
            {!isDesktop && (
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--color-border)',
                  background: 'var(--color-bg-section-alt)',
                  color: 'var(--color-text-primary)',
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {menuOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile slide-in menu — only rendered when not desktop */}
      {!isDesktop && (
        <div className={`mobile-menu${menuOpen ? ' open' : ''}`} dir={dir}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={e => { e.preventDefault(); scrollTo(link.href) }}
                style={{
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  textDecoration: 'none',
                  padding: 'var(--space-4)',
                  borderRadius: 'var(--radius-md)',
                  display: 'block',
                  borderBottom: '1px solid var(--color-border-light)',
                }}
              >
                {link.label}
              </a>
            ))}
            <div style={{ marginTop: 'var(--space-4)' }}>
              <button
                className="btn-primary"
                style={{
                  width: '100%',
                  justifyContent: 'center',
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                }}
                onClick={() => scrollTo('#trial')}
              >
                {t.nav.bookTrial}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

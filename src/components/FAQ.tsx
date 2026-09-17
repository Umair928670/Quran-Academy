import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

type FaqCategoryKey = 'Classes' | 'Tutors' | 'Scheduling' | 'Students' | 'Technology'

export default function FAQ() {
  const { t, lang, dir } = useLanguage()
  const [open, setOpen] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<FaqCategoryKey>('Classes')

  const toggle = (id: string) => setOpen(o => o === id ? null : id)

  const categories: FaqCategoryKey[] = ['Classes', 'Tutors', 'Scheduling', 'Students', 'Technology']

  return (
    <section
      id="faq"
      className="section-py"
      style={{ background: 'var(--color-bg-card)' }}
      dir={dir}
    >
      <div className="section-container">
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)' }}
          >
            {t.faq.heading}
          </h2>
        </div>

        {/* Category tabs */}
        <div
          className="faq-filters"
          style={{
            display: 'flex',
            gap: 'var(--space-2)',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginBottom: 'var(--space-10)',
          }}
        >
          {categories.map(catKey => {
            const label = t.faq.categories[catKey] || catKey
            const isSelected = activeCategory === catKey
            return (
              <button
                key={catKey}
                onClick={() => setActiveCategory(catKey)}
                style={{
                  fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 500,
                  padding: 'var(--space-2) var(--space-5)',
                  borderRadius: 'var(--radius-full)',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                  background: isSelected ? 'var(--color-primary)' : 'var(--color-bg-section-alt)',
                  color: isSelected ? 'white' : 'var(--color-text-secondary)',
                }}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* FAQ items */}
        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
          }}
        >
          {t.faq.items
            .filter(d => d.category === activeCategory)
            .map(({ q, a }) => {
              const id = q.slice(0, 20)
              const isOpen = open === id
              return (
                <div
                  key={q}
                  style={{
                    border: `1px solid ${isOpen ? 'var(--color-primary)' : 'var(--color-border-light)'}`,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    transition: 'border-color var(--transition-fast)',
                    background: 'var(--color-bg)',
                  }}
                >
                  <button
                    onClick={() => toggle(id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: 'var(--space-5)',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      gap: 'var(--space-4)',
                      textAlign: dir === 'rtl' ? 'right' : 'left',
                    }}
                  >
                    <span className="faq-question-text" style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                      {q}
                    </span>
                    <ChevronDown
                      size={18}
                      color="var(--color-text-muted)"
                      style={{
                        flexShrink: 0,
                        transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
                        transition: 'transform 0.3s ease',
                      }}
                    />
                  </button>
                  <div
                    className={`accordion-content${isOpen ? ' open' : ''}`}
                  >
                    <div style={{ padding: '0 var(--space-5) var(--space-5)' }}>
                      <p className="faq-answer-text" style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', color: 'var(--color-text-secondary)', lineHeight: 1.7, margin: 0 }}>
                        {a}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{
              fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              fontWeight: 600,
              color: 'var(--color-primary)',
              textDecoration: 'none',
            }}
          >
            {t.faq.viewAll}
          </a>
        </div>
      </div>
    </section>
  )
}

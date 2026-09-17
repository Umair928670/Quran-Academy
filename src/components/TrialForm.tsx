import { useState, useEffect } from 'react'
import { CheckCircle, Star, ArrowRight } from 'lucide-react'
import { useLanguage } from '../context/LanguageContext'

// Configurable destination email, Web3Forms, or form webhook endpoint
// You can set VITE_CONTACT_EMAIL, VITE_WEB3FORMS_ACCESS_KEY, or VITE_FORM_ENDPOINT in your .env / Vercel
const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT || ''
const DESTINATION_EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'extramailcom2233@gmail.com'
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || ''
const WHATSAPP_NUMBER = '923701396275'

interface CustomInputProps {
  label: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  type?: string
  dir?: string
  lang?: string
}

function CustomInput({ label, placeholder, value, onChange, type = 'text', dir, lang }: CustomInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
      }}>
        {label}
      </label>
      <input
        type={type}
        dir={dir}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          color: 'var(--color-text-primary)',
          fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          outline: 'none',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-muted)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      />
    </div>
  )
}

interface CustomSelectProps {
  label: string
  placeholder?: string
  value: string
  onChange: (val: string) => void
  options: { value: string; label: string }[]
  dir?: string
  lang?: string
}

function CustomSelect({ label, placeholder, value, onChange, options, dir, lang }: CustomSelectProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{
        fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
        fontSize: 'var(--text-xs)',
        fontWeight: 600,
        color: 'var(--color-text-secondary)',
      }}>
        {label}
      </label>
      <select
        dir={dir}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          color: value ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          outline: 'none',
          cursor: 'pointer',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        onFocus={e => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-muted)'
        }}
        onBlur={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <option value="" disabled>{placeholder || 'Select...'}</option>
        {options.map(o => (
          <option key={o.value} value={o.value} style={{ color: 'var(--color-text-primary)' }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  )
}

const COUNTRY_DIAL_CODES = [
  { code: '+92', country: 'Pakistan', label: '🇵🇰 +92 (PK)' },
  { code: '+44', country: 'United Kingdom', label: '🇬🇧 +44 (UK)' },
  { code: '+1', country: 'United States', label: '🇺🇸 +1 (US/CA)' },
  { code: '+971', country: 'UAE', label: '🇦🇪 +971 (UAE)' },
  { code: '+966', country: 'Saudi Arabia', label: '🇸🇦 +966 (SA)' },
  { code: '+61', country: 'Australia', label: '🇦🇺 +61 (AU)' },
  { code: '+49', country: 'Germany', label: '🇩🇪 +49 (DE)' },
  { code: '+974', country: 'Qatar', label: '🇶🇦 +974 (QA)' },
  { code: '+968', country: 'Oman', label: '🇴🇲 +968 (OM)' },
  { code: '+965', country: 'Kuwait', label: '🇰🇼 +965 (KW)' },
  { code: '+973', country: 'Bahrain', label: '🇧🇭 +973 (BH)' },
  { code: '+60', country: 'Malaysia', label: '🇲🇾 +60 (MY)' },
  { code: '+90', country: 'Turkey', label: '🇹🇷 +90 (TR)' },
  { code: '+91', country: 'India', label: '🇮🇳 +91 (IN)' },
  { code: '+880', country: 'Bangladesh', label: '🇧🇩 +880 (BD)' },
  { code: '+27', country: 'South Africa', label: '🇿🇦 +27 (ZA)' },
  { code: '+34', country: 'Spain', label: '🇪🇸 +34 (ES)' },
  { code: '+33', country: 'France', label: '🇫🇷 +33 (FR)' },
  { code: '+39', country: 'Italy', label: '🇮🇹 +39 (IT)' },
  { code: '+31', country: 'Netherlands', label: '🇳🇱 +31 (NL)' },
  { code: '+47', country: 'Norway', label: '🇳🇴 +47 (NO)' },
  { code: '+46', country: 'Sweden', label: '🇸🇪 +46 (SE)' },
  { code: '+41', country: 'Switzerland', label: '🇨🇭 +41 (CH)' },
  { code: '+64', country: 'New Zealand', label: '🇳🇿 +64 (NZ)' },
  { code: '+62', country: 'Indonesia', label: '🇮🇩 +62 (ID)' },
  { code: '+20', country: 'Egypt', label: '🇪🇬 +20 (EG)' },
  { code: '+962', country: 'Jordan', label: '🇯🇴 +962 (JO)' },
  { code: '+353', country: 'Ireland', label: '🇮🇪 +353 (IE)' },
]

interface WhatsAppPhoneInputProps {
  label: string
  countryCode: string
  onCountryCodeChange: (code: string) => void
  phone: string
  onPhoneChange: (phone: string) => void
  placeholder?: string
  lang?: string
}

function WhatsAppPhoneInput({
  label,
  countryCode,
  onCountryCodeChange,
  phone,
  onPhoneChange,
  placeholder = '300 0000000',
  lang,
}: WhatsAppPhoneInputProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label
        style={{
          fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
          fontSize: 'var(--text-xs)',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </label>
      <div
        style={{
          display: 'flex',
          direction: 'ltr',
          borderRadius: 'var(--radius-md)',
          border: '1px solid var(--color-border)',
          background: 'var(--color-bg)',
          overflow: 'hidden',
          transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
        }}
        onFocusCapture={e => {
          e.currentTarget.style.borderColor = 'var(--color-primary)'
          e.currentTarget.style.boxShadow = '0 0 0 3px var(--color-primary-muted)'
        }}
        onBlurCapture={e => {
          e.currentTarget.style.borderColor = 'var(--color-border)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        <select
          value={countryCode}
          onChange={e => onCountryCodeChange(e.target.value)}
          aria-label="Country Code"
          style={{
            padding: '10px 8px',
            border: 'none',
            borderRight: '1px solid var(--color-border)',
            background: 'var(--color-bg-section-alt)',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-xs)',
            fontWeight: 600,
            cursor: 'pointer',
            outline: 'none',
            maxWidth: '128px',
            flexShrink: 0,
          }}
        >
          {COUNTRY_DIAL_CODES.map(c => (
            <option key={c.code} value={c.code}>
              {c.label}
            </option>
          ))}
        </select>
        <input
          type="tel"
          dir="ltr"
          value={phone}
          onChange={e => onPhoneChange(e.target.value)}
          placeholder={placeholder}
          style={{
            width: '100%',
            padding: '10px 12px',
            border: 'none',
            background: 'transparent',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--text-sm)',
            outline: 'none',
          }}
        />
      </div>
    </div>
  )
}

export default function TrialForm() {
  const { t, lang, dir } = useLanguage()
  const [countryCode, setCountryCode] = useState('+92')
  const [form, setForm] = useState({
    name: '', whatsapp: '', email: '', country: '',
    age: '', course: '', tutor: '', time: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [mobileStep, setMobileStep] = useState(1)
  const [errors, setErrors] = useState<Partial<Record<keyof typeof form, string>>>({})

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize, { passive: true })
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const set = (k: keyof typeof form) => (v: string) => setForm(f => ({ ...f, [k]: v }))

  const handleCountryChange = (c: string) => {
    set('country')(c)
    setErrors(e => ({ ...e, country: '' }))
    const matched = COUNTRY_DIAL_CODES.find(dc => dc.country.toLowerCase() === c.toLowerCase())
    if (matched) {
      setCountryCode(matched.code)
    }
  }

  const validate = () => {
    const errs: Partial<Record<keyof typeof form, string>> = {}
    if (!form.name.trim()) errs.name = t.trial.validation.nameRequired
    if (!form.whatsapp.trim()) errs.whatsapp = t.trial.validation.whatsappRequired
    if (!form.country.trim()) errs.country = t.trial.validation.countryRequired
    if (!form.course.trim()) errs.course = t.trial.validation.courseRequired
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNextStep = () => {
    const errs: Partial<Record<keyof typeof form, string>> = {}
    if (!form.name.trim()) errs.name = t.trial.validation.nameRequired
    if (!form.whatsapp.trim()) errs.whatsapp = t.trial.validation.whatsappRequired
    if (!form.country.trim()) errs.country = t.trial.validation.countryRequired
    setErrors(errs)
    if (Object.keys(errs).length === 0) setMobileStep(2)
  }

  const sendEmailNotification = async () => {
    setIsSubmitting(true)
    try {
      const endpoint = WEB3FORMS_KEY
        ? 'https://api.web3forms.com/submit'
        : FORM_ENDPOINT

      const fullWhatsApp = `${countryCode} ${form.whatsapp.trim()}`

      const payload = {
        access_key: WEB3FORMS_KEY || undefined,
        from_name: 'Taleem ul Quran Learning Portal',
        to_email: DESTINATION_EMAIL,
        subject: `New Free Trial Booking: ${form.name} (${form.course})`,
        student_name: form.name,
        whatsapp_number: fullWhatsApp,
        email: form.email || 'Not provided',
        country: form.country,
        age_group: form.age,
        selected_course: form.course,
        tutor_preference: form.tutor,
        preferred_time: form.time,
        submitted_at: new Date().toISOString(),
      }

      if (endpoint) {
        await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify(payload),
        })
      }
    } catch {
      // Graceful error recovery: still proceed to success screen so student sees confirmation
    } finally {
      setIsSubmitting(false)
      setSubmitted(true)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    sendEmailNotification()
  }

  const sel = (opts: string[]) => opts.map(o => ({ value: o, label: o }))

  const countryOptions = sel([
    'Pakistan', 'United Kingdom', 'United States', 'Canada',
    'Australia', 'UAE', 'Saudi Arabia', 'Germany', 'Other',
  ])

  /* ── Success state (shared mobile + desktop) ── */
  const whatsappBookingUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    `Assalamu Alaikum, I have booked a free trial class on Taleem ul Quran Learning.\n\n*Name:* ${form.name}\n*Course:* ${form.course}\n*Country:* ${form.country}\n*WhatsApp:* ${countryCode} ${form.whatsapp}`
  )}`

  const successCard = (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-10) 0', textAlign: 'center' }}>
      <CheckCircle size={48} color="var(--color-primary)" />
      <h3 style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', fontSize: 'var(--text-2xl)', color: 'var(--color-primary)' }}>
        {t.trial.successHeading}
      </h3>
      <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', color: 'var(--color-text-secondary)', maxWidth: '380px', fontSize: 'var(--text-sm)', lineHeight: 1.7 }}>
        {t.trial.successSub}
      </p>
      <a
        href={whatsappBookingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary"
        style={{
          marginTop: 'var(--space-2)',
          fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          textDecoration: 'none',
        }}
      >
        <span>💬</span> {lang === 'ur' ? 'واٹس ایپ پر رابطہ تصدیق کریں' : 'Confirm on WhatsApp Now'}
      </a>
    </div>
  )

  /* ── Desktop form ── */
  const desktopForm = (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)' }} className="form-grid">
        <div>
          <CustomInput
            label={`${t.trial.fields.name} *`}
            placeholder={t.trial.placeholders.name}
            value={form.name}
            onChange={v => { set('name')(v); setErrors(e => ({ ...e, name: '' })) }}
            dir={dir}
            lang={lang}
          />
          {errors.name && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.name}</span>}
        </div>
        <div>
          <WhatsAppPhoneInput
            label={`${t.trial.fields.whatsapp} *`}
            countryCode={countryCode}
            onCountryCodeChange={setCountryCode}
            phone={form.whatsapp}
            onPhoneChange={v => { set('whatsapp')(v); setErrors(e => ({ ...e, whatsapp: '' })) }}
            placeholder={t.trial.placeholders.whatsapp}
            lang={lang}
          />
          {errors.whatsapp && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.whatsapp}</span>}
        </div>
        <CustomInput
          label={t.trial.fields.email}
          placeholder={t.trial.placeholders.email}
          value={form.email}
          onChange={set('email')}
          type="email"
          dir="ltr"
          lang={lang}
        />
        <div>
          <CustomSelect
            label={`${t.trial.fields.country} *`}
            options={countryOptions}
            value={form.country}
            onChange={handleCountryChange}
            placeholder={t.trial.placeholders.country}
            dir={dir}
            lang={lang}
          />
          {errors.country && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.country}</span>}
        </div>
        <CustomSelect
          label={t.trial.fields.age}
          options={sel(t.trial.ageOptions)}
          value={form.age}
          onChange={set('age')}
          placeholder={t.trial.placeholders.age}
          dir={dir}
          lang={lang}
        />
        <div>
          <CustomSelect
            label={`${t.trial.fields.course} *`}
            options={sel(t.trial.courseOptions)}
            value={form.course}
            onChange={v => { set('course')(v); setErrors(e => ({ ...e, course: '' })) }}
            placeholder={t.trial.placeholders.course}
            dir={dir}
            lang={lang}
          />
          {errors.course && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.course}</span>}
        </div>
        <CustomSelect
          label={t.trial.fields.tutor}
          options={sel(t.trial.tutorOptions)}
          value={form.tutor}
          onChange={set('tutor')}
          placeholder={t.trial.placeholders.tutor}
          dir={dir}
          lang={lang}
        />
        <CustomSelect
          label={t.trial.fields.time}
          options={sel(t.trial.timeOptions)}
          value={form.time}
          onChange={set('time')}
          placeholder={t.trial.placeholders.time}
          dir={dir}
          lang={lang}
        />
      </div>
      <div style={{ marginTop: 'var(--space-6)' }}>
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary"
          style={{ width: '100%', justifyContent: 'center', padding: 'var(--space-4)', fontSize: 'var(--text-base)', fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
        >
          {isSubmitting ? t.trial.submitting : t.trial.cta}
        </button>
      </div>
    </form>
  )

  /* ── Mobile 2-step form ── */
  const mobileForm = (
    <div>
      {/* Progress indicator */}
      <div style={{ marginBottom: 'var(--space-5)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
          <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', fontWeight: 600, color: 'var(--color-primary)' }}>
            {t.trial.step} {mobileStep} {t.trial.of} 2
          </span>
          <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
            {mobileStep === 1 ? t.trial.step1Title : t.trial.step2Title}
          </span>
        </div>
        {/* Progress bar */}
        <div style={{ height: '4px', background: 'var(--color-border-light)', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: mobileStep === 1 ? '50%' : '100%', background: 'var(--color-primary)', borderRadius: 'var(--radius-full)', transition: 'width 0.35s ease' }} />
        </div>
      </div>

      {/* Step 1 */}
      {mobileStep === 1 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <div>
            <CustomInput
              label={`${t.trial.fields.name} *`}
              placeholder={t.trial.placeholders.name}
              value={form.name}
              onChange={v => { set('name')(v); setErrors(e => ({ ...e, name: '' })) }}
              dir={dir}
              lang={lang}
            />
            {errors.name && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.name}</span>}
          </div>
          <div>
            <WhatsAppPhoneInput
              label={`${t.trial.fields.whatsapp} *`}
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              phone={form.whatsapp}
              onPhoneChange={v => { set('whatsapp')(v); setErrors(e => ({ ...e, whatsapp: '' })) }}
              placeholder={t.trial.placeholders.whatsapp}
              lang={lang}
            />
            {errors.whatsapp && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.whatsapp}</span>}
          </div>
          <div>
            <CustomSelect
              label={`${t.trial.fields.country} *`}
              options={countryOptions}
              value={form.country}
              onChange={handleCountryChange}
              placeholder={t.trial.placeholders.country}
              dir={dir}
              lang={lang}
            />
            {errors.country && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.country}</span>}
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={handleNextStep}
            style={{ width: '100%', justifyContent: 'center', fontSize: 'var(--text-sm)', padding: 'var(--space-2) var(--space-4)', fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', marginTop: 'var(--space-2)' }}
          >
            {t.trial.next} <ArrowRight size={14} style={{ transform: dir === 'rtl' ? 'scaleX(-1)' : 'none' }} />
          </button>
        </div>
      )}

      {/* Step 2 */}
      {mobileStep === 2 && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <CustomInput
            label={t.trial.fields.email}
            placeholder={t.trial.placeholders.email}
            value={form.email}
            onChange={set('email')}
            type="email"
            dir="ltr"
            lang={lang}
          />
          <CustomSelect
            label={t.trial.fields.age}
            options={sel(t.trial.ageOptions)}
            value={form.age}
            onChange={set('age')}
            placeholder={t.trial.placeholders.age}
            dir={dir}
            lang={lang}
          />
          <div>
            <CustomSelect
              label={`${t.trial.fields.course} *`}
              options={sel(t.trial.courseOptions)}
              value={form.course}
              onChange={v => { set('course')(v); setErrors(e => ({ ...e, course: '' })) }}
              placeholder={t.trial.placeholders.course}
              dir={dir}
              lang={lang}
            />
            {errors.course && <span style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: '11px', color: '#dc2626' }}>{errors.course}</span>}
          </div>
          <CustomSelect
            label={t.trial.fields.tutor}
            options={sel(t.trial.tutorOptions)}
            value={form.tutor}
            onChange={set('tutor')}
            placeholder={t.trial.placeholders.tutor}
            dir={dir}
            lang={lang}
          />
          <CustomSelect
            label={t.trial.fields.time}
            options={sel(t.trial.timeOptions)}
            value={form.time}
            onChange={set('time')}
            placeholder={t.trial.placeholders.time}
            dir={dir}
            lang={lang}
          />
          <div style={{ display: 'flex', gap: 'var(--space-2)', marginTop: 'var(--space-2)' }}>
            <button
              type="button"
              onClick={() => setMobileStep(1)}
              style={{ flex: '0 0 auto', padding: '6px 14px', borderRadius: 'var(--radius-full)', border: '1px solid var(--color-border)', background: 'transparent', fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', cursor: 'pointer', color: 'var(--color-text-secondary)', whiteSpace: 'nowrap' }}
            >
              {t.trial.back}
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', fontSize: 'var(--text-sm)', padding: '6px var(--space-3)', fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.7 : 1 }}
            >
              {isSubmitting ? t.trial.submitting : t.trial.cta}
            </button>
          </div>
        </form>
      )}
    </div>
  )

  return (
    <section
      id="trial"
      style={{ background: 'var(--color-bg-section-alt)', padding: 'var(--space-20) 0' }}
      dir={dir}
    >
      <div className="section-container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 'var(--space-12)' }}>
          <h2
            className="section-heading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', marginBottom: 'var(--space-3)' }}
          >
            {t.trial.heading}
          </h2>
          <p
            className="section-subheading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', margin: '0 auto' }}
          >
            {t.trial.sub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 380px',
            gap: 'var(--space-8)',
            alignItems: 'start',
          }}
          className="trial-grid"
        >
          {/* Form card */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              padding: isMobile ? 'var(--space-6)' : 'var(--space-10)',
              boxShadow: 'var(--shadow-lg)',
              border: '1px solid var(--color-border-light)',
            }}
          >
            {submitted
              ? successCard
              : isMobile
                ? mobileForm
                : desktopForm
            }
          </div>

          {/* Promo card — hidden on mobile */}
          <div
            className="trial-promo"
            style={{
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-8)',
              color: 'white',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-6)',
              boxShadow: 'var(--shadow-xl)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '140px', height: '140px', borderRadius: '50%', border: '2px solid rgba(201,168,76,0.3)' }} />
            <div style={{ position: 'absolute', bottom: '-30px', left: '-30px', width: '100px', height: '100px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.1)' }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', gap: '2px', marginBottom: 'var(--space-4)' }}>
                {[...Array(5)].map((_, i) => <Star key={i} size={16} color="#c9a84c" fill="#c9a84c" />)}
              </div>
              <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-display)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, marginBottom: 'var(--space-2)' }}>
                {t.trial.promoTitle}
              </div>
              <p style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-base)', opacity: 0.85, lineHeight: 1.6 }}>
                {t.trial.promoSub}
              </p>
            </div>

            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
              {t.trial.benefits.map(item => (
                <div key={item} style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', opacity: 0.9 }}>{item}</div>
              ))}
            </div>

            <div style={{ position: 'relative', zIndex: 1, borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 'var(--space-5)' }}>
              <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', opacity: 0.7, marginBottom: 'var(--space-1)' }}>{t.trial.questions}</div>
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: '#c9a84c', textDecoration: 'none' }}>
                WhatsApp →
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop */
        .trial-grid { grid-template-columns: 1fr 380px; }
        @media (max-width: 900px) and (min-width: 768px) {
          .trial-grid { grid-template-columns: 1fr !important; }
          .trial-promo { display: none !important; }
        }
        /* Mobile */
        @media (max-width: 767px) {
          .trial-grid { grid-template-columns: 1fr !important; }
          .trial-promo { display: none !important; }
        }
        /* Desktop 2-col form */
        .form-grid { grid-template-columns: 1fr 1fr; }
        @media (max-width: 600px) {
          .form-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

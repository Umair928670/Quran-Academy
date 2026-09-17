import { useIntersection } from '../hooks/useIntersection'
import { useLanguage } from '../context/LanguageContext'
import { Wifi, Clock, Globe } from 'lucide-react'

/* Geographic coordinates mapped to a 1000×500 equirectangular projection:
   x = (lon + 180) / 360 * 1000
   y = (90 - lat) / 180 * 500                                               */
const PIN_LOCATIONS = [
  { name: 'Pakistan',   x: 636, y: 187, delay: 0 },
  { name: 'UK',         x: 467, y: 107, delay: 0.15 },
  { name: 'USA',        x: 198, y: 170, delay: 0.3 },
  { name: 'Canada',     x: 195, y: 115, delay: 0.45 },
  { name: 'UAE',        x: 611, y: 213, delay: 0.6 },
  { name: 'Australia',  x: 807, y: 370, delay: 0.75 },
  { name: 'Germany',    x: 494, y: 113, delay: 0.9 },
  { name: 'Worldwide',  x: 500, y: 260, delay: 1.05 },
]

/* Simplified world land path — a condensed but recognisable world silhouette */
const WORLD_PATH = `
M 44 145 L 48 138 L 55 135 L 62 130 L 70 128 L 78 130 L 85 135 L 90 140
L 92 150 L 90 160 L 85 167 L 78 170 L 70 168 L 62 163 L 55 158 L 48 152 Z
M 110 125 L 118 118 L 128 115 L 138 118 L 145 125 L 148 135 L 145 145
L 138 150 L 128 152 L 118 148 L 110 140 L 108 132 Z
M 155 160 L 162 152 L 172 148 L 182 150 L 190 158 L 193 168 L 190 178
L 182 184 L 172 185 L 162 180 L 156 172 Z
M 175 100 L 205 88 L 240 82 L 280 84 L 310 92 L 330 105 L 335 120
L 330 135 L 315 145 L 295 150 L 270 148 L 245 140 L 220 130 L 200 118
L 185 112 Z
M 200 155 L 210 148 L 225 145 L 240 148 L 250 158 L 252 170 L 248 182
L 238 190 L 224 192 L 210 188 L 202 178 L 200 166 Z
M 210 200 L 220 194 L 232 192 L 242 198 L 246 210 L 242 222 L 230 228
L 218 224 L 212 214 Z
M 455 88 L 462 82 L 472 80 L 480 84 L 484 92 L 480 100 L 472 104
L 462 102 L 456 96 Z
M 460 105 L 468 100 L 478 100 L 486 106 L 490 115 L 486 124 L 476 128
L 466 125 L 460 118 Z
M 450 130 L 458 125 L 468 125 L 476 131 L 478 140 L 474 150 L 464 154
L 454 150 L 450 142 Z
M 465 155 L 475 152 L 485 155 L 490 164 L 487 174 L 477 178 L 467 175
L 462 166 Z
M 505 95 L 515 90 L 528 88 L 540 92 L 548 102 L 546 114 L 538 120
L 526 122 L 514 118 L 506 110 Z
M 540 125 L 552 118 L 568 116 L 582 122 L 590 134 L 588 148 L 578 156
L 562 158 L 548 152 L 540 140 Z
M 560 155 L 572 150 L 584 152 L 592 162 L 590 174 L 580 180 L 568 178
L 560 170 Z
M 580 110 L 595 104 L 612 102 L 628 108 L 638 120 L 636 134 L 624 142
L 608 144 L 594 138 L 582 126 Z
M 600 145 L 614 140 L 628 142 L 636 154 L 632 168 L 618 174 L 606 170
L 598 158 Z
M 630 90 L 648 85 L 668 84 L 688 90 L 702 104 L 700 120 L 688 130
L 668 132 L 650 126 L 636 114 Z
M 680 110 L 698 105 L 718 108 L 730 122 L 726 138 L 712 145 L 698 142
L 684 132 Z
M 700 150 L 715 145 L 728 150 L 732 162 L 726 174 L 712 178 L 700 172 Z
M 720 85 L 738 80 L 758 82 L 770 94 L 766 108 L 752 114 L 736 110
L 722 100 Z
M 760 95 L 778 90 L 796 94 L 804 108 L 800 122 L 784 128 L 768 122
L 758 110 Z
M 792 100 L 808 96 L 822 100 L 828 114 L 822 128 L 806 132 L 792 126
L 786 114 Z
M 820 115 L 836 110 L 850 116 L 854 130 L 848 144 L 832 148 L 818 142
L 814 128 Z
M 810 350 L 825 340 L 845 338 L 862 346 L 870 360 L 865 376 L 848 384
L 828 382 L 814 370 Z
M 845 375 L 862 370 L 880 376 L 886 390 L 880 404 L 862 408 L 848 400
L 840 388 Z
M 870 340 L 885 335 L 898 340 L 902 355 L 895 368 L 880 372 L 868 364 Z
`

export default function GlobalLearning() {
  const { t, lang, dir } = useLanguage()
  const { ref, visible } = useIntersection()

  return (
    <section
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
            {t.global.heading}
          </h2>
          <p
            className="section-subheading"
            style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', margin: '0 auto' }}
          >
            {t.global.sub}
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 300px',
            gap: 'var(--space-10)',
            alignItems: 'center',
          }}
          className="global-grid"
        >
          {/* Real world map */}
          <div
            style={{
              background: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 0,
              boxShadow: 'var(--shadow-md)',
              border: '1px solid var(--color-border-light)',
              overflow: 'hidden',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.7s ease',
            }}
          >
            <svg
              viewBox="0 0 1000 500"
              style={{ width: '100%', height: 'auto', display: 'block' }}
              role="img"
              aria-label="World map showing Taleem ul Quran student locations"
            >
              {/* Ocean background */}
              <rect width="1000" height="500" fill="var(--color-bg-section-alt)" rx="12" />

              {/* Subtle latitude/longitude grid */}
              {[100, 200, 300, 400].map(y => (
                <line key={`lat-${y}`} x1="0" y1={y} x2="1000" y2={y}
                  stroke="var(--color-border-light)" strokeWidth="0.5" />
              ))}
              {[200, 400, 600, 800].map(x => (
                <line key={`lon-${x}`} x1={x} y1="0" x2={x} y2="500"
                  stroke="var(--color-border-light)" strokeWidth="0.5" />
              ))}

              {/* Equator */}
              <line x1="0" y1="250" x2="1000" y2="250"
                stroke="var(--color-accent)" strokeWidth="0.7" strokeDasharray="8 6" opacity="0.35" />

              {/* --- NORTH AMERICA --- */}
              {/* Greenland */}
              <ellipse cx="350" cy="68" rx="42" ry="32" fill="var(--color-border)" opacity="0.55" />
              {/* Canada + USA main body */}
              <path d="M138 80 L182 72 L240 68 L295 72 L340 80 L355 98 L355 125
                       L340 145 L320 162 L300 175 L278 190 L255 200 L235 210
                       L220 225 L208 245 L195 258 L180 262 L166 258 L155 248
                       L145 235 L138 220 L132 200 L128 178 L128 155 L132 130 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Florida peninsula */}
              <path d="M228 242 L235 258 L230 278 L220 288 L212 278 L215 260 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Alaska */}
              <path d="M62 92 L90 82 L118 80 L130 92 L128 110 L110 120 L88 122 L68 112 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Mexico + Central America */}
              <path d="M166 258 L178 268 L186 285 L180 310 L168 325 L155 315 L148 298 L152 278 L160 265 Z"
                fill="var(--color-border)" opacity="0.55" />

              {/* --- SOUTH AMERICA --- */}
              <path d="M198 290 L220 280 L244 285 L262 300 L272 320 L268 345
                       L255 370 L240 400 L222 425 L205 430 L192 420 L182 398
                       L178 370 L180 345 L185 318 L192 300 Z"
                fill="var(--color-border)" opacity="0.55" />

              {/* --- EUROPE --- */}
              {/* Iberian Peninsula */}
              <path d="M432 138 L450 130 L468 132 L478 145 L472 162 L455 168 L438 162 L430 150 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* France/UK/Germany main body */}
              <path d="M445 95 L465 85 L492 82 L518 86 L538 98 L542 115
                       L532 132 L510 140 L488 142 L466 136 L450 125 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* UK island */}
              <path d="M452 88 L462 82 L474 84 L480 95 L474 106 L462 108 L452 102 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Scandinavia */}
              <path d="M482 60 L498 50 L515 52 L528 65 L522 85 L508 90 L494 85 L482 73 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Italy */}
              <path d="M488 148 L500 142 L512 148 L516 162 L508 178 L496 188 L485 180 L482 165 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Eastern Europe */}
              <path d="M520 90 L555 84 L582 88 L598 102 L592 120 L572 130 L548 128 L526 118 L515 105 Z"
                fill="var(--color-border)" opacity="0.55" />

              {/* --- AFRICA --- */}
              <path d="M448 178 L472 170 L498 168 L528 172 L555 180 L572 200
                       L578 225 L572 255 L558 280 L540 310 L518 338 L498 355
                       L478 360 L458 352 L442 330 L430 305 L425 278 L428 252
                       L435 225 L442 200 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Madagascar */}
              <ellipse cx="582" cy="340" rx="14" ry="28" fill="var(--color-border)" opacity="0.55" />

              {/* --- MIDDLE EAST --- */}
              <path d="M558 165 L585 155 L615 158 L635 172 L640 192 L628 210
                       L608 218 L588 215 L568 202 L555 185 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Arabian Peninsula */}
              <path d="M580 210 L605 205 L632 210 L648 228 L645 255 L628 270
                       L608 268 L590 252 L578 232 Z"
                fill="var(--color-border)" opacity="0.55" />

              {/* --- SOUTH ASIA (incl Pakistan/India) --- */}
              <path d="M605 155 L640 148 L672 152 L695 168 L700 192 L688 215
                       L668 228 L648 230 L628 220 L612 205 L600 185 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* India peninsula */}
              <path d="M648 230 L668 228 L682 242 L678 268 L660 282 L645 278 L636 262 L638 245 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Sri Lanka */}
              <ellipse cx="668" cy="292" rx="7" ry="10" fill="var(--color-border)" opacity="0.55" />

              {/* --- CENTRAL/EAST ASIA --- */}
              <path d="M680 95 L725 82 L775 78 L820 84 L858 102 L872 125
                       L862 148 L838 162 L808 168 L778 165 L748 155 L720 140
                       L698 122 L685 108 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* Korean peninsula + Japan */}
              <ellipse cx="845" cy="152" rx="12" ry="22" fill="var(--color-border)" opacity="0.55" />
              <ellipse cx="870" cy="140" rx="8" ry="28" fill="var(--color-border)" opacity="0.55" />
              {/* SE Asia */}
              <path d="M745 212 L768 205 L790 210 L800 228 L788 248 L768 252
                       L748 240 L740 225 Z"
                fill="var(--color-border)" opacity="0.55" />

              {/* --- RUSSIA --- */}
              <path d="M540 58 L605 42 L680 38 L750 42 L810 52 L855 68 L872 88
                       L860 108 L828 118 L790 112 L750 105 L710 100 L665 95
                       L620 88 L580 80 L545 75 Z"
                fill="var(--color-border)" opacity="0.45" />

              {/* --- AUSTRALIA --- */}
              <path d="M760 335 L798 322 L840 320 L875 332 L898 355 L900 385
                       L882 408 L852 418 L818 415 L788 400 L768 378 L756 355 Z"
                fill="var(--color-border)" opacity="0.55" />
              {/* New Zealand */}
              <ellipse cx="925" cy="400" rx="10" ry="18" fill="var(--color-border)" opacity="0.55" />

              {/* --- ANIMATED PINS --- */}
              {PIN_LOCATIONS.map(({ name, x, y, delay }) => (
                <g key={name}>
                  {/* Outer pulse ring */}
                  <circle cx={x} cy={y} r="12" fill="none"
                    stroke="var(--color-accent)" strokeWidth="1.5" opacity="0.3"
                    style={{
                      transformOrigin: `${x}px ${y}px`,
                      animation: visible ? `pulse 2.5s ease ${delay}s infinite` : 'none',
                    }}
                  />
                  {/* Inner dot */}
                  <circle cx={x} cy={y} r="5" fill="var(--color-primary)"
                    opacity={visible ? 1 : 0}
                    style={{ transition: `opacity 0.4s ease ${delay + 0.3}s` }}
                  />
                  {/* White centre */}
                  <circle cx={x} cy={y} r="2" fill="white"
                    opacity={visible ? 1 : 0}
                    style={{ transition: `opacity 0.4s ease ${delay + 0.3}s` }}
                  />
                  {/* Label with background pill */}
                  <g opacity={visible ? 1 : 0}
                    style={{ transition: `opacity 0.4s ease ${delay + 0.5}s` }}>
                    <rect
                      x={name === 'Worldwide' ? x - 34 : x - (name.length * 3.8)}
                      y={y - 22}
                      width={name === 'Worldwide' ? 68 : name.length * 7.6}
                      height={15}
                      rx="7"
                      fill="var(--color-primary)"
                      opacity="0.88"
                    />
                    <text
                      x={x}
                      y={y - 12}
                      textAnchor="middle"
                      fontSize="8"
                      fontWeight="600"
                      fill="white"
                      fontFamily="var(--font-body)"
                    >
                      {name}
                    </text>
                  </g>
                </g>
              ))}

              {/* Legend */}
              <g transform="translate(16, 470)">
                <circle cx="6" cy="6" r="5" fill="var(--color-primary)" />
                <circle cx="6" cy="6" r="2" fill="white" />
                <text x="16" y="10" fontSize="9" fill="var(--color-text-secondary)"
                  fontFamily={lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)'}>
                  {t.global.studentLocations}
                </text>
              </g>
            </svg>
          </div>

          {/* Feature cards */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              opacity: visible ? 1 : 0,
              transform: visible ? 'translateX(0)' : 'translateX(24px)',
              transition: 'opacity 0.6s ease 0.2s, transform 0.6s ease 0.2s',
            }}
          >
            {[
              { icon: Globe, h: t.global.card1h, s: t.global.card1s },
              { icon: Wifi, h: t.global.card2h, s: t.global.card2s },
              { icon: Clock, h: t.global.card3h, s: t.global.card3s },
            ].map(({ icon: Icon, h, s }) => (
              <div
                key={h}
                style={{
                  background: 'var(--color-bg-card)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-5)',
                  border: '1px solid var(--color-border-light)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  gap: 'var(--space-4)',
                  alignItems: 'flex-start',
                }}
              >
                <div style={{ width: '40px', height: '40px', borderRadius: 'var(--radius-md)', background: 'var(--color-primary-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-primary)', flexShrink: 0 }}>
                  <Icon size={18} />
                </div>
                <div>
                  <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginBottom: 'var(--space-1)' }}>
                    {h}
                  </div>
                  <div style={{ fontFamily: lang === 'ur' ? 'var(--font-urdu)' : 'var(--font-body)', fontSize: 'var(--text-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                    {s}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .global-grid { grid-template-columns: 1fr 300px; }
        @media (max-width: 900px) { .global-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  )
}

import { ArrowUpRight } from 'lucide-react'

/* -------------------------------------------------------------------------- */
/* Project art                                                                */
/* -------------------------------------------------------------------------- */

function VpnArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_110%_at_78%_12%,#123a63_0%,#081a2e_44%,#050b12_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <pattern id="vpnGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M40 0H0v40" stroke="rgba(140,190,255,0.07)" />
          </pattern>
          <radialGradient id="vpnGlow">
            <stop offset="0%" stopColor="#5aa9ff" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#5aa9ff" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="vpnShield" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#a8ccff" />
            <stop offset="100%" stopColor="#78f0cd" />
          </linearGradient>
        </defs>

        <rect width="800" height="520" fill="url(#vpnGrid)" opacity="0.8" />
        <circle cx="590" cy="250" r="250" fill="url(#vpnGlow)" />
        <g stroke="rgba(120,190,255,0.16)">
          <circle cx="590" cy="250" r="188" strokeDasharray="2 9" />
          <circle cx="590" cy="250" r="142" strokeDasharray="1 7" />
          <circle cx="590" cy="250" r="98" />
        </g>
        <g fill="#78f0cd">
          <circle cx="590" cy="62" r="3" />
          <circle cx="754" cy="286" r="2.5" opacity="0.65" />
          <circle cx="438" cy="176" r="2" opacity="0.5" />
        </g>

        {/* App panel */}
        <g>
          <rect x="56" y="56" width="318" height="408" rx="22" fill="rgba(5,13,24,0.86)" stroke="rgba(255,255,255,0.12)" />
          <rect x="56" y="56" width="318" height="44" rx="22" fill="rgba(255,255,255,0.03)" />
          <circle cx="82" cy="78" r="4" fill="#5aa9ff" />
          <text x="96" y="82" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="2">
            SAFE NET VPN
          </text>
          <circle cx="344" cy="78" r="3.5" fill="#78f0cd" />
          <circle cx="334" cy="78" r="3.5" fill="rgba(255,255,255,0.2)" />

          <text x="82" y="140" fill="rgba(255,255,255,0.42)" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="2">
            STATUS
          </text>
          <text x="82" y="172" fill="#f2f6fd" fontFamily="var(--font-sans)" fontSize="23" fontWeight="500">
            You&apos;re protected
          </text>
          <text x="82" y="192" fill="rgba(120,240,205,0.75)" fontFamily="var(--font-mono)" fontSize="8.5" letterSpacing="1.4">
            SINGAPORE · 18 MS
          </text>

          <rect x="296" y="140" width="48" height="26" rx="13" fill="rgba(120,240,205,0.14)" stroke="rgba(120,240,205,0.4)" />
          <circle cx="331" cy="153" r="9" fill="#78f0cd" />

          <path d="M82 220h292" stroke="rgba(255,255,255,0.1)" />
          {[
            ['Singapore', '18 ms'],
            ['Frankfurt', '42 ms'],
            ['New York', '96 ms'],
          ].map(([city, ping], i) => (
            <g key={city}>
              <circle cx="88" cy={252 + i * 42} r="3" fill={i === 0 ? '#78f0cd' : 'rgba(255,255,255,0.25)'} />
              <text x="102" y={256 + i * 42} fill={i === 0 ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)'} fontFamily="var(--font-sans)" fontSize="11">
                {city}
              </text>
              <text x="350" y={256 + i * 42} textAnchor="end" fill={i === 0 ? '#78f0cd' : 'rgba(255,255,255,0.3)'} fontFamily="var(--font-mono)" fontSize="8">
                {ping}
              </text>
            </g>
          ))}

          <rect x="82" y="384" width="92" height="26" rx="13" fill="rgba(90,169,255,0.08)" stroke="rgba(90,169,255,0.28)" />
          <text x="128" y="401" textAnchor="middle" fill="rgba(168,204,255,0.9)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.4">
            AES-256
          </text>
          <text x="82" y="438" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1.2">
            AES-256 ENCRYPTION
          </text>
        </g>

        {/* Shield */}
        <g>
          <path
            d="M590 138l78 31v82c0 60-46 100-78 117-32-17-78-57-78-117v-82z"
            fill="rgba(90,169,255,0.06)"
            stroke="url(#vpnShield)"
            strokeWidth="1.6"
          />
          <path d="M558 252l22 22 44-46" stroke="#78f0cd" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="590" cy="108" r="3" fill="#78f0cd" />
        </g>

        <text x="590" y="430" textAnchor="middle" fill="rgba(255,255,255,0.32)" fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="2.4">
          SECURE TUNNEL / ACTIVE
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#050b12] via-transparent to-transparent" />
    </div>
  )
}

function JewelleryArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_80%_0%,#143c31_0%,#0a1e1a_45%,#060b0a_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="jwlGlow">
            <stop offset="0%" stopColor="#e8c78f" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#e8c78f" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="jwlGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f6e3bd" />
            <stop offset="100%" stopColor="#c99d5b" />
          </linearGradient>
        </defs>

        <circle cx="590" cy="190" r="250" fill="url(#jwlGlow)" />
        <g stroke="rgba(232,199,143,0.1)">
          <path d="M0 120h800M0 260h800M0 400h800" />
          <path d="M160 0v520M400 0v520M640 0v520" />
        </g>

        {/* Faceted stone */}
        <g stroke="url(#jwlGold)" strokeWidth="1" strokeLinejoin="round">
          <polygon points="590,64 676,118 646,214 534,214 504,118" fill="rgba(232,199,143,0.05)" />
          <polygon points="590,64 620,118 590,156 560,118" fill="rgba(255,255,255,0.06)" />
          <path d="M590 64 620 118 646 214 590 280 534 214 560 118Z" />
          <path d="M560 118h60M534 214h112M590 156l56 58M590 156l-56 58M590 156v124" opacity="0.55" />
          <path d="M590 280l-20 18 20 30 20-30Z" fill="rgba(232,199,143,0.12)" />
        </g>
        <circle cx="590" cy="156" r="2.5" fill="#f6e3bd" />
        <text x="590" y="368" textAnchor="middle" fill="rgba(232,199,143,0.55)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2.2">
          COLLECTION / 01
        </text>

        {/* Lifecycle rail */}
        <g>
          <path d="M96 84v336" stroke="rgba(232,199,143,0.22)" />
          {[
            ['DESIGN', 'Approved'],
            ['CASTING', 'In progress'],
            ['SETTING', 'Queued'],
            ['QUALITY', '—'],
          ].map(([stage, status], i) => (
            <g key={stage}>
              <circle cx="96" cy={96 + i * 92} r="5" fill={i < 2 ? '#e8c78f' : '#0a1e1a'} stroke="rgba(232,199,143,0.6)" />
              <text x="118" y={100 + i * 92} fill={i < 2 ? 'rgba(255,255,255,0.88)' : 'rgba(255,255,255,0.35)'} fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.8">
                {stage}
              </text>
              <text x="118" y={116 + i * 92} fill={i === 0 ? '#78f0cd' : 'rgba(255,255,255,0.28)'} fontFamily="var(--font-sans)" fontSize="8.5">
                {status}
              </text>
            </g>
          ))}
        </g>

        {/* BOM card */}
        <g>
          <rect x="300" y="336" width="230" height="132" rx="14" fill="rgba(5,12,10,0.82)" stroke="rgba(232,199,143,0.22)" />
          <text x="320" y="360" fill="rgba(232,199,143,0.6)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.8">
            BILL OF MATERIALS
          </text>
          {[
            ['Metal', '18K'],
            ['Accent stones', '18'],
            ['Centre stone', '2.4 ct'],
          ].map(([item, qty], i) => (
            <g key={item}>
              <text x="320" y={386 + i * 24} fill="rgba(255,255,255,0.58)" fontFamily="var(--font-sans)" fontSize="9">
                {item}
              </text>
              <text x="510" y={386 + i * 24} textAnchor="end" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-mono)" fontSize="7.5">
                {qty}
              </text>
              {i < 2 && <path d={`M320 ${394 + i * 24}h190`} stroke="rgba(255,255,255,0.06)" />}
            </g>
          ))}
        </g>

        <text x="56" y="52" fill="rgba(232,199,143,0.6)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2">
          ATELIER / PRODUCT LIFECYCLE
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#060b0a] via-transparent to-transparent" />
    </div>
  )
}

function WhiskyArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_65%_10%,#3d2410_0%,#1d120a_46%,#090604_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="whiskyGlow">
            <stop offset="0%" stopColor="#e0a35c" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#e0a35c" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="whiskyGlass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d99a4e" stopOpacity="0.8" />
            <stop offset="55%" stopColor="#8d5522" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#3a2110" stopOpacity="0.85" />
          </linearGradient>
          <linearGradient id="whiskyBeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f2c98c" stopOpacity="0.24" />
            <stop offset="100%" stopColor="#f2c98c" stopOpacity="0" />
          </linearGradient>
        </defs>

        <circle cx="590" cy="240" r="260" fill="url(#whiskyGlow)" />
        <path d="M380 0h180L470 520H360Z" fill="url(#whiskyBeam)" />

        {/* Gallery arches */}
        {[100, 210, 320].map((x) => (
          <g key={x} stroke="rgba(224,163,92,0.2)">
            <path d={`M${x} 470V250a55 55 0 0 1 110 0v220`} />
            <path d={`M${x + 12} 470V254a43 43 0 0 1 86 0v216`} opacity="0.5" />
          </g>
        ))}

        {/* Bottle */}
        <g>
          <path
            d="M600 120h48v44c0 14 8 24 18 34 16 16 24 38 24 62v142c0 14-11 25-25 25h-82c-14 0-25-11-25-25V260c0-24 8-46 24-62 10-10 18-20 18-34z"
            fill="url(#whiskyGlass)"
            stroke="rgba(242,201,140,0.5)"
          />
          <rect x="600" y="112" width="48" height="12" rx="3" fill="#e0a35c" opacity="0.7" />
          <rect x="575" y="300" width="122" height="108" rx="4" fill="rgba(14,8,4,0.82)" stroke="rgba(242,201,140,0.48)" />
          <text x="636" y="332" textAnchor="middle" fill="#f2c98c" fontFamily="var(--font-serif)" fontSize="15" letterSpacing="1">
            GRANDE
          </text>
          <text x="636" y="348" textAnchor="middle" fill="rgba(242,201,140,0.6)" fontFamily="var(--font-mono)" fontSize="5.5" letterSpacing="1.6">
            WHISKY MUSEUM
          </text>
          <path d="M590 366h92" stroke="rgba(242,201,140,0.3)" />
          <text x="636" y="384" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-mono)" fontSize="5.5" letterSpacing="1.4">
            SINGLE MALT · RESERVE
          </text>
        </g>

        {/* Portal panel */}
        <g>
          <rect x="60" y="76" width="270" height="330" rx="18" fill="rgba(12,8,5,0.78)" stroke="rgba(224,163,92,0.24)" />
          <text x="84" y="106" fill="rgba(255,255,255,0.72)" fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.6">
            GRANDE / VISIT
          </text>
          <path d="M84 122h222" stroke="rgba(255,255,255,0.1)" />
          <text x="84" y="178" fill="#f2c98c" fontFamily="var(--font-serif)" fontSize="28">
            The collection
          </text>
          <text x="84" y="202" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-sans)" fontSize="9.5">
            Exhibitions, tastings
          </text>
          <text x="84" y="217" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-sans)" fontSize="9.5">
            and the archive.
          </text>
          <rect x="84" y="244" width="104" height="30" rx="15" fill="rgba(224,163,92,0.14)" stroke="rgba(224,163,92,0.5)" />
          <text x="136" y="263" textAnchor="middle" fill="#f2c98c" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.4">
            BOOK A TOUR
          </text>
          {[
            ['Collection', '01'],
            ['Visit', '02'],
            ['Archive', '03'],
          ].map(([label, value], i) => (
            <g key={label}>
              <text x="84" y={318 + i * 24} fill="rgba(255,255,255,0.42)" fontFamily="var(--font-sans)" fontSize="9">
                {label}
              </text>
              <text x="306" y={318 + i * 24} textAnchor="end" fill="rgba(242,201,140,0.75)" fontFamily="var(--font-mono)" fontSize="8">
                {value}
              </text>
              {i < 2 && <path d={`M84 ${327 + i * 24}h222`} stroke="rgba(255,255,255,0.06)" />}
            </g>
          ))}
        </g>

        <text x="744" y="492" textAnchor="end" fill="rgba(242,201,140,0.4)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="2">
          MUSEUM / DIGITAL PORTAL
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#090604] via-transparent to-transparent" />
    </div>
  )
}

function AndamanArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_20%_10%,#0a3f40_0%,#062226_46%,#040d10_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="andamanSea" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0c5554" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#062125" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Topographic contours */}
        <g stroke="rgba(98,224,207,0.12)">
          {[110, 150, 190, 230, 270].map((r, i) => (
            <ellipse key={r} cx="590" cy="250" rx={r * 1.25} ry={r} transform="rotate(-18 590 250)" />
          ))}
        </g>

        {/* Islands */}
        <g>
          <path
            d="M500 176c32-26 84-18 104 12 18 28 2 54-18 62-18 8-20 34-44 40-28 7-54-12-56-38-2-20-14-32-8-48 4-12 10-20 22-28Z"
            fill="url(#andamanSea)"
            stroke="rgba(98,224,207,0.45)"
          />
          <path
            d="M640 300c22-14 56-6 66 14 9 19-6 36-22 40-18 4-34-6-42-20-5-10-9-24-2-34Z"
            fill="url(#andamanSea)"
            stroke="rgba(98,224,207,0.35)"
          />
        </g>

        {/* Route */}
        <path
          d="M300 382C372 340 402 262 476 236s104-34 148-76"
          stroke="rgba(98,224,207,0.55)"
          strokeWidth="1.4"
          strokeDasharray="4 7"
        />
        {[
          [300, 382, 'KRABI'],
          [476, 236, 'PHI PHI'],
          [624, 160, 'PHUKET'],
        ].map(([x, y, label], i) => (
          <g key={label as string}>
            <circle cx={Number(x)} cy={Number(y)} r="12" fill="rgba(98,224,207,0.08)" />
            <circle cx={Number(x)} cy={Number(y)} r={i === 1 ? 4 : 3} fill="#62e0cf" />
            <text
              x={Number(x)}
              y={Number(y) + (i === 0 ? 28 : -18)}
              textAnchor="middle"
              fill="rgba(224,255,250,0.7)"
              fontFamily="var(--font-mono)"
              fontSize="7"
              letterSpacing="1.4"
            >
              {label}
            </text>
          </g>
        ))}

        {/* Booking card */}
        <g>
          <rect x="56" y="84" width="234" height="266" rx="18" fill="rgba(4,14,16,0.82)" stroke="rgba(98,224,207,0.28)" />
          <text x="80" y="116" fill="rgba(255,255,255,0.55)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.8">
            BAY OF ANDAMAN
          </text>
          <text x="80" y="166" fill="#f2fffc" fontFamily="var(--font-serif)" fontSize="26">
            Island time,
          </text>
          <text x="80" y="194" fill="#f2fffc" fontFamily="var(--font-serif)" fontSize="26">
            planned well.
          </text>
          <text x="80" y="220" fill="rgba(255,255,255,0.42)" fontFamily="var(--font-sans)" fontSize="9">
            Small-group routes across the
          </text>
          <text x="80" y="234" fill="rgba(255,255,255,0.42)" fontFamily="var(--font-sans)" fontSize="9">
            Andaman coast.
          </text>
          <path d="M80 254h186" stroke="rgba(255,255,255,0.1)" />
          <text x="80" y="280" fill="rgba(98,224,207,0.9)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.4">
            6 DAYS · 5 NIGHTS
          </text>
          <text x="80" y="300" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-sans)" fontSize="9">
            Krabi · Phi Phi · Phuket
          </text>
          <rect x="80" y="314" width="112" height="26" rx="13" fill="rgba(98,224,207,0.12)" stroke="rgba(98,224,207,0.42)" />
          <text x="136" y="331" textAnchor="middle" fill="#9df5e9" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2">
            PLAN THE ROUTE
          </text>
        </g>

        {/* Compass */}
        <g transform="translate(700 428)" stroke="rgba(98,224,207,0.35)">
          <circle r="30" />
          <path d="M0 -22 6 0 0 22 -6 0Z" fill="rgba(98,224,207,0.16)" />
          <text y="-40" textAnchor="middle" fill="rgba(98,224,207,0.6)" fontFamily="var(--font-mono)" fontSize="6" stroke="none">
            N
          </text>
        </g>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#040d10] via-transparent to-transparent" />
    </div>
  )
}

function HospitalArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_82%_8%,#2a2033_0%,#151426_46%,#070a12_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="roseGlow">
            <stop offset="0%" stopColor="#ff9db0" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#ff9db0" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="roseCross" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffc3ce" />
            <stop offset="100%" stopColor="#ff7d97" stopOpacity="0.4" />
          </linearGradient>
        </defs>

        <circle cx="610" cy="230" r="240" fill="url(#roseGlow)" />

        {/* Heartbeat */}
        <path
          d="M-20 390h150l24-52 30 98 28-132 26 86h86l18-40 24 40h404"
          stroke="rgba(255,157,176,0.18)"
          strokeWidth="1.4"
        />

        {/* Cross */}
        <g transform="translate(610 240)" stroke="url(#roseCross)" strokeWidth="1.4">
          <path d="M-36-128h72v92h92v72h-92v92h-72v-92h-92v-72h92Z" fill="rgba(255,157,176,0.045)" />
          <path d="M-36-128h72v92h92v72h-92v92h-72v-92h-92v-72h92Z" transform="scale(0.62)" opacity="0.4" />
        </g>

        {/* Appointment card */}
        <g>
          <rect x="58" y="70" width="316" height="390" rx="20" fill="rgba(8,11,19,0.86)" stroke="rgba(255,255,255,0.12)" />
          <text x="82" y="102" fill="rgba(255,255,255,0.42)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="1.8">
            ROSE HILL / APPOINTMENTS
          </text>
          <text x="82" y="146" fill="#f2f6fd" fontFamily="var(--font-sans)" fontSize="22" fontWeight="500">
            Book a visit
          </text>
          <text x="82" y="166" fill="rgba(255,255,255,0.38)" fontFamily="var(--font-sans)" fontSize="9">
            Choose a department and a time.
          </text>

          <rect x="82" y="186" width="268" height="38" rx="9" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.1)" />
          <circle cx="104" cy="205" r="8" fill="rgba(255,157,176,0.16)" stroke="rgba(255,157,176,0.4)" />
          <text x="122" y="203" fill="rgba(255,255,255,0.72)" fontFamily="var(--font-sans)" fontSize="9">
            Cardiology
          </text>
          <text x="122" y="214" fill="rgba(255,255,255,0.3)" fontFamily="var(--font-sans)" fontSize="7.5">
            Consultant available
          </text>
          <path d="M330 196l5 5 8-9" stroke="#ff9db0" strokeWidth="1.4" strokeLinecap="round" />

          {/* Calendar */}
          <g>
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
              <text key={`${day}-${i}`} x={94 + i * 36} y={258} textAnchor="middle" fill="rgba(255,255,255,0.28)" fontFamily="var(--font-mono)" fontSize="7">
                {day}
              </text>
            ))}
            {Array.from({ length: 21 }).map((_, i) => {
              const day = i + 1
              const active = day === 24
              return (
                <g key={day}>
                  <rect
                    x={80 + (i % 7) * 36}
                    y={272 + Math.floor(i / 7) * 30}
                    width="28"
                    height="24"
                    rx="6"
                    fill={active ? 'rgba(255,157,176,0.16)' : 'transparent'}
                    stroke={active ? 'rgba(255,157,176,0.5)' : 'transparent'}
                  />
                  <text
                    x={94 + (i % 7) * 36}
                    y={288 + Math.floor(i / 7) * 30}
                    textAnchor="middle"
                    fill={active ? '#ffc3ce' : 'rgba(255,255,255,0.4)'}
                    fontFamily="var(--font-mono)"
                    fontSize="7.5"
                  >
                    {day}
                  </text>
                </g>
              )
            })}
          </g>

          <path d="M82 380h268" stroke="rgba(255,255,255,0.08)" />
          <text x="82" y="406" fill="rgba(255,255,255,0.4)" fontFamily="var(--font-sans)" fontSize="8.5">
            Next availability this week
          </text>
          <rect x="82" y="420" width="268" height="24" rx="12" fill="rgba(255,157,176,0.16)" stroke="rgba(255,157,176,0.45)" />
          <text x="216" y="436" textAnchor="middle" fill="#ffd3da" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.4">
            CONFIRM APPOINTMENT
          </text>
        </g>

        <text x="748" y="492" textAnchor="end" fill="rgba(255,157,176,0.35)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="2">
          ROSE HILL HOSPITAL / WEB
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#070a12] via-transparent to-transparent" />
    </div>
  )
}

function SushiArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_75%_10%,#3a110c_0%,#1b0907_46%,#080505_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="sushiGlow">
            <stop offset="0%" stopColor="#ff6a4d" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#ff6a4d" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="sushiSalmon" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ff9b7a" />
            <stop offset="100%" stopColor="#d94f33" />
          </linearGradient>
        </defs>

        <circle cx="600" cy="230" r="250" fill="url(#sushiGlow)" />

        {/* Enso */}
        <circle
          cx="600"
          cy="232"
          r="150"
          stroke="rgba(255,106,77,0.4)"
          strokeWidth="16"
          strokeLinecap="round"
          strokeDasharray="760 190"
          transform="rotate(-118 600 232)"
        />
        <circle
          cx="600"
          cy="232"
          r="150"
          stroke="rgba(255,155,122,0.18)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="720 230"
          transform="rotate(-112 600 232)"
        />

        {/* Sushi */}
        <g>
          <ellipse cx="600" cy="268" rx="62" ry="32" fill="rgba(245,238,225,0.92)" />
          <path d="M540 246c18-26 102-26 120 0 12 18-8 42-60 42s-72-24-60-42Z" fill="url(#sushiSalmon)" />
          <path d="M566 244c12-6 22 4 34 0s22-8 34-2" stroke="rgba(255,255,255,0.42)" strokeWidth="1.6" />
          <ellipse cx="600" cy="300" rx="62" ry="6" fill="rgba(0,0,0,0.3)" />
        </g>

        {/* Chopsticks */}
        <g stroke="rgba(232,212,188,0.55)" strokeWidth="4" strokeLinecap="round">
          <path d="M690 70 556 354" />
          <path d="M710 82 576 366" />
        </g>
        <g stroke="rgba(255,106,77,0.4)" strokeWidth="1">
          <path d="M690 70 556 354" transform="translate(4 0)" opacity="0.4" />
          <path d="M710 82 576 366" transform="translate(4 0)" opacity="0.4" />
        </g>

        {/* Menu panel */}
        <g>
          <rect x="56" y="84" width="278" height="352" rx="18" fill="rgba(12,6,5,0.82)" stroke="rgba(255,106,77,0.25)" />
          <text x="82" y="116" fill="rgba(255,255,255,0.45)" fontFamily="var(--font-mono)" fontSize="7" letterSpacing="2">
            ASAHI / OMAKASE
          </text>
          <text x="82" y="164" fill="#fff4ef" fontFamily="var(--font-serif)" fontSize="30" fontStyle="italic">
            Today&apos;s counter
          </text>
          <path d="M82 182h226" stroke="rgba(255,255,255,0.1)" />
          {[
            ['Chef’s selection', '12 courses'],
            ['Sashimi', '5 cuts'],
            ['Nigiri', '8 pieces'],
            ['Miso & pickles', 'included'],
          ].map(([item, detail], i) => (
            <g key={item}>
              <text x="82" y={214 + i * 40} fill="rgba(255,255,255,0.78)" fontFamily="var(--font-sans)" fontSize="10.5">
                {item}
              </text>
              <text x="82" y={229 + i * 40} fill="rgba(255,255,255,0.32)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2">
                {detail.toUpperCase()}
              </text>
              <text x="308" y={218 + i * 40} textAnchor="end" fill="rgba(255,106,77,0.75)" fontFamily="var(--font-mono)" fontSize="7">
                {String(i + 1).padStart(2, '0')}
              </text>
              {i < 3 && <path d={`M82 ${238 + i * 40}h226`} stroke="rgba(255,255,255,0.06)" />}
            </g>
          ))}
          <rect x="82" y="386" width="108" height="26" rx="13" fill="rgba(255,106,77,0.16)" stroke="rgba(255,106,77,0.5)" />
          <text x="136" y="403" textAnchor="middle" fill="#ffc0ae" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.4">
            RESERVE
          </text>
          <text x="308" y="403" textAnchor="end" fill="rgba(255,255,255,0.28)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2">
            OPEN 17:30
          </text>
        </g>

        <text
          x="748"
          y="170"
          fill="rgba(255,155,122,0.5)"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="3"
          textAnchor="end"
        >
          A S A H I
        </text>
        <text x="748" y="192" fill="rgba(255,255,255,0.25)" fontFamily="var(--font-serif)" fontSize="13" fontStyle="italic" textAnchor="end">
          sushi &amp; counter
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#080505] via-transparent to-transparent" />
    </div>
  )
}

function McpArt() {
  return (
    <div className="project-art absolute inset-0 bg-[radial-gradient(120%_120%_at_70%_8%,#2c2355_0%,#15122c_46%,#07060d_100%)]">
      <svg
        viewBox="0 0 800 520"
        className="absolute inset-0 size-full"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="mcpGlow">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#a78bfa" stopOpacity="0" />
          </radialGradient>
          <pattern id="mcpGrid" width="36" height="36" patternUnits="userSpaceOnUse">
            <path d="M36 0H0v36" stroke="rgba(167,139,250,0.06)" />
          </pattern>
        </defs>

        <rect width="800" height="520" fill="url(#mcpGrid)" />
        <circle cx="590" cy="200" r="230" fill="url(#mcpGlow)" />

        {/* Connections */}
        <g stroke="rgba(167,139,250,0.35)" strokeDasharray="3 6">
          <path d="M590 200 420 120" />
          <path d="M590 200 760 120" />
          <path d="M590 200 420 300" />
          <path d="M590 200 760 300" />
          <path d="M590 200v110" />
        </g>

        {/* Envelopes */}
        {[
          [420, 120],
          [760, 120],
          [420, 300],
          [760, 300],
        ].map(([x, y], i) => (
          <g key={i} transform={`translate(${x} ${y})`}>
            <rect x="-34" y="-24" width="68" height="48" rx="8" fill="rgba(10,8,20,0.9)" stroke="rgba(167,139,250,0.3)" />
            <path d="M-30-16 0 6l30-22" stroke="rgba(167,139,250,0.6)" strokeWidth="1.2" />
            <circle cx="30" cy="-20" r="3" fill="#78f0cd" />
          </g>
        ))}

        {/* Hub */}
        <g>
          <circle cx="590" cy="200" r="58" fill="rgba(9,8,18,0.94)" stroke="rgba(167,139,250,0.45)" />
          <circle cx="590" cy="200" r="58" stroke="rgba(167,139,250,0.16)" strokeWidth="10" />
          <text x="590" y="197" textAnchor="middle" fill="#e7defd" fontFamily="var(--font-mono)" fontSize="14" letterSpacing="2">
            MCP
          </text>
          <text x="590" y="212" textAnchor="middle" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-mono)" fontSize="6" letterSpacing="1.6">
            IMAP
          </text>
        </g>

        {/* Terminal */}
        <g>
          <rect x="56" y="328" width="326" height="150" rx="14" fill="rgba(7,6,14,0.9)" stroke="rgba(167,139,250,0.24)" />
          <circle cx="76" cy="348" r="3" fill="#ff6a4d" />
          <circle cx="88" cy="348" r="3" fill="#f2c98c" />
          <circle cx="100" cy="348" r="3" fill="#78f0cd" />
          <text x="116" y="351" fill="rgba(255,255,255,0.28)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="1.2">
            agent / tools
          </text>
          {[
            ['$ imap.list', 'inbox, archive, sent'],
            ['$ imap.search', 'from:client since:2026'],
            ['$ imap.fetch', 'thread → 12 messages'],
          ].map(([cmd, result], i) => (
            <g key={cmd}>
              <text x="78" y={382 + i * 28} fill="#a78bfa" fontFamily="var(--font-mono)" fontSize="8">
                {cmd}
              </text>
              <text x="78" y={394 + i * 28} fill="rgba(120,240,205,0.5)" fontFamily="var(--font-mono)" fontSize="6.5">
                → {result}
              </text>
            </g>
          ))}
        </g>

        <text x="744" y="492" textAnchor="end" fill="rgba(167,139,250,0.45)" fontFamily="var(--font-mono)" fontSize="6.5" letterSpacing="2">
          OPEN SOURCE / MODEL CONTEXT PROTOCOL
        </text>
      </svg>
      <div className="absolute inset-0 bg-gradient-to-t from-[#07060d] via-transparent to-transparent" />
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* Data                                                                       */
/* -------------------------------------------------------------------------- */

const projects = [
  {
    index: '01',
    name: 'Safe Net VPN',
    category: 'Product',
    year: '2026',
    description:
      'A VPN product designed end to end — onboarding, server selection and connection status in one clear, trustworthy experience.',
    tags: ['Product design', 'Security', 'Mobile'],
    Art: VpnArt,
  },
  {
    index: '02',
    name: 'Jewellery PLM',
    category: 'Retail',
    year: '2026',
    description:
      'A product lifecycle platform for a jewellery house: collections, stones, bills of materials, sampling and production status in one traceable flow.',
    tags: ['PLM', 'Operations'],
    Art: JewelleryArt,
  },
  {
    index: '03',
    name: 'Whisky Museum Portal',
    category: 'Culture',
    year: '2026',
    description:
      'A visitor portal for the museum — exhibitions, tours, tickets and membership — with an editorial system the team can run themselves.',
    tags: ['Web portal', 'CMS'],
    Art: WhiskyArt,
  },
  {
    index: '04',
    name: 'Travel And Tour',
    category: 'Travel',
    year: '2026',
    description:
      'A travel and tour platform for Andaman itineraries: packages, day-by-day plans, availability and enquiries in one considered booking flow.',
    tags: ['Booking', 'Web'],
    Art: AndamanArt,
  },
  {
    index: '05',
    name: 'Hospital Portal',
    category: 'Healthcare',
    year: '2026',
    description:
      'A hospital website that puts departments, consultants and appointments first — clear, accessible and quick on a phone.',
    tags: ['Website', 'Accessibility'],
    Art: HospitalArt,
  },
  {
    index: '06',
    name: 'Restaurant Portal',
    category: 'Hospitality',
    year: '2026',
    description:
      'A restaurant site with a considered menu, reservations and location details — built to load fast and look right on every table.',
    tags: ['Restaurant', 'Web'],
    Art: SushiArt,
  },
  {
    index: '07',
    name: 'IMAP MCP Connector',
    category: 'Developer tooling',
    year: '2026',
    description:
      'An open-source Model Context Protocol connector that lets AI agents search, read and organise IMAP mailboxes with scoped access.',
    tags: ['AI', 'Developer tooling'],
    Art: McpArt,
    openSource: true,
  },
]

/* -------------------------------------------------------------------------- */
/* Section                                                                    */
/* -------------------------------------------------------------------------- */

export function Work() {
  const [featured, ...rest] = projects

  return (
    <section id="work" className="section relative">
      <div className="shell">
        <div className="grid gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-end" data-reveal>
          <div>
            <span className="section-kicker mono text-[0.6rem]">
              <span className="section-index">04</span> Selected work
            </span>
            <h2 className="section-heading mt-6">
              Seven products,
              <br />
              <span className="serif text-gradient">shipped.</span>
            </h2>
          </div>
          <p className="max-w-md text-[0.92rem] leading-[1.85] text-dim md:justify-self-end md:pb-2">
            Our first year of work spans security, jewellery, culture, travel, healthcare,
            hospitality and open source. Different industries, one standard.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4">
          <a
            href="#contact"
            aria-label={`${featured.name} — discuss a similar product with Safe Net`}
            className="project-card group block overflow-hidden rounded-[1.75rem] border border-white/10"
          >
            <div className="grid lg:grid-cols-[0.94fr_1.06fr]">
              <div className="relative z-10 flex flex-col justify-between gap-10 p-7 sm:p-10">
                <div className="flex items-center justify-between gap-4">
                  <span className="project-mono">CASE / {featured.index}</span>
                  <span className="project-pill">{featured.category} · {featured.year}</span>
                </div>

                <div>
                  <h3 className="text-[clamp(2.1rem,4.2vw,3.5rem)] font-medium leading-[0.96] tracking-[-0.055em] text-white">
                    {featured.name}
                  </h3>
                  <p className="mt-5 max-w-md text-[0.9rem] leading-[1.8] text-dim">
                    {featured.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {featured.tags.map((tag) => (
                      <span key={tag} className="project-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
                  <span className="project-mono">Shipped / 2026</span>
                  <span className="flex items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.18em] text-mint">
                    Discuss a build
                    <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>

              <div className="relative min-h-[300px] overflow-hidden border-t border-white/10 sm:min-h-[380px] lg:min-h-[470px] lg:border-l lg:border-t-0">
                <featured.Art />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050b12]/70 via-transparent to-transparent" />
              </div>
            </div>
          </a>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {rest.map((project) => (
              <a
                key={project.name}
                href="#contact"
                aria-label={`${project.name} — discuss a similar project with Safe Net`}
                className="project-card group flex flex-col overflow-hidden rounded-[1.4rem] border border-white/10"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <project.Art />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#070c16] via-transparent to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-[#04060b]/60 px-3 py-1 font-mono text-[0.48rem] uppercase tracking-[0.18em] text-white/55 backdrop-blur">
                    {project.category}
                  </span>
                  <span className="absolute right-4 top-4 font-mono text-[0.48rem] uppercase tracking-[0.18em] text-white/40">
                    {project.openSource ? 'Open source' : project.year}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-center justify-between gap-3">
                    <span className="project-mono">{project.index} / 07</span>
                    <ArrowUpRight className="size-3.5 text-white/25 transition-all duration-500 group-hover:-translate-y-0.5 group-hover:text-mint" />
                  </div>
                  <h3 className="mt-3 text-[1.35rem] font-medium leading-tight tracking-[-0.035em] text-white">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-[0.8rem] leading-[1.7] text-dim">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="project-tag project-tag-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <span className="project-mono">Seven products · Six industries · One standard</span>
          <a href="#contact" className="link-underline mono text-[0.55rem] text-mint/80">
            Full case studies on request →
          </a>
        </div>
      </div>
    </section>
  )
}

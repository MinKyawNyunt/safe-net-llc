const items = [
  'Digital products',
  'Business platforms',
  'AI & automation',
  'Web & mobile',
  'Integrations',
  'Open source',
]

function Row() {
  return (
    <div className="flex shrink-0 items-center">
      {items.map((item, i) => (
        <div key={item} className="flex items-center">
          <span
            className={`px-6 py-5 font-mono text-[0.62rem] uppercase tracking-[0.2em] sm:px-9 ${
              i % 3 === 1 ? 'text-mint/80' : 'text-white/45'
            }`}
          >
            {item}
          </span>
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" className="text-white/20">
            <path d="M5 0v10M0 5h10" stroke="currentColor" />
          </svg>
        </div>
      ))}
    </div>
  )
}

export function Marquee() {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        <Row />
        <Row />
      </div>
    </div>
  )
}

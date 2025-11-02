import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function UploadSection({ onRun, loading, playClick }) {
  const [busFileName, setBusFileName] = useState('No file selected')
  const [lineFileName, setLineFileName] = useState('No file selected')
  const cardsRef = useRef([])
  const buttonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      })
      gsap.from(buttonRef.current, { opacity: 0, y: 16, duration: 0.6, delay: 0.2 })
    })
    return () => ctx.revert()
  }, [])

  const handleBusChange = (e) => {
    const f = e.target.files?.[0]
    setBusFileName(f ? f.name : 'No file selected')
  }

  const handleLineChange = (e) => {
    const f = e.target.files?.[0]
    setLineFileName(f ? f.name : 'No file selected')
  }

  return (
    <section className="relative py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {[{ title: '1. Bus Data', fileName: busFileName, onChange: handleBusChange }, { title: '2. Line Data', fileName: lineFileName, onChange: handleLineChange }].map((card, idx) => (
            <div
              key={card.title}
              ref={(el) => (cardsRef.current[idx] = el)}
              className="rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6"
            >
              <h3
                className="text-xl text-white mb-4 tracking-wide"
                style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
              >
                {card.title}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                <label className="inline-flex w-fit items-center justify-center whitespace-nowrap rounded-md bg-[#FFA500] px-4 py-2 text-sm font-semibold text-black shadow-sm hover:brightness-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#FFA500] focus-visible:ring-offset-black cursor-pointer" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>
                  Upload File
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => {
                      playClick()
                      card.onChange(e)
                    }}
                  />
                </label>
                <p className="text-sm text-gray-400 truncate" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
                  {card.fileName}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center">
          <button
            ref={buttonRef}
            onClick={() => {
              playClick()
              onRun()
            }}
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-[#FFA500] px-6 py-3 text-base font-bold text-black tracking-wide shadow hover:brightness-95 disabled:opacity-60 disabled:cursor-not-allowed"
            style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
          >
            {loading ? 'CALCULATING...' : 'Run Analysis'}
          </button>
        </div>
      </div>
    </section>
  )
}

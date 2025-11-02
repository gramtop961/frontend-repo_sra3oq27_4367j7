import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function ResultsSection({ visible }) {
  const sectionRef = useRef(null)
  const tableRef = useRef(null)
  const lossRef = useRef(null)

  useEffect(() => {
    if (visible) {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo(
        sectionRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 }
      )
      // Stagger any present table rows (will do nothing if none yet)
      const rows = tableRef.current?.querySelectorAll('tbody tr') || []
      if (rows.length) {
        tl.from(
          rows,
          { opacity: 0, y: 10, duration: 0.3, stagger: 0.08 },
          '-=0.2'
        )
      }
      tl.fromTo(
        lossRef.current,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4 },
        '-=0.1'
      )
    }
  }, [visible])

  return (
    <section
      ref={sectionRef}
      className={`transition-opacity duration-300 ${visible ? 'block' : 'hidden'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <h2
          className="text-2xl md:text-3xl text-white mb-6 tracking-wide"
          style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
        >
          Results
        </h2>

        <div className="rounded-xl border border-white/10 bg-white/5 backdrop-blur overflow-hidden" ref={tableRef}>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-white/10">
              <thead className="bg-white/5">
                <tr>
                  {['Bus', 'Voltage (p.u.)', 'Phase Angle (deg)', 'P (MW)', 'Q (MVAR)'].map((h) => (
                    <th
                      key={h}
                      scope="col"
                      className="px-4 py-3 text-left text-xs font-semibold text-gray-300 uppercase tracking-wider"
                      style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {/* Intentionally empty for backend-populated data */}
              </tbody>
            </table>
          </div>
        </div>

        <div
          ref={lossRef}
          className="mt-6 rounded-lg border border-white/10 bg-white/5 backdrop-blur px-4 py-5"
        >
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
            Total Line Losses:
          </p>
          <div className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>
            {/* Empty for backend-populated value */}
          </div>
        </div>
      </div>
    </section>
  )
}

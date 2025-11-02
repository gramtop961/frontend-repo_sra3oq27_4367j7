import { useEffect, useMemo, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import UploadSection from './components/UploadSection'
import ResultsSection from './components/ResultsSection'

function App() {
  const [loading, setLoading] = useState(false)
  const [showResults, setShowResults] = useState(false)

  // Inject Google Fonts (Rajdhani for headings/buttons, Inter for body)
  useEffect(() => {
    const raj = document.createElement('link')
    raj.rel = 'stylesheet'
    raj.href = 'https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&display=swap'
    const inter = document.createElement('link')
    inter.rel = 'stylesheet'
    inter.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap'
    document.head.appendChild(raj)
    document.head.appendChild(inter)
    return () => {
      document.head.removeChild(raj)
      document.head.removeChild(inter)
    }
  }, [])

  // Web Audio API: simple click and success tones
  const audio = useMemo(() => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioCtx()

    const click = () => {
      const o = ctx.createOscillator()
      const g = ctx.createGain()
      o.type = 'square'
      o.frequency.value = 440
      g.gain.value = 0.05
      o.connect(g)
      g.connect(ctx.destination)
      o.start()
      o.stop(ctx.currentTime + 0.05)
    }

    const success = () => {
      const now = ctx.currentTime
      const freqs = [523.25, 659.25, 783.99] // C5, E5, G5
      freqs.forEach((f, i) => {
        const o = ctx.createOscillator()
        const g = ctx.createGain()
        o.type = 'sine'
        o.frequency.value = f
        g.gain.setValueAtTime(0.0001, now + i * 0.08)
        g.gain.exponentialRampToValueAtTime(0.06, now + i * 0.08 + 0.02)
        g.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.08 + 0.25)
        o.connect(g)
        g.connect(ctx.destination)
        o.start(now + i * 0.08)
        o.stop(now + i * 0.08 + 0.3)
      })
    }

    return { click, success }
  }, [])

  const handleRun = () => {
    setLoading(true)
    setShowResults(false)
    setTimeout(() => {
      setLoading(false)
      setShowResults(true)
      audio.success()
    }, 1500)
  }

  const playClick = () => audio.click()

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      <Navbar playClick={playClick} />
      <Hero />
      <main>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          <div className="text-center">
            <h2 className="text-lg text-gray-300" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
              Upload your network data to begin
            </h2>
          </div>
        </section>
        <UploadSection onRun={handleRun} loading={loading} playClick={playClick} />
        <ResultsSection visible={showResults} />
      </main>
      <Footer playClick={playClick} />
    </div>
  )
}

function Footer({ playClick }) {
  useEffect(() => {
    const links = document.querySelectorAll('footer a[data-clickable="true"]')
    links.forEach((el) => el.addEventListener('click', playClick))
    return () => links.forEach((el) => el.removeEventListener('click', playClick))
  }, [playClick])

  return (
    <footer className="border-t border-white/5 bg-black/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="text-2xl font-bold tracking-wider mb-2" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>
            <span className="text-[#FFA500]">Power</span>
            <span className="text-white">IQ</span>
          </div>
          <p className="text-sm text-gray-400" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
            Precision tools for modern power system engineers.
          </p>
        </div>
        <div>
          <h4 className="text-white mb-3 tracking-wide" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>Resources</h4>
          <ul className="space-y-2 text-sm" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
            <li><a data-clickable="true" href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white">Documentation</a></li>
            <li><a data-clickable="true" href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white">Tutorials</a></li>
            <li><a data-clickable="true" href="#" onClick={(e) => e.preventDefault()} className="text-gray-400 hover:text-white">Release Notes</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white mb-3 tracking-wide" style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}>Contact</h4>
          <ul className="space-y-1 text-sm" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
            <li className="text-gray-400">123 Gridline Ave, Suite 50</li>
            <li className="text-gray-400">poweriq@example.com</li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 pb-8" style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}>
        © {new Date().getFullYear()} PowerIQ. All rights reserved.
      </div>
    </footer>
  )
}

export default App

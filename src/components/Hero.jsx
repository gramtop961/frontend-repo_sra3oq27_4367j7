import Spline from '@splinetool/react-spline'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Hero() {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
    tl.fromTo(
      titleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    ).fromTo(
      subtitleRef.current,
      { y: 12, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.3'
    )
  }, [])

  return (
    <section className="relative w-full" style={{ height: '60vh' }}>
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/vc19ejtcC5VJjy5v/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-[#111111]" />
      </div>

      <div className="relative h-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center text-center">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl tracking-[0.2em] font-extrabold text-[#FFA500]"
          style={{ fontFamily: 'Rajdhani, system-ui, sans-serif' }}
        >
          LOAD FLOW ANALYSIS
        </h1>
        <p
          ref={subtitleRef}
          className="mt-4 text-base sm:text-lg md:text-xl text-gray-300"
          style={{ fontFamily: 'Inter, ui-sans-serif, system-ui' }}
        >
          Fast Decoupled Load Flow (FDLF) Method
        </p>
      </div>
    </section>
  )
}

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Volume2, VolumeX, Share2, Download, Maximize2, X, Heart, ChevronDown } from 'lucide-react'

const coverImage = `${import.meta.env.BASE_URL}images/wedding-cover.jpeg`
const detailsImage = `${import.meta.env.BASE_URL}images/wedding-details.jpeg`
const bismillahImage = `${import.meta.env.BASE_URL}images/bismillah-header.png`
const musicFile = `${import.meta.env.BASE_URL}music/wedding-ambience.wav`

export default function App() {
  const [opened, setOpened] = useState(false)
  const [muted, setMuted] = useState(false)
  const [zoomed, setZoomed] = useState('')
  const [musicReady, setMusicReady] = useState(false)
  const audioRef = useRef(null)

  useEffect(() => {
    const audio = new Audio(musicFile)
    audio.loop = true
    audio.volume = 0.32
    audioRef.current = audio
    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  const openInvitation = async () => {
    setOpened(true)
    if (audioRef.current && !muted) {
      try {
        await audioRef.current.play()
        setMusicReady(true)
      } catch {
        setMusicReady(false)
      }
    }
  }

  const toggleMusic = async () => {
    const nextMuted = !muted
    setMuted(nextMuted)
    if (!audioRef.current) return
    if (nextMuted) {
      audioRef.current.pause()
      setMusicReady(false)
    } else if (opened) {
      try {
        await audioRef.current.play()
        setMusicReady(true)
      } catch {
        setMusicReady(false)
      }
    }
  }

  const shareInvitation = async () => {
    const shareData = { title: 'Wedding Invitation', text: 'Assalamu Alaikum. You are warmly invited to join us for the Nikah and Walima celebration.', url: window.location.href }
    if (navigator.share) {
      try { await navigator.share(shareData) } catch { /* share sheet dismissed */ }
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href)
      alert('Invitation link copied!')
    }
  }

  const downloadImage = (src, name) => {
    const link = document.createElement('a')
    link.href = src
    link.download = name
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <header className="topbar">
        <a className="brand" href="#" aria-label="Wedding invitation home">
          <span className="brand-mark">✦</span>
          <span>THE WEDDING INVITATION</span>
        </a>
        <button className="sound-toggle" onClick={toggleMusic} aria-label={muted ? 'Turn music on' : 'Mute music'}>
          {muted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          <span>{muted ? 'Sound off' : 'Sound on'}</span>
        </button>
      </header>

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.section className="welcome" key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.96, y: -18 }} transition={{ duration: 0.55 }}>
            <div className="welcome-copy">
              <span className="eyebrow"><span /> A CELEBRATION OF LOVE <span /></span>
              <h1>With joy in our hearts,<br /><em>we invite you</em></h1>
              <p>A special day, a beautiful beginning, and the people who make it memorable.</p>
            </div>

            <motion.button className="envelope-button" onClick={openInvitation} whileHover={{ y: -7 }} whileTap={{ scale: 0.98 }} aria-label="Open wedding invitation">
              <div className="envelope">
                <div className="envelope-back" />
                <div className="letter">
                  <span className="letter-flourish">❦</span>
                  <span className="letter-title">शादी मुबारक</span>
                  <span className="letter-subtitle">YOU ARE INVITED</span>
                </div>
                <div className="envelope-front" />
                <div className="envelope-flap" />
                <div className="wax-seal">✦</div>
              </div>
              <span className="open-label">OPEN INVITATION <span>↗</span></span>
            </motion.button>
            <div className="welcome-foot"><Heart size={13} fill="currentColor" /> With the blessings of Allah · November 2026</div>
          </motion.section>
        ) : (
          <motion.section className="invitation-view" key="invitation" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}>
            <div className="invitation-heading">
              <span className="eyebrow"><span /> YOU ARE CORDIALLY INVITED <span /></span>
              <h2>A blessed celebration</h2>
              <p>Nikah & Walima · 17–19 November 2026</p>
            </div>

            <div className="artwork-stack">
              <motion.figure className="artwork-card cover-card" initial={{ rotate: -2, opacity: 0, x: -30 }} animate={{ rotate: 0, opacity: 1, x: 0 }} transition={{ delay: 0.2, duration: 0.7 }}>
                <button className="image-open" onClick={() => setZoomed(coverImage)} aria-label="View wedding cover full screen">
                  <img src={coverImage} alt="Wedding invitation cover with the wedding greeting and couple illustration" />
                  <span className="expand-hint"><Maximize2 size={15} /> View full size</span>
                </button>
                <figcaption><span>01</span> THE WEDDING GREETING</figcaption>
              </motion.figure>
              <motion.figure className="artwork-card details-card" initial={{ rotate: 2, opacity: 0, x: 30 }} animate={{ rotate: 0, opacity: 1, x: 0 }} transition={{ delay: 0.38, duration: 0.7 }}>
                <button className="image-open" onClick={() => setZoomed(detailsImage)} aria-label="View event details full screen">
                  <img src={detailsImage} alt="Wedding invitation details with Nikah, Haldi and Dawat-e-Walima event information" />
                  <span className="expand-hint"><Maximize2 size={15} /> View full size</span>
                </button>
                <figcaption><span>02</span> EVENTS & FAMILY DETAILS</figcaption>
              </motion.figure>
            </div>

            <div className="actions">
              <button className="primary-action" onClick={shareInvitation}><Share2 size={16} /> Share invitation</button>
              <button className="secondary-action" onClick={() => downloadImage(coverImage, 'wedding-invitation-cover.jpeg')}><Download size={16} /> Download card</button>
            </div>
            <div className="scroll-note"><ChevronDown size={15} /> Scroll to explore both invitation panels</div>
            <footer className="site-footer">WITH LOVE & BLESSINGS <span>✦</span> NOVEMBER 2026</footer>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {zoomed && (
          <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoomed('')}>
            <button className="close-lightbox" onClick={() => setZoomed('')} aria-label="Close full-screen image"><X /></button>
            <motion.img src={zoomed} alt="Full-size wedding invitation" initial={{ scale: 0.94 }} animate={{ scale: 1 }} onClick={e => e.stopPropagation()} />
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bottom-ornament">✧ <span>❦</span> ✧</div>
    </main>
  )
}

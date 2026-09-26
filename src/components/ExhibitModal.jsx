import { useEffect, useRef, useState } from 'react'
import {
  X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Volume2, Pause, Ruler, MapPin, Landmark, Phone, UserRound,
} from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

const SPEECH_LANGS = { en: 'en-US', ru: 'ru-RU', uz: 'uz-UZ' }
// Few browsers ship an Uzbek voice; Turkish pronounces Latin-script Uzbek far better than English.
const VOICE_FALLBACKS = { 'uz-UZ': ['tr-TR'] }
const speechSupported = typeof window !== 'undefined' && 'speechSynthesis' in window

const pickVoice = (langCode) => {
  const voices = window.speechSynthesis.getVoices()
  for (const code of [langCode, ...(VOICE_FALLBACKS[langCode] || [])]) {
    const prefix = code.split('-')[0]
    const voice =
      voices.find((v) => v.lang === code) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(prefix))
    if (voice) return voice
  }
  return null
}

// Chrome silently stops utterances longer than ~15s, so the narrative is read sentence by sentence.
const splitSentences = (text) => text.match(/[^.!?…]+[.!?…]*\s*/g)?.map((s) => s.trim()).filter(Boolean) || []

export default function ExhibitModal({ exhibit, exhibits, onClose, onNavigate }) {
  const { lang, t } = useLanguage()
  const [zoom, setZoom] = useState(1)
  const [imgError, setImgError] = useState(false)
  const [artistImgError, setArtistImgError] = useState(false)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const speechRunRef = useRef(0)
  // Chrome garbage-collects unreferenced utterances mid-speech and never fires onend.
  const utteranceRef = useRef(null)

  const cancelSpeech = () => {
    speechRunRef.current += 1
    utteranceRef.current = null
    if (!speechSupported) return
    const synth = window.speechSynthesis
    if (synth.speaking || synth.pending) synth.cancel()
  }

  const stopAudio = () => {
    cancelSpeech()
    setAudioPlaying(false)
  }

  const playAudio = () => {
    if (!speechSupported || !exhibit) return
    cancelSpeech()
    const run = speechRunRef.current
    const langCode = SPEECH_LANGS[lang] || 'en-US'
    const voice = pickVoice(langCode)
    const intro = [exhibit.title, [exhibit.artist, exhibit.year].filter(Boolean).join(', ')]
      .filter(Boolean)
      .join('. ')
    const sentences = splitSentences(
      [intro && `${intro}.`, exhibit.description, exhibit.history].filter(Boolean).join(' ')
    )
    if (!sentences.length) return

    const finish = () => {
      if (speechRunRef.current !== run) return
      utteranceRef.current = null
      setAudioPlaying(false)
    }

    // Sentences are spoken one after another (next starts on onend) so a single
    // long utterance never hits Chrome's ~15s cut-off.
    const speakAt = (i) => {
      if (speechRunRef.current !== run) return
      if (i >= sentences.length) return finish()
      const utterance = new SpeechSynthesisUtterance(sentences[i])
      utterance.lang = voice ? voice.lang : langCode
      if (voice) utterance.voice = voice
      utterance.rate = 0.95
      utterance.onend = () => speakAt(i + 1)
      utterance.onerror = (e) => {
        if (e.error === 'interrupted' || e.error === 'canceled') return
        console.warn('Audio guide error:', e.error)
        finish()
      }
      utteranceRef.current = utterance
      window.speechSynthesis.resume()
      window.speechSynthesis.speak(utterance)
    }

    setAudioPlaying(true)
    // Chrome drops a speak() issued in the same tick as cancel(); give it a moment.
    setTimeout(() => speakAt(0), 120)
  }

  useEffect(() => {
    setZoom(1)
    setImgError(false)
    setArtistImgError(false)
    stopAudio()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [exhibit?.id, lang])

  // Stop narration when the modal closes.
  useEffect(() => () => {
    speechRunRef.current += 1
    utteranceRef.current = null
    if (speechSupported) window.speechSynthesis.cancel()
  }, [])

  // Voices load asynchronously in some browsers; touching the list early warms it up.
  useEffect(() => {
    if (speechSupported) window.speechSynthesis.getVoices()
  }, [])

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNavigate(1)
      if (e.key === 'ArrowLeft') onNavigate(-1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose, onNavigate])

  if (!exhibit) return null

  const index = exhibits.findIndex((e) => e.id === exhibit.id)

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-obsidian/90 p-3 backdrop-blur-md fade-in sm:p-6"
      onClick={onClose}
    >
      <div
        className="scale-in relative grid max-h-[92vh] w-full max-w-6xl grid-cols-1 overflow-hidden rounded-sm bg-midnight frame-heritage md:grid-cols-2"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-obsidian/70 text-parchment transition-colors hover:bg-gold hover:text-obsidian"
        >
          <X className="h-4 w-4" strokeWidth={1.75} />
        </button>

        {/* LEFT: curatorial detail */}
        <div className="order-2 flex max-h-[92vh] flex-col overflow-y-auto p-6 sm:p-8 md:order-1">
          <span className="font-display text-xs tracking-widest text-gold">
            № {String(index + 1).padStart(2, '0')} · {exhibit.category}
          </span>
          <h2 className="mt-3 font-display text-3xl leading-tight text-parchment sm:text-4xl">
            {exhibit.title}
          </h2>
          <p className="mt-2 font-serif text-lg italic text-gold-light">
            {exhibit.artist} &middot; {exhibit.year}
          </p>

          <button
            onClick={audioPlaying ? stopAudio : playAudio}
            disabled={!speechSupported}
            title={speechSupported ? undefined : t.modal.audioUnsupported}
            className="mt-6 flex w-fit items-center gap-3 rounded-full border border-gold/40 bg-slate/60 px-4 py-2 transition-colors hover:border-gold disabled:cursor-not-allowed disabled:opacity-50"
          >
            {audioPlaying ? (
              <Pause className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
            ) : (
              <Volume2 className="h-4 w-4 text-gold-light" strokeWidth={1.75} />
            )}
            <span className="font-sans text-xs uppercase tracking-widest text-alabaster/80">
              {audioPlaying ? t.modal.playingAudio : t.modal.playAudio}
            </span>
            {audioPlaying && (
              <span className="flex items-end gap-0.5">
                {[1, 2, 3, 4].map((bar) => (
                  <span
                    key={bar}
                    className="w-0.5 animate-pulse rounded-full bg-gold"
                    style={{ height: `${4 + bar * 2}px`, animationDelay: `${bar * 120}ms` }}
                  />
                ))}
              </span>
            )}
          </button>

          <p className="mt-6 font-sans text-sm leading-relaxed text-alabaster/85">
            {exhibit.description}
          </p>

          <div className="mt-6 border-l-2 border-gold/40 pl-4">
            <p className="font-display text-xs uppercase tracking-widest text-gold/80">
              {t.modal.history}
            </p>
            <p className="mt-2 font-serif text-[15px] leading-relaxed text-alabaster/80">
              {exhibit.history}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 border-t border-frame pt-6">
            <div className="flex items-start gap-2">
              <Ruler className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  {t.modal.dimensions}
                </p>
                <p className="font-sans text-sm text-alabaster/90">{exhibit.dimensions}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Landmark className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  {t.modal.medium}
                </p>
                <p className="font-sans text-sm text-alabaster/90">{exhibit.medium}</p>
              </div>
            </div>
            <div className="col-span-2 flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
              <div>
                <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                  {t.modal.location}
                </p>
                <p className="font-sans text-sm text-alabaster/90">
                  {exhibit.museumFull} — {exhibit.location}
                </p>
              </div>
            </div>
            {exhibit.museumPhone && (
              <div className="col-span-2 flex items-start gap-2">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold/70" strokeWidth={1.5} />
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-widest text-alabaster/50">
                    {t.modal.phone}
                  </p>
                  <a
                    href={`tel:${exhibit.museumPhone.replace(/[^d+]/g, '')}`}
                    className="font-sans text-sm text-gold-light underline-offset-4 hover:underline"
                  >
                    {exhibit.museumPhone}
                  </a>
                </div>
              </div>
            )}
          </div>

          {(exhibit.artistBio || exhibit.artistImage) && (
            <div className="mt-8 border-t border-frame pt-6">
              <p className="font-display text-xs uppercase tracking-widest text-gold/80">
                {t.modal.aboutArtist}
              </p>
              <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-start">
                <div className="frame-gilded frame-gilded-md w-full max-w-[15rem] shrink-0 self-center sm:w-52 sm:self-start">
                  <div className="flex aspect-[3/4] w-full items-center justify-center overflow-hidden bg-midnight">
                    {exhibit.artistImage && !artistImgError ? (
                      <img
                        src={exhibit.artistImage}
                        alt={exhibit.artist}
                        onError={() => setArtistImgError(true)}
                        className="h-full w-full object-cover object-top"
                      />
                    ) : (
                      <UserRound className="h-14 w-14 text-gold/40" strokeWidth={1} />
                    )}
                  </div>
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xl text-parchment sm:text-2xl">{exhibit.artist}</p>
                  {exhibit.artistBio && (
                    <p className="mt-2 font-serif text-[15px] leading-relaxed text-alabaster/80">
                      {exhibit.artistBio}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-frame pt-6">
            <button
              onClick={() => onNavigate(-1)}
              className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-alabaster/70 transition-colors hover:text-gold-light"
            >
              <ChevronLeft className="h-4 w-4" strokeWidth={1.75} />
              {t.modal.previous}
            </button>
            <span className="font-display text-xs text-gold/60">
              {index + 1} / {exhibits.length}
            </span>
            <button
              onClick={() => onNavigate(1)}
              className="flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-alabaster/70 transition-colors hover:text-gold-light"
            >
              {t.modal.next}
              <ChevronRight className="h-4 w-4" strokeWidth={1.75} />
            </button>
          </div>
        </div>

        {/* RIGHT: image, zoom, plaque */}
        <div className="frame-gilded frame-gilded-lg relative order-1 h-[42vh] overflow-hidden bg-midnight md:order-2 md:h-auto">

          <div className="flex h-full w-full items-center justify-center overflow-hidden">
            {exhibit.image && !imgError ? (
              <img
                src={exhibit.image}
                alt={exhibit.title}
                onError={() => setImgError(true)}
                className="h-full w-full object-cover transition-transform duration-500 ease-out"
                style={{ transform: `scale(${zoom})` }}
              />
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-gradient-to-br from-slate via-midnight to-obsidian">
                <Landmark className="h-12 w-12 text-gold/50" strokeWidth={1.25} />
                <p className="font-display text-lg text-gold-light/70">{exhibit.title}</p>
              </div>
            )}
          </div>

          <div className="absolute left-[calc(var(--band)+0.75rem)] top-[calc(var(--band)+0.75rem)] z-40 flex items-center gap-1 rounded-full border border-gold/30 bg-obsidian/70 p-1 backdrop-blur-sm">
            <button
              onClick={() => setZoom((z) => Math.max(1, +(z - 0.25).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-parchment transition-colors hover:bg-gold hover:text-obsidian"
            >
              <ZoomOut className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
            <span className="w-10 text-center font-sans text-[11px] text-alabaster/70">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(2.5, +(z + 0.25).toFixed(2)))}
              className="flex h-8 w-8 items-center justify-center rounded-full text-parchment transition-colors hover:bg-gold hover:text-obsidian"
            >
              <ZoomIn className="h-3.5 w-3.5" strokeWidth={1.75} />
            </button>
          </div>

          <div className="absolute inset-x-[calc(var(--band)+0.75rem)] bottom-[calc(var(--band)+0.75rem)] z-40 rounded-sm border border-gold/40 bg-obsidian/80 px-4 py-3 backdrop-blur-sm">
            <p className="font-display text-sm text-gold-light sm:text-base">{exhibit.title}</p>
            <p className="font-sans text-[11px] uppercase tracking-widest text-alabaster/60">
              {exhibit.museumFull}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
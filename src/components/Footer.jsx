import { useRef } from 'react'
import { Landmark } from 'lucide-react'
import { useMotion } from '../motion/useMotion'
import { revealFrom } from '../motion/core'
import { useLanguage } from '../i18n/LanguageContext'
import { SITE_CONTACTS } from '../data/siteContacts'
import { telHref } from '../utils/phone'

export default function Footer() {
  const { t } = useLanguage()
  const { phone, email, address, socials } = SITE_CONTACTS
  const activeSocials = socials.filter((s) => s.url)
  const scope = useRef(null)

  useMotion(scope, (c, root) => {
    const q = (sel) => root.querySelectorAll(sel)
    revealFrom(q('[data-colophon]'), 'drift', c, { trigger: root, start: 'top 95%', stagger: 0.12 })
    revealFrom(q('[data-contacts-title]'), 'rise', c, { trigger: q('[data-contacts]')[0], start: 'top 95%' })
    revealFrom(q('dl > div'), 'tilt', c, { trigger: q('[data-contacts]')[0], start: 'top 95%', stagger: 0.1, delay: 0.15 })
  })

  return (
    <footer ref={scope} className="rule-heritage bg-midnight">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div data-colophon className="flex items-center gap-2">
            <Landmark className="h-4 w-4 text-gold" strokeWidth={1.5} />
            <span className="font-display text-sm tracking-widest2 text-parchment">
              GRAND MUSÉE
            </span>
          </div>
          <p data-colophon className="max-w-md font-serif text-sm italic text-alabaster/50">
            A digital sanctuary uniting the Louvre, the Met, the British Museum, the Egyptian
            Museum, the Hermitage, the Vatican, and beyond.
          </p>
          <div data-colophon className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-sans text-[10px] uppercase tracking-[0.25em] text-alabaster/40">
            <span>Paris</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Cairo</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>London</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>New York</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Amsterdam</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Saint Petersburg</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Tokyo</span>
            <span className="h-1 w-1 rounded-full bg-gold/40" />
            <span>Vatican City</span>
          </div>

          <section data-contacts aria-labelledby="footer-contacts" className="rule-heritage mt-6 w-full max-w-4xl pt-8">
            <h2
              data-contacts-title
              id="footer-contacts"
              className="font-display text-xs uppercase tracking-widest2 text-gold"
            >
              {t.footer.contacts}
            </h2>
            <dl className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <ContactItem label={t.footer.phone} empty={t.footer.tba}>
                {phone && <a href={telHref(phone)} className="hover:text-gold-light">{phone}</a>}
              </ContactItem>
              <ContactItem label={t.footer.email} empty={t.footer.tba}>
                {email && <a href={`mailto:${email}`} className="hover:text-gold-light">{email}</a>}
              </ContactItem>
              <ContactItem label={t.footer.address} empty={t.footer.tba}>
                {address}
              </ContactItem>
              <ContactItem label={t.footer.social} empty={t.footer.tba}>
                {activeSocials.length > 0 &&
                  activeSocials.map((s, i) => (
                    <span key={s.label}>
                      {i > 0 && <span className="px-2 text-gold/40">·</span>}
                      <a href={s.url} target="_blank" rel="noreferrer" className="hover:text-gold-light">
                        {s.label}
                      </a>
                    </span>
                  ))}
              </ContactItem>
            </dl>
            <p className="mt-6 font-serif text-sm italic text-alabaster/50">{t.footer.museumLines}</p>
          </section>

          <p className="mt-4 font-sans text-[11px] text-alabaster/30">
            &copy; {new Date().getFullYear()} Grand Musée. A curatorial concept archive.
          </p>
        </div>
      </div>
    </footer>
  )
}

function ContactItem({ label, empty, children }) {
  const hasValue = Array.isArray(children) ? children.some(Boolean) : Boolean(children)
  return (
    <div>
      <dt className="font-sans text-[10px] uppercase tracking-[0.25em] text-alabaster/50">{label}</dt>
      <dd className={`mt-2 font-serif text-base ${hasValue ? 'text-parchment' : 'italic text-alabaster/40'}`}>
        {hasValue ? children : empty}
      </dd>
    </div>
  )
}
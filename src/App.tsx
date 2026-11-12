import React, { useEffect, useRef, useState } from "react";
import {
  Monitor,
  Clapperboard,
  Palette,
  ArrowRight,
  ArrowUpRight,
  Check,
  Mail,
  MessageCircle,
  Phone,
  Menu,
  X,
  GraduationCap,
  Briefcase,
  Wrench,
  UserRound,
  Sun,
  Moon,
  Heart
} from "lucide-react";
import VideoGallery from "./VideoGallery";
import { REVIEWS, SITE, CONTACT, SERVICES, WEBSITE_PACKAGES, PRICING_NOTES, PROCESS, WORK, WorkItem, WorkKind, ServiceId } from "./data";

const peso = (n: number) => `₱${n.toLocaleString("en-PH")}`;

const SERVICE_ICONS: Record<ServiceId, any> = { web: Monitor, va: UserRound, invite: Heart, video: Clapperboard, design: Palette };

const priceText = (n?: number) => (n === undefined ? "Price on request" : `from ${peso(n)}`);

const NAV = [
  { href: "#services", label: "Services" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Process" },
  { href: "#pricing", label: "Pricing" },
  { href: "#reviews", label: "Reviews" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" }
];

const WORK_FILTERS: ("All" | WorkKind)[] = ["All", "Website", "VA Portfolio", "Invitation", "Video", "Graphic Design"];
const FILTER_ICONS: Record<string, any> = { All: Check, Website: Monitor, "VA Portfolio": UserRound, Invitation: Heart, Video: Clapperboard, "Graphic Design": Palette };
const SERVICE_TO_KIND: Record<ServiceId, WorkKind> = { web: "Website", va: "VA Portfolio", invite: "Invitation", video: "Video", design: "Graphic Design" };

/* Fades content in once it scrolls into view. `delay` staggers items in a grid. */
function Reveal({
  as: Tag = "div",
  className = "",
  delay = 0,
  children,
  ...rest
}: {
  as?: any;
  className?: string;
  delay?: number;
  children: React.ReactNode;
  [key: string]: any;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-visible");
          obs.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={{ "--d": `${delay}s` } as React.CSSProperties} {...rest}>
      {children}
    </Tag>
  );
}

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </Reveal>
  );
}

function ExternalHint() {
  return <span className="sr-only"> (opens in a new tab)</span>;
}

/* Plays the short video samples only while they are on screen. */
function ReelPlayer({ sources, title }: { sources: string[]; title: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView, index]);

  return (
    <video
      ref={ref}
      key={sources[index]}
      className="work-video"
      src={inView || index > 0 ? sources[index] : undefined}
      muted
      playsInline
      preload="none"
      onEnded={() => setIndex((i) => (i + 1) % sources.length)}
      aria-label={`${title}, video sample`}
    />
  );
}

const WorkCard: React.FC<{ item: WorkItem; delay: number }> = ({ item, delay }) => {
  const external = item.previewUrl?.startsWith("http");
  return (
    <Reveal as="article" className={`work-card kind-${item.kind.replace(/\s/g, "").toLowerCase()}`} delay={delay}>
      <div className="work-media">
        {item.video ? (
          <ReelPlayer sources={item.video} title={item.title} />
        ) : item.imageUrl ? (
          <img src={item.imageUrl} alt={`${item.title}, ${item.kind.toLowerCase()} sample`} loading="lazy" />
        ) : (
          <img src={`/assets/concepts/${item.id}.png`} alt={`${item.title} concept preview`} loading="lazy" />
        )}
        <span className={`work-badge ${item.concept ? "is-concept" : ""}`}>{item.concept ? "Concept Project" : item.kind}</span>
      </div>
      <div className="work-body">
        <p className="work-kind">{item.kind}</p>
        <h3 className="work-title">{item.title}</h3>
        <p className="work-desc">{item.description}</p>
        {item.previewUrl && (
          <a
            className="text-link"
            href={item.previewUrl}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : { target: "_blank", rel: "noopener" })}
          >
            {item.previewLabel ?? "View"}
            <ArrowUpRight size={15} aria-hidden="true" />
            <ExternalHint />
          </a>
        )}
      </div>
    </Reveal>
  );
};

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState<(typeof WORK_FILTERS)[number]>("All");
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset.theme === "dark" ? "dark" : "light"
  );

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const visibleWork = filter === "All" ? WORK : WORK.filter((w) => w.kind === filter);
  const creative = SERVICES.filter((s) => s.id !== "web");

  const showWork = (kind: WorkKind) => {
    setFilter(kind);
    document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
        <nav className="nav container" aria-label="Main">
          <a href="#top" className="brand" aria-label="Craftline Digital, back to top">
            <svg className="brand-mark" viewBox="0 0 120 120" aria-hidden="true">
              <rect x="4" y="4" width="112" height="112" rx="28" fill="currentColor" />
              <path d="M76 31H53C36 31 23 44 23 60s13 29 30 29h23" fill="none" stroke="#F7F7F2" strokeWidth="9" strokeLinecap="round" />
              <path d="M48 60h48M79 43l17 17-17 17" fill="none" stroke="#C9F36A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span>
              Craftline <span className="brand-accent">Digital</span>
            </span>
          </a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
          <div className="nav-actions">
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a href="#contact" className="btn btn-dark nav-cta">
              Discuss a Project
              <ArrowRight size={16} aria-hidden="true" />
            </a>
            <button
            className="menu-btn"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          </div>
        </nav>
        <div id="mobile-menu" className={`mobile-menu ${menuOpen ? "is-open" : ""}`} hidden={!menuOpen}>
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setMenuOpen(false)}>
              {n.label}
            </a>
          ))}
          <a href="#contact" className="btn btn-dark" onClick={() => setMenuOpen(false)}>
            Discuss a Project
          </a>
        </div>
      </header>

      <main id="main">
        {/* ── HERO ── */}
        <section id="top" className="hero">
          <div className="container hero-grid">
            <div className="hero-copy">
              <p className="eyebrow hero-eyebrow">For local businesses</p>
              <h1 className="hero-title">
                Practical websites and <span className="hl">creative content</span> for local businesses.
              </h1>
              <p className="hero-sub">
                I help local businesses present their services online with clear websites, promotional videos, and
                graphic designs. I also build portfolio websites for aspiring virtual assistants and digital wedding invitations.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn btn-dark">
                  Discuss a Project
                  <ArrowRight size={16} aria-hidden="true" />
                </a>
                <a href="#work" className="btn btn-light">
                  View My Work
                </a>
              </div>
              <ul className="hero-services" aria-label="Services and starting prices">
                {SERVICES.map((s) => {
                  const Icon = SERVICE_ICONS[s.id];
                  return (
                    <li key={s.id}>
                      <Icon size={16} aria-hidden="true" />
                      <span>
                        {s.title}
                        <small>{priceText(s.startingAt)}</small>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="hero-visual">
              <div className="hero-blob" aria-hidden="true" />
              <div className="mock-browser" aria-hidden="true">
                <div className="mock-bar">
                  <span />
                  <span />
                  <span />
                  <em>yourbusiness.ph</em>
                </div>
                <div className="mock-page">
                  <p className="mock-tag">Your business</p>
                  <p className="mock-title">A better first impression starts here.</p>
                  <p className="mock-text">A clear website helps customers understand what you do and how to reach you.</p>
                  <span className="mock-btn">Contact us</span>
                  <div className="mock-tiles">
                    <span className="t1" />
                    <span className="t2" />
                    <span className="t3" />
                  </div>
                </div>
              </div>
              <div className="float-card float-a" aria-hidden="true">
                <span className="float-icon">
                  <Monitor size={16} />
                </span>
                <span>
                  <strong>Mobile-friendly</strong>
                  Websites that work on phones
                </span>
              </div>
              <div className="float-card float-b" aria-hidden="true">
                <span className="float-icon">
                  <Clapperboard size={16} />
                </span>
                <span>
                  <strong>Reels &amp; TikTok</strong>
                  Short promo videos
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section id="services" className="section">
          <div className="container">
            <SectionHead
              eyebrow="Services"
              title="How I can help"
              sub="Websites for local businesses, portfolio sites for aspiring VAs, wedding invitations, and promo content. Each service is priced on its own."
            />
            <div className="services-grid">
              {SERVICES.map((s, i) => {
                const Icon = SERVICE_ICONS[s.id];
                return (
                  <Reveal as="article" key={s.id} className={`service-card svc-${s.id}`} delay={i * 0.1}>
                    <span className="service-icon" aria-hidden="true">
                      <Icon size={22} />
                    </span>
                    <h3>{s.title}</h3>
                    <p className="service-summary">{s.summary}</p>
                    <ul className="check-list">
                      {s.items.map((it) => (
                        <li key={it}>
                          <Check size={15} aria-hidden="true" />
                          {it}
                        </li>
                      ))}
                    </ul>
                    <a href="#pricing" className="service-price">
                      {s.startingAt === undefined ? (
                        <span>
                          <strong>Price on request</strong>
                        </span>
                      ) : (
                        <span>
                          Starting at <strong>{peso(s.startingAt)}</strong>
                          {s.unit && <small> {s.unit}</small>}
                        </span>
                      )}
                      <ArrowRight size={16} aria-hidden="true" />
                    </a>
                    <button type="button" className="see-examples" onClick={() => showWork(SERVICE_TO_KIND[s.id])}>
                      See {s.title.toLowerCase()} examples
                      <ArrowRight size={15} aria-hidden="true" />
                    </button>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── WORK ── */}
        <section id="work" className="section section-tint">
          <div className="container">
            <SectionHead
              eyebrow="Selected Work"
              title="Samples of my work"
              sub="Websites, VA portfolios, wedding invitations, videos, and graphics I've made. Anything marked “Concept Project” is a demo I built to show what a package can look like, not a client project."
            />
            <p className="filters-label">Choose a category</p>
            <div className="filters" role="group" aria-label="Filter work by type">
              {WORK_FILTERS.map((f) => {
                const Icon = FILTER_ICONS[f];
                const count = f === "All" ? WORK.length : WORK.filter((w) => w.kind === f).length;
                return (
                  <button key={f} className={`filter ${filter === f ? "is-active" : ""}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                    <Icon size={18} aria-hidden="true" />
                    <span>{f}</span>
                    <span className="filter-count">{count}</span>
                  </button>
                );
              })}
            </div>
            <div className="work-grid">
              {visibleWork.map((w, i) => (
                <WorkCard key={`${filter}-${w.id}`} item={w} delay={(i % 3) * 0.08} />
              ))}
            </div>
            {(filter === "All" || filter === "Video") && <VideoGallery />}
          </div>
        </section>

        {/* ── PROCESS ── */}
        <section id="process" className="section">
          <div className="container">
            <SectionHead eyebrow="How It Works" title="A simple four-step process" />
            <ol className="process-grid">
              {PROCESS.map((p, i) => (
                <Reveal as="li" key={p.title} className="process-step" delay={i * 0.1}>
                  <span className="step-num" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── PRICING ── */}
        <section id="pricing" className="section section-dark">
          <div className="container">
            <SectionHead
              eyebrow="Starting Prices"
              title="Clear starting prices"
              sub="Website packages, plus VA portfolio websites, wedding invitations, video editing, and graphic design as separate services."
            />
            <h3 className="pricing-label">Website packages</h3>
            <div className="pricing-grid">
              {WEBSITE_PACKAGES.map((p, i) => (
                <Reveal as="article" key={p.name} className={`price-card ${p.featured ? "is-featured" : ""}`} delay={i * 0.1}>
                  <h4>{p.name}</h4>
                  <p className="price">
                    <small>Starting at</small>
                    {peso(p.startingAt)}
                  </p>
                  <p className="price-summary">{p.summary}</p>
                  <ul className="check-list">
                    {p.includes.map((it) => (
                      <li key={it}>
                        <Check size={15} aria-hidden="true" />
                        {it}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn ${p.featured ? "btn-lime" : "btn-outline"}`}>
                    Ask about {p.name}
                  </a>
                </Reveal>
              ))}
            </div>

            <h3 className="pricing-label">Other services (priced separately)</h3>
            <div className="creative-grid">
              {creative.map((s, i) => {
                const Icon = SERVICE_ICONS[s.id];
                return (
                  <Reveal as="article" key={s.id} className="creative-card" delay={i * 0.1}>
                    <span className="service-icon" aria-hidden="true">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h4>{s.title}</h4>
                      <p>
                        {s.startingAt === undefined ? (
                          <strong>Price on request</strong>
                        ) : (
                          <>
                            Starting at <strong>{peso(s.startingAt)}</strong> {s.unit}
                          </>
                        )}
                      </p>
                      <p className="creative-note">
                        {s.id === "va"
                          ? "A personal portfolio site for aspiring virtual assistants. Send me your resume and samples and I'll give you a quote."
                          : s.id === "invite"
                            ? "Send me your names, date, venue, and colors, and I'll give you a quote. Changes to the details are easy to make before the day."
                          : s.id === "video"
                            ? "Based on a short video of up to about 30 seconds. Footage, length, format, music, and revisions are confirmed per project."
                            : "Multiple sizes, bulk requests, complex designs, and rush work are quoted separately."}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>

            <Reveal as="ul" className="pricing-notes">
              {PRICING_NOTES.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="section section-tint">
          <div className="container">
            <SectionHead eyebrow="Client Reviews" title="What clients said" sub="Real messages from clients. Names and photos are blurred for their privacy." />
            <div className="reviews-grid">
              {REVIEWS.map((r, i) => (
                <Reveal as="figure" key={r.image} className="review-card" delay={i * 0.1}>
                  <img src={r.image} alt={`Message from a client: ${r.quote}`} loading="lazy" />
                  <figcaption>
                    <span className="review-stars" aria-hidden="true">★★★★★</span>
                    <q>{r.quote}</q>
                    <span className="review-who">{r.project}</span>
                  </figcaption>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ABOUT ── */}
        <section id="about" className="section">
          <div className="container about-grid">
            <Reveal className="about-copy">
              <p className="eyebrow">About</p>
              <h2 className="section-title">Hi, I'm Glenn.</h2>
              <p>
                I'm a BS Information Systems graduate from the Philippines with over two years of remote work for a
                US-based business. In that time I've built websites and landing pages, made graphics for ads and social
                posts, and edited short promotional videos.
              </p>
              <p>
                Now I want to bring that same practical work to local businesses: a clear website your customers can
                find, and promo content that helps you stand out on social media.
              </p>
              <a className="text-link" href={SITE.portfolioUrl} target="_blank" rel="noopener noreferrer">
                See my personal portfolio and resume
                <ArrowUpRight size={15} aria-hidden="true" />
                <ExternalHint />
              </a>
            </Reveal>
            <Reveal className="about-facts" delay={0.1}>
              <div className="fact">
                <GraduationCap size={20} aria-hidden="true" />
                <span>
                  <strong>BS Information Systems</strong>
                  Caraga State University, Cum Laude
                </span>
              </div>
              <div className="fact">
                <Briefcase size={20} aria-hidden="true" />
                <span>
                  <strong>2+ years of remote work</strong>
                  Websites, graphics, and video for a US-based business
                </span>
              </div>
              <div className="fact">
                <Wrench size={20} aria-hidden="true" />
                <span>
                  <strong>Tools I use</strong>
                  Canva, CapCut, and website builders
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── CONTACT ── */}
        <section id="contact" className="section section-tint">
          <div className="container">
            <Reveal className="contact-card">
              <div className="contact-copy">
                <p className="eyebrow">Contact</p>
                <h2 className="section-title">Let's talk about your project.</h2>
                <p>
                  Send me a message with what your business does and what you need, like a website, a promo video, or
                  graphics. I'll reply with questions and a quote.
                </p>
              </div>
              <div className="contact-channels">
                {CONTACT.email && (
                  <a className="channel" href={`mailto:${CONTACT.email}`}>
                    <span className="channel-icon">
                      <Mail size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <small>Email</small>
                      {CONTACT.email}
                    </span>
                  </a>
                )}
                {CONTACT.whatsapp && (
                  <a className="channel" href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer">
                    <span className="channel-icon">
                      <Phone size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <small>WhatsApp</small>
                      {CONTACT.whatsappDisplay}
                    </span>
                    <ExternalHint />
                  </a>
                )}
                {CONTACT.messenger && (
                  <a className="channel" href={CONTACT.messenger} target="_blank" rel="noopener noreferrer">
                    <span className="channel-icon">
                      <MessageCircle size={20} aria-hidden="true" />
                    </span>
                    <span>
                      <small>Messenger</small>
                      Message me on Facebook
                    </span>
                    <ExternalHint />
                  </a>
                )}
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <p className="brand">
              <svg className="brand-mark" viewBox="0 0 120 120" aria-hidden="true">
              <rect x="4" y="4" width="112" height="112" rx="28" fill="currentColor" />
              <path d="M76 31H53C36 31 23 44 23 60s13 29 30 29h23" fill="none" stroke="#F7F7F2" strokeWidth="9" strokeLinecap="round" />
              <path d="M48 60h48M79 43l17 17-17 17" fill="none" stroke="#C9F36A" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
              <span>
                Craftline <span className="brand-accent">Digital</span>
              </span>
            </p>
            <p className="footer-desc">{SITE.descriptor}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {NAV.map((n) => (
                <li key={n.href}>
                  <a href={n.href}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </footer>
    </>
  );
}

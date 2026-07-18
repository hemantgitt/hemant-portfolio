'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Mail,
  Phone,
  Github,
  Linkedin,
  Copy,
  Check,
  ChevronDown,
  Sparkles,
  Zap,
  Layers,
  Code2,
  Wrench,
  Boxes,
  ShieldCheck,
  Cpu,
  Terminal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

/* --------------------------------- DATA --------------------------------- */

const EMAIL = 'hemantjhaa97@gmail.com'
const PHONE = '+91 87008 58191'
const PHONE_RAW = '+918700858191'

const SKILL_GROUPS = [
  {
    icon: Code2,
    title: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind', 'MUI'],
  },
  {
    icon: Boxes,
    title: 'State Management',
    items: ['Redux Toolkit', 'Redux Saga', 'React Query', 'Zustand', 'Context API'],
  },
  {
    icon: Layers,
    title: 'Architecture',
    items: ['Micro Frontends', 'SSR', 'SSG', 'ISR', 'Code Splitting', 'Lazy Loading', 'A11y'],
  },
  {
    icon: ShieldCheck,
    title: 'API & Auth',
    items: ['REST APIs', 'GraphQL', 'JWT', 'OAuth', 'RBAC', 'WebSockets'],
  },
  {
    icon: Cpu,
    title: 'Performance',
    items: ['Core Web Vitals', 'Bundle Analysis', 'Caching', 'CDN', 'Image Optimization'],
  },
  {
    icon: Wrench,
    title: 'Tooling',
    items: ['Git', 'Docker', 'Vercel', 'Jest', 'RTL', 'Cursor AI', 'Claude'],
  },
]

const PROJECTS = [
  {
    id: 'pvr-inox',
    name: 'PVR-INOX',
    tag: 'Enterprise · Consumer + Admin',
    tagline: 'Movie booking platform serving millions of moviegoers across India.',
    accent: 'from-amber-500/20 via-orange-500/10 to-transparent',
    dot: 'bg-amber-400',
    stack: ['Next.js', 'React', 'Redux Toolkit', 'Redux Saga', 'TypeScript', 'Tailwind'],
    highlights: ['SSR + ISR', 'Payments', 'RBAC Admin', 'A/B Experiments'],
    sections: {
      overview:
        'Consumer-facing web application and internal admin platform for one of India\u2019s largest cinema chains. Built the end-to-end booking journey, food ordering, Super Ticket and Passport products, along with an operator dashboard for content, pricing and access control.',
      problem:
        'Legacy booking flow suffered from slow interactive time, brittle state during payment retries, and a monolithic admin panel that made rolling out new pricing formats risky. Business needed faster feature velocity without breaking peak-hour traffic.',
      role:
        'Owned the frontend architecture for the booking module and the admin RBAC layer. Led component library adoption, defined data-fetching conventions, mentored two mid-level engineers, and shipped weekly production releases.',
      architecture:
        'Next.js App Router with route-level code splitting. Redux Toolkit for global session/booking state, Redux Saga for orchestrating multi-step payment flows and idempotent retries. Server components for content-heavy pages, client islands for the interactive seat map. React Query for admin dashboards with background revalidation.',
      challenges:
        'Seat-map rendering for 500+ seats had layout thrash on low-end Android. Payment gateway retries created duplicate bookings under flaky networks. Admin permissions were scattered across pages.',
      solution:
        'Rebuilt the seat map on a virtualized canvas grid, memoized selectors, and moved layout math off the main thread. Introduced saga-driven idempotency keys and optimistic UI with rollback. Centralized RBAC into a permission provider consumed via a `useCan()` hook — pages stayed declarative.',
      performance:
        'Reduced booking-page LCP by ~42%, cut JS bundle by ~28% via route-level splitting, and eliminated a class of duplicate-booking incidents post-launch.',
      impact:
        'Weekly deploy cadence, measurable lift in checkout completion, and a reusable admin shell now used across three internal products.',
    },
  },
  {
    id: 'sonnys-carwash',
    name: "Sonny's Car Wash",
    tag: 'Consumer PWA · White-label',
    tagline: 'Offline-first booking PWA for a multi-tenant car wash network.',
    accent: 'from-sky-500/20 via-blue-500/10 to-transparent',
    dot: 'bg-sky-400',
    stack: ['React', 'Next.js', 'IndexedDB', 'Service Workers', 'Tailwind', 'TypeScript'],
    highlights: ['Offline PWA', 'IndexedDB Sync', 'White-label Theming', 'Admin Console'],
    sections: {
      overview:
        'Customer-facing PWA plus an admin dashboard for a car-wash network with sites in areas of patchy connectivity. White-label so each operator gets branded theming, pricing and availability.',
      problem:
        'Bookings were being lost when users lost signal mid-flow. Operators needed the same app skinned per brand without forking the codebase.',
      role:
        'Frontend lead. Designed the offline queue, theming system and admin architecture. Set up the PWA install experience and background sync.',
      architecture:
        'Service worker with a stale-while-revalidate strategy for shell assets, IndexedDB as the source of truth for pending bookings, and a background sync worker that replays queued mutations when the network returns. Design tokens exposed via CSS variables driven by a per-tenant config.',
      challenges:
        'Conflict resolution when the same slot was booked offline by two devices. Consistent theming without CSS bloat. Ensuring the admin panel worked on tablets in the field.',
      solution:
        'Server-authoritative conflict resolution with human-readable rebooking suggestions. A single Tailwind theme powered by runtime CSS variables — zero extra CSS per tenant. Admin built responsive-first with touch-friendly controls.',
      performance:
        'Sub-second repeat loads, works fully offline for the booking journey, and the admin bundle is under 180kb gzipped.',
      impact:
        'Recovered previously lost offline bookings, onboarded new tenants in hours instead of days.',
    },
  },
  {
    id: 'catholic-women-cycle',
    name: 'Catholic Women Cycle',
    tag: 'HealthTech · Consumer + Admin',
    tagline: 'Pregnancy and menstrual cycle tracking with secure document upload.',
    accent: 'from-rose-500/20 via-pink-500/10 to-transparent',
    dot: 'bg-rose-400',
    stack: ['React', 'Next.js', 'React Query', 'TypeScript', 'Tailwind', 'JWT + RBAC'],
    highlights: ['Secure Uploads', 'Payments', 'RBAC', 'Consent Flows'],
    sections: {
      overview:
        'Cycle and pregnancy tracking platform with a customer app and admin panel. Handles secure document upload, subscription payments and role-based access for practitioners.',
      problem:
        'Users needed a private, calm experience for sensitive health data. Practitioners needed a fast triage view with granular access.',
      role:
        'Frontend engineer end-to-end. Built the customer app UI, uploader, subscription checkout and the practitioner console with role-scoped views.',
      architecture:
        'Next.js App Router with server components for content pages and client islands for cycle logging. React Query for cache-first practitioner views. Uploader uses signed URLs with chunked resumable uploads. RBAC enforced both in UI (route guards + `useCan()`) and server-side.',
      challenges:
        'Handling large document uploads on flaky mobile connections, keeping the UI calm and legible, and preventing accidental data leaks across roles.',
      solution:
        'Chunked uploads with pause/resume and integrity checks. A restrained type system (single serif accent, generous spacing) that reads more like an editorial product than a medical form. Role-scoped data hooks so a lower-privilege UI simply cannot request higher-privilege data.',
      performance:
        'Fast first paint under 1.5s on 4G, upload resumes recover from 30s+ disconnects, and admin views hydrate incrementally.',
      impact:
        'Reduced upload failure rate significantly, cleaner practitioner workflow, and a codebase set up for internationalization.',
    },
  },
]

/* -------------------------------- HELPERS ------------------------------- */

const fadeUp = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <motion.div {...fadeUp} className="mb-14 max-w-2xl">
      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
        <span className="h-px w-8 bg-border" />
        {eyebrow}
      </div>
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-balance">{title}</h2>
      {description && (
        <p className="mt-3 text-muted-foreground text-base md:text-lg text-balance">{description}</p>
      )}
    </motion.div>
  )
}

/* ---------------------------------- NAV --------------------------------- */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-white/[0.06] backdrop-blur-xl bg-background/60">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 group">
          <span className="h-7 w-7 rounded-md bg-gradient-to-br from-white to-white/70 text-black grid place-items-center font-semibold text-sm">
            H
          </span>
          <span className="font-medium text-sm tracking-tight">hemant.dev</span>
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#skills" className="hover:text-foreground transition-colors">Skills</a>
          <a href="#projects" className="hover:text-foreground transition-colors">Projects</a>
          <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild size="sm" variant="ghost" className="hidden sm:inline-flex text-sm">
            <a href="/Hemant_Jha_Resume.pdf" target="_blank" rel="noopener">
              Resume
            </a>
          </Button>
          <Button asChild size="sm" className="h-8 text-sm">
            <a href="#contact">
              Contact <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </header>
  )
}

/* ---------------------------------- HERO -------------------------------- */

function Hero() {
  const copyEmail = async () => {
    await navigator.clipboard.writeText(EMAIL)
    toast.success('Email copied to clipboard')
  }

  return (
    <section id="top" className="relative pt-40 pb-28 md:pt-48 md:pb-40 overflow-hidden">
      {/* Background */}
      <div aria-hidden className="absolute inset-0 grid-pattern radial-fade opacity-70" />
      <div aria-hidden className="absolute inset-0 noise opacity-[0.25] mix-blend-overlay pointer-events-none" />
      <div
        aria-hidden
        className="absolute left-1/2 top-24 -translate-x-1/2 h-[340px] w-[820px] max-w-[95%] rounded-full bg-gradient-to-br from-white/10 via-white/[0.03] to-transparent blur-3xl"
      />

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-muted-foreground backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          Open to Senior Frontend opportunities
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="mt-8 text-[44px] leading-[1.02] md:text-[76px] md:leading-[0.98] font-semibold tracking-[-0.03em] text-balance"
        >
          Hi, I&rsquo;m Hemant Jha.
          <br />
          <span className="text-muted-foreground">Senior Frontend Engineer.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-6 max-w-2xl text-lg md:text-xl text-muted-foreground text-balance"
        >
          I build scalable, high-performance web applications using{' '}
          <span className="text-foreground">React</span>,{' '}
          <span className="text-foreground">Next.js</span> and{' '}
          <span className="text-foreground">TypeScript</span>. 6+ years Software development.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Button asChild size="lg" className="h-11 px-5">
            <a href="#projects">
              View projects <ArrowRight className="ml-1.5 h-4 w-4" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-11 px-5 border-white/15 bg-white/[0.02] hover:bg-white/[0.05]">
            <a href="/Hemant_Jha_Resume.pdf" target="_blank" rel="noopener">
              <Download className="mr-2 h-4 w-4" /> Download resume
            </a>
          </Button>
          <Button size="lg" variant="ghost" onClick={copyEmail} className="h-11 px-4 text-muted-foreground hover:text-foreground">
            <Mail className="mr-2 h-4 w-4" /> {EMAIL}
            <Copy className="ml-2 h-3.5 w-3.5 opacity-60" />
          </Button>
        </motion.div>

        {/* Stat strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.02]"
        >
          {[
            { k: '6+', v: 'Years experience' },
            { k: '10+', v: 'Products shipped' },
            { k: '12+', v: 'Production releases' },
            { k: '30+', v: 'Technologies' },
          ].map((s) => (
            <div key={s.v} className="bg-background/60 px-5 py-5">
              <div className="text-2xl md:text-3xl font-semibold tracking-tight">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* --------------------------------- SKILLS ------------------------------- */

function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Toolkit"
          title="The stack behind the products."
          description="Deep in the React and Next.js ecosystem — architecture, state, performance and the tooling around them."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILL_GROUPS.map((g, i) => {
            const Icon = g.icon
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="group relative rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-lg bg-white/[0.05] border border-white/10 grid place-items-center">
                    <Icon className="h-4 w-4 text-foreground/80" />
                  </div>
                  <h3 className="text-sm font-medium tracking-tight">{g.title}</h3>
                </div>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {g.items.map((it) => (
                    <span
                      key={it}
                      className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.03] px-2 py-1 text-xs text-foreground/80"
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* -------------------------------- PROJECTS ------------------------------ */

function ProjectMock({ project }) {
  return (
    <div className={`relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-white/[0.08] bg-gradient-to-br ${project.accent}`}>
      {/* browser chrome */}
      <div className="absolute inset-x-0 top-0 h-8 flex items-center gap-1.5 px-3 border-b border-white/[0.06] bg-black/30 backdrop-blur">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
        <div className="ml-3 h-4 flex-1 max-w-[220px] rounded bg-white/[0.05] border border-white/[0.06] flex items-center px-2">
          <span className="text-[10px] text-muted-foreground truncate">
            {project.id}.app
          </span>
        </div>
      </div>
      {/* body */}
      <div className="absolute inset-0 pt-8 p-5 grid grid-cols-6 grid-rows-4 gap-2">
        <div className="col-span-2 row-span-4 rounded-md bg-white/[0.04] border border-white/[0.05]" />
        <div className="col-span-4 row-span-1 rounded-md bg-white/[0.06] border border-white/[0.05]" />
        <div className="col-span-2 row-span-2 rounded-md bg-white/[0.04] border border-white/[0.05]" />
        <div className="col-span-2 row-span-2 rounded-md bg-white/[0.05] border border-white/[0.05]" />
        <div className="col-span-4 row-span-1 rounded-md bg-white/[0.03] border border-white/[0.05]" />
      </div>
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <span className={`h-1.5 w-1.5 rounded-full ${project.dot}`} />
        <span className="text-[10px] uppercase tracking-widest text-muted-foreground">
          Portfolio representation
        </span>
      </div>
    </div>
  )
}

function CaseStudyBlock({ label, children }) {
  return (
    <div className="grid md:grid-cols-[160px_1fr] gap-2 md:gap-8 py-4 border-t border-white/[0.05] first:border-t-0 first:pt-0">
      <div className="text-xs uppercase tracking-[0.16em] text-muted-foreground pt-0.5">{label}</div>
      <p className="text-sm md:text-[15px] leading-relaxed text-foreground/85">{children}</p>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay: index * 0.05 }}
      className="group rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
    >
      <div className="grid md:grid-cols-2 gap-0">
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2">
            <span className={`h-1.5 w-1.5 rounded-full ${project.dot}`} />
            <span className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              {project.tag}
            </span>
          </div>
          <h3 className="mt-4 text-2xl md:text-3xl font-semibold tracking-tight">{project.name}</h3>
          <p className="mt-3 text-muted-foreground text-[15px] leading-relaxed">{project.tagline}</p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.highlights.map((h) => (
              <Badge key={h} variant="secondary" className="rounded-md bg-white/[0.05] text-foreground/80 border border-white/[0.06] font-normal">
                {h}
              </Badge>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((s) => (
              <span
                key={s}
                className="inline-flex items-center rounded-md border border-white/[0.06] bg-white/[0.02] px-2 py-1 text-[11px] text-muted-foreground"
              >
                {s}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-6">
            <Button
              variant="outline"
              className="h-9 border-white/10 bg-white/[0.03] hover:bg-white/[0.06]"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
            >
              {open ? 'Hide case study' : 'Read case study'}
              <ChevronDown className={`ml-1.5 h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        </div>

        <div className="relative p-6 md:p-8 md:border-l border-white/[0.05] bg-gradient-to-br from-white/[0.02] to-transparent">
          <ProjectMock project={project} />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="case"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/[0.06] bg-black/20"
          >
            <div className="p-6 md:p-8">
              <CaseStudyBlock label="Overview">{project.sections.overview}</CaseStudyBlock>
              <CaseStudyBlock label="Problem">{project.sections.problem}</CaseStudyBlock>
              <CaseStudyBlock label="My role">{project.sections.role}</CaseStudyBlock>
              <CaseStudyBlock label="Architecture">{project.sections.architecture}</CaseStudyBlock>
              <CaseStudyBlock label="Challenges">{project.sections.challenges}</CaseStudyBlock>
              <CaseStudyBlock label="Solution">{project.sections.solution}</CaseStudyBlock>
              <CaseStudyBlock label="Performance">{project.sections.performance}</CaseStudyBlock>
              <CaseStudyBlock label="Business impact">{project.sections.impact}</CaseStudyBlock>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  )
}

function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Selected work"
          title="Enterprise products, read as engineering case studies."
          description="Each project below is a real product I've shipped. Expand any card for the architecture, trade-offs and outcomes."
        />

        <div className="space-y-6">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- CONTACT ------------------------------ */

function Contact() {
  const [copiedField, setCopiedField] = useState(null)
  const copyToClipboard = async (value, label, field) => {
    await navigator.clipboard.writeText(value)
    setCopiedField(field)
    toast.success(`${label} copied to clipboard`)
    setTimeout(() => setCopiedField(null), 2000)
  }

  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
              <span className="h-px w-8 bg-border" />
              Get in touch
            </div>
            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-balance">
              Let&rsquo;s build something worth shipping.
            </h2>
            <p className="mt-4 text-muted-foreground text-base md:text-lg text-balance">
              Open to Senior Frontend roles, product-focused teams and hard problems in
              React / Next.js. Fastest way to reach me is email.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-8"
          >
            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Email</div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <span className="text-lg md:text-xl font-medium tracking-tight break-all">{EMAIL}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(EMAIL, 'Email', 'email')}
                className="h-8 shrink-0 border-white/10 bg-white/[0.03]"
              >
                {copiedField === 'email' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="ml-1.5 text-xs">{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
              </Button>
            </div>

            <Separator className="my-5 bg-white/[0.06]" />

            <div className="text-xs uppercase tracking-[0.18em] text-muted-foreground">Phone</div>
            <div className="mt-2 flex items-center justify-between gap-4">
              <a href={`tel:${PHONE_RAW}`} className="text-lg md:text-xl font-medium tracking-tight hover:text-foreground transition-colors">
                {PHONE}
              </a>
              <Button
                size="sm"
                variant="outline"
                onClick={() => copyToClipboard(PHONE_RAW, 'Phone number', 'phone')}
                className="h-8 shrink-0 border-white/10 bg-white/[0.03]"
              >
                {copiedField === 'phone' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                <span className="ml-1.5 text-xs">{copiedField === 'phone' ? 'Copied' : 'Copy'}</span>
              </Button>
            </div>

            <Separator className="my-6 bg-white/[0.06]" />

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
             
              <Button asChild variant="outline" className="h-11 border-white/10 bg-white/[0.03]">
                <a href={`tel:${PHONE_RAW}`}>
                  <Phone className="mr-2 h-4 w-4" /> Call
                </a>
              </Button>
              <Button asChild variant="outline" className="h-11 border-white/10 bg-white/[0.03]">
                <a href="/Hemant_Jha_Resume.pdf" target="_blank" rel="noopener">
                  <Download className="mr-2 h-4 w-4" /> Resume
                </a>
              </Button>
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <a
                href="https://www.linkedin.com/in/hemant-jha-senior-frontend-developer/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Linkedin className="h-3.5 w-3.5" /> LinkedIn <ArrowUpRight className="h-3 w-3" />
              </a>
              <span className="text-white/20">·</span>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
              >
                <Github className="h-3.5 w-3.5" /> GitHub <ArrowUpRight className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* --------------------------------- FOOTER ------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-10">
      <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-md bg-gradient-to-br from-white to-white/70 text-black grid place-items-center font-semibold text-xs">
            H
          </span>
          <span>© {new Date().getFullYear()} Hemant Jha</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <Terminal className="h-3.5 w-3.5" />
          Built with Next.js · TypeScript · Tailwind
        </div>
      </div>
    </footer>
  )
}

/* ---------------------------------- APP --------------------------------- */

function App() {
  useEffect(() => {
    // no-op keep for future
  }, [])

  return (
    <main className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  )
}

export default App

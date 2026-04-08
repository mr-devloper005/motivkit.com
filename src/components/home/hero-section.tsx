"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Compass, ImageIcon, Search, Sparkles, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContentImage } from "@/components/shared/content-image";
import { SITE_CONFIG, type TaskConfig } from "@/lib/site-config";
import { siteContent } from "@/config/site.content";
import { SITE_THEME } from "@/config/site.theme";
import { cn } from "@/lib/utils";
import { HeroInlineNav } from "@/components/home/hero-inline-nav";

const FALLBACK_IMAGE = "/placeholder.svg?height=1400&width=2400";

const heroClasses = {
  'search-first': {
    section: 'border-b border-slate-200 bg-[linear-gradient(180deg,#edf5ff_0%,#f8fbff_42%,#ffffff_100%)] text-slate-950',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.18),transparent_26%),radial-gradient(circle_at_top_right,rgba(15,23,42,0.12),transparent_26%)]',
    grid: 'lg:grid-cols-[1.08fr_0.92fr]',
    card: 'border border-white/70 bg-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.12)]',
    title: 'text-slate-950',
    body: 'text-slate-600',
    badge: 'bg-slate-950 text-white',
    primary: 'bg-slate-950 text-white hover:bg-slate-800',
    secondary: 'border border-slate-200 bg-white text-slate-900 hover:bg-slate-100',
  },
  'spotlight-split': {
    section:
      'border-b border-[rgba(197,23,46,0.25)] bg-[linear-gradient(180deg,#080208_0%,#2d0f1c_28%,#4a102a_52%,#fff4ec_100%)] text-white',
    overlay:
      'bg-[linear-gradient(90deg,rgba(35,8,22,0.94)_0%,rgba(74,16,42,0.55)_38%,rgba(197,23,46,0.12)_72%,rgba(252,242,89,0.12)_100%)]',
    grid: 'lg:grid-cols-[1.12fr_0.88fr] lg:gap-x-14',
    card: 'border border-white/14 bg-[linear-gradient(145deg,rgba(255,255,255,0.12)_0%,rgba(255,255,255,0.04)_100%)] shadow-[0_28px_100px_rgba(74,16,42,0.5),inset_0_1px_0_rgba(255,255,255,0.12)] backdrop-blur-xl',
    title: 'text-white',
    body: 'text-[#fde8e8]/85',
    badge:
      'border border-[rgba(252,242,89,0.35)] bg-[#FCF259] text-[#4A102A] shadow-[0_8px_32px_rgba(252,242,89,0.25)]',
    primary:
      'bg-[#FCF259] text-[#4A102A] shadow-[0_12px_40px_rgba(252,242,89,0.35)] hover:bg-[#ebe04a] hover:shadow-[0_16px_48px_rgba(252,242,89,0.45)]',
    secondary: 'border border-white/25 bg-white/12 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:bg-white/18',
  },
  'gallery-mosaic': {
    section: 'border-b border-slate-800 bg-[linear-gradient(180deg,#07111f_0%,#0c172b_45%,#101c31_100%)] text-white',
    overlay: 'bg-[radial-gradient(circle_at_top_left,rgba(110,231,183,0.16),transparent_24%),radial-gradient(circle_at_bottom_right,rgba(99,102,241,0.16),transparent_26%)]',
    grid: 'lg:grid-cols-[0.95fr_1.05fr]',
    card: 'border border-white/10 bg-slate-900/65 shadow-[0_30px_110px_rgba(15,23,42,0.45)] backdrop-blur-xl',
    title: 'text-white',
    body: 'text-slate-300',
    badge: 'bg-[#8df0c8] text-[#07111f]',
    primary: 'bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    secondary: 'border border-white/18 bg-white/6 text-white hover:bg-white/12',
  },
  'catalog-promo': {
    section: 'border-b border-[rgba(66,74,42,0.14)] bg-[linear-gradient(180deg,#f6f6ee_0%,#f4f7df_35%,#ffffff_100%)] text-[#18210f]',
    overlay: 'bg-[radial-gradient(circle_at_top_right,rgba(163,230,53,0.16),transparent_22%),radial-gradient(circle_at_top_left,rgba(34,197,94,0.14),transparent_24%)]',
    grid: 'lg:grid-cols-[1.12fr_0.88fr]',
    card: 'border border-[#dce5c2] bg-white/90 shadow-[0_28px_80px_rgba(64,76,34,0.12)]',
    title: 'text-[#18210f]',
    body: 'text-[#5c684b]',
    badge: 'bg-[#18210f] text-[#ebf5d9]',
    primary: 'bg-[#18210f] text-[#ebf5d9] hover:bg-[#25331a]',
    secondary: 'border border-[#dce5c2] bg-white text-[#18210f] hover:bg-[#f4f7df]',
  },
} as const;

const heroMotion = {
  container: { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.06 } } },
  item: { hidden: { opacity: 0, y: 18 }, visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } },
};

export function HeroSection({ images, tasks }: { images: string[]; tasks: TaskConfig[] }) {
  const slides = useMemo(() => {
    const valid = images.filter(Boolean);
    return valid.length ? valid.slice(0, 4) : [FALLBACK_IMAGE];
  }, [images]);

  const [activeIndex, setActiveIndex] = useState(0);
  const primaryTask = tasks.find((task) => task.key === SITE_THEME.home.primaryTask) || tasks[0];
  const featuredTasks = tasks.filter((task) => SITE_THEME.home.featuredTaskKeys.includes(task.key)).slice(0, 3);
  const palette = heroClasses[SITE_THEME.hero.variant];
  const isSpotlight = SITE_THEME.hero.variant === "spotlight-split";
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [slides]);

  const LeftCol = (
    <div className="max-w-3xl">
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.24em]",
          palette.badge,
        )}
      >
        <Sparkles className="h-3.5 w-3.5" />
        {SITE_THEME.hero.eyebrow}
      </div>
      <h1
        className={cn(
          "mt-6 font-semibold tracking-[-0.06em] sm:text-6xl",
          isSpotlight ? "text-5xl sm:text-6xl lg:text-[3.35rem] lg:leading-[1.08]" : "text-5xl sm:text-6xl",
          palette.title,
        )}
      >
        {siteContent.hero.title[0]}{" "}
        <span
          className={cn(
            "mt-1 block sm:mt-0 sm:inline",
            isSpotlight
              ? "bg-gradient-to-r from-white via-[#fff5f5] to-[#FCF259] bg-clip-text text-transparent"
              : "opacity-90",
          )}
        >
          {siteContent.hero.title[1]}
        </span>
      </h1>
      <p className={cn("mt-6 max-w-2xl text-base leading-8 sm:text-lg", palette.body)}>{siteContent.hero.description}</p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg" className={cn("rounded-full px-7", palette.primary)}>
          <Link href={siteContent.hero.primaryCta.href}>
            {siteContent.hero.primaryCta.label}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className={cn("rounded-full px-7", palette.secondary)}>
          <Link href={siteContent.hero.secondaryCta.href}>{siteContent.hero.secondaryCta.label}</Link>
        </Button>
      </div>

      <div className="mt-10 grid max-w-2xl gap-3 sm:grid-cols-[1.1fr_0.9fr]">
        <div className={cn("flex items-center gap-3 rounded-[1.6rem] p-4", palette.card)}>
          <div
            className={cn(
              "rounded-full p-3",
              isSpotlight ? "bg-white/12 text-[#FCF259] shadow-[0_0_24px_rgba(252,242,89,0.15)]" : "bg-white/10 text-current",
            )}
          >
            <Search className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Primary task</p>
            <p className="mt-1 text-lg font-semibold">{primaryTask?.label || SITE_CONFIG.name}</p>
            <p className="mt-1 text-sm opacity-75">{primaryTask?.description}</p>
          </div>
        </div>
        <div className={cn("flex items-center gap-3 rounded-[1.6rem] p-4", palette.card)}>
          <div
            className={cn(
              "rounded-full p-3",
              isSpotlight ? "bg-white/12 text-[#FCF259] shadow-[0_0_24px_rgba(252,242,89,0.15)]" : "bg-white/10 text-current",
            )}
          >
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] opacity-70">Explore flow</p>
            <p className="mt-1 text-lg font-semibold">{featuredTasks.length} highlighted surfaces</p>
            <p className="mt-1 text-sm opacity-75">Built for discovery without repeating the same layout rhythm.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const RightCol = (
    <div className="space-y-5">
      <div
        className={cn(
          "relative overflow-hidden rounded-[2rem] p-1 sm:p-1.5",
          isSpotlight &&
            "shadow-[0_0_0_1px_rgba(252,242,89,0.12),0_24px_80px_rgba(74,16,42,0.35)] ring-1 ring-white/10",
        )}
      >
        <div className={cn("overflow-hidden rounded-[1.85rem] p-3 sm:p-5", palette.card)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="group relative min-h-[220px] overflow-hidden rounded-[1.5rem] sm:min-h-[300px]">
              <ContentImage
                src={slides[(activeIndex + 1) % slides.length] || slides[0]}
                alt={`Supporting visual from ${SITE_CONFIG.name}`}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                intrinsicWidth={1000}
                intrinsicHeight={1200}
              />
              {isSpotlight ? (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#1a0610]/50 to-transparent opacity-80" />
              ) : null}
            </div>
            <div className="flex flex-col justify-between gap-3">
              {featuredTasks.map((task, index) => (
                <div
                  key={task.key}
                  className={cn(
                    "rounded-[1.4rem] border p-4",
                    isSpotlight
                      ? "border-white/12 bg-[linear-gradient(180deg,rgba(0,0,0,0.2)_0%,rgba(0,0,0,0.35)_100%)] backdrop-blur-sm transition-colors hover:border-[rgba(252,242,89,0.25)]"
                      : "border-white/10 bg-black/10",
                  )}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p
                        className={cn(
                          "text-[10px] font-semibold uppercase tracking-[0.24em]",
                          isSpotlight ? "text-[#FCF259]/80" : "opacity-65",
                        )}
                      >
                        Lane {index + 1}
                      </p>
                      <p className="mt-2 text-lg font-semibold sm:text-xl">{task.label}</p>
                    </div>
                    <Star className={cn("h-4 w-4 shrink-0", isSpotlight ? "text-[#FCF259]/70" : "opacity-70")} />
                  </div>
                  <p className="mt-3 text-sm leading-6 opacity-75">{task.description}</p>
                  <Link
                    href={task.route}
                    className={cn(
                      "mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4",
                      isSpotlight
                        ? "text-[#FCF259] decoration-[#FCF259]/40 transition-colors hover:text-white hover:decoration-white/60"
                        : "opacity-90",
                    )}
                  >
                    Open section
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {slides.length > 1 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p
            className={cn(
              "flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em]",
              isSpotlight ? "text-white/45" : "text-muted-foreground",
            )}
          >
            <ImageIcon className="h-3.5 w-3.5" aria-hidden />
            Cover rotation
          </p>
          <div className="flex items-center gap-2" role="tablist" aria-label="Hero image slides">
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show slide ${index + 1} of ${slides.length}`}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  "h-2.5 rounded-full transition-all duration-300",
                  index === activeIndex
                    ? isSpotlight
                      ? "w-10 bg-[#FCF259] shadow-[0_0_16px_rgba(252,242,89,0.45)]"
                      : "w-10 bg-primary"
                    : isSpotlight
                      ? "w-2.5 bg-white/25 hover:bg-white/40"
                      : "w-2.5 bg-current/30 hover:bg-current/45",
                )}
              />
            ))}
            <span
              className={cn(
                "ml-1 min-w-[3.25rem] text-right text-xs tabular-nums",
                isSpotlight ? "text-white/50" : "text-muted-foreground",
              )}
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      ) : null}
    </div>
  );

  return (
    <section className={cn("relative overflow-hidden", palette.section)}>
      {isSpotlight ? (
        <>
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(252,242,89,0.12),transparent_55%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(197,23,46,0.15),transparent_45%)]" />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
        </>
      ) : null}

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={
            reduceMotion || !isSpotlight
              ? {}
              : { scale: [1, 1.04] }
          }
          transition={
            reduceMotion || !isSpotlight
              ? {}
              : { duration: 22, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }
          }
        >
          <ContentImage
            key={slides[activeIndex]}
            src={slides[activeIndex]}
            alt={`Featured visual ${activeIndex + 1} from ${SITE_CONFIG.name}`}
            fill
            priority
            sizes="100vw"
            className={cn("object-cover", isSpotlight ? "opacity-[0.42]" : "opacity-35")}
            intrinsicWidth={1600}
            intrinsicHeight={900}
          />
        </motion.div>
      </div>
      <div className={cn("absolute inset-0", palette.overlay)} />
      {isSpotlight ? (
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-px bg-gradient-to-r from-transparent via-[#FCF259]/40 to-transparent" />
      ) : null}

      <div className="relative z-[2] mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
        {isSpotlight ? <HeroInlineNav className="mb-10 lg:mb-12" /> : null}
        {isSpotlight && !reduceMotion ? (
          <motion.div
            className={cn("grid items-center gap-12 lg:gap-16", palette.grid)}
            initial="hidden"
            animate="visible"
            variants={heroMotion.container}
          >
            <motion.div variants={heroMotion.item}>{LeftCol}</motion.div>
            <motion.div variants={heroMotion.item}>{RightCol}</motion.div>
          </motion.div>
        ) : (
          <div className={cn("grid items-center gap-12", palette.grid)}>
            {LeftCol}
            {RightCol}
          </div>
        )}
      </div>
    </section>
  );
}

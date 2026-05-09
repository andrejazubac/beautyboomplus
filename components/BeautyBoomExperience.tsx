"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  CalendarHeart,
  Instagram,
  MapPin,
  Sparkles,
  Star,
  Wand2
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const services = [
  "Hair styling",
  "Makeup",
  "Brows & lashes",
  "Facial rituals",
  "Nails",
  "Beauty prep"
];

const gallery = ["Glow", "Contour", "Polish", "Ritual", "Silk", "Bloom"];

const testimonials = [
  "A place that feels private, polished and very feminine. Every detail feels considered.",
  "Beauty Boom Plus made my appointment feel like a full editorial transformation.",
  "Tijana has that rare calm precision. You leave feeling expensive."
];

const panelIds = [
  "top",
  "transformations",
  "services",
  "studio",
  "gallery",
  "blowdry",
  "testimonials",
  "experience",
  "booking",
  "contact"
];

function Reveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ duration: 0.9, delay, ease: [0.19, 1, 0.22, 1] }}
    >
      {children}
    </motion.div>
  );
}

function CinematicHeading({
  as = "h2",
  text,
  className = ""
}: {
  as?: "h1" | "h2";
  text: string;
  className?: string;
}) {
  const Tag = as;
  const words = text.split(" ");

  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          aria-hidden="true"
          className="inline-block overflow-hidden align-baseline"
        >
          <motion.span
            className="inline-block pr-[0.18em]"
            initial={{ y: "112%", opacity: 0, rotate: 1.4, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, rotate: 0, filter: "blur(0px)" }}
            transition={{
              duration: 0.95,
              delay: index * 0.055,
              ease: [0.19, 1, 0.22, 1]
            }}
          >
            {word}
          </motion.span>
        </motion.span>
      ))}
    </Tag>
  );
}

export default function BeautyBoomExperience() {
  const [activePanel, setActivePanel] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const animationFrame = useRef<number | null>(null);

  const goToPanel = useCallback(
    (index: number) => {
      const nextIndex = Math.max(0, Math.min(panelIds.length - 1, index));

      if (!isDesktop) {
        document.getElementById(panelIds[nextIndex])?.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
        return;
      }

      setActivePanel(nextIndex);
      targetScroll.current = nextIndex * window.innerWidth;
      document.getElementById(panelIds[nextIndex])?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
    },
    [isDesktop]
  );

  useEffect(() => {
    const media = window.matchMedia("(min-width: 901px)");

    const updateMode = () => {
      setIsDesktop(media.matches);
      document.documentElement.classList.toggle("desktop-experience", media.matches);
      document.body.classList.toggle("desktop-experience", media.matches);
    };

    updateMode();
    media.addEventListener("change", updateMode);

    return () => {
      media.removeEventListener("change", updateMode);
      document.documentElement.classList.remove("desktop-experience");
      document.body.classList.remove("desktop-experience");
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, []);

  const changePanel = useCallback((direction: 1 | -1) => {
    setActivePanel((current) => {
      const nextIndex = Math.max(0, Math.min(panelIds.length - 1, current + direction));
      targetScroll.current = nextIndex * window.innerWidth;
      document.getElementById(panelIds[nextIndex])?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "start"
      });
      return nextIndex;
    });
  }, []);

  useEffect(() => {
    if (!isDesktop) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        changePanel(1);
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        changePanel(-1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [changePanel, isDesktop]);

  const handleWheel = (event: React.WheelEvent<HTMLElement>) => {
    if (!isDesktop || !trackRef.current) {
      return;
    }

    event.preventDefault();
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

    if (Math.abs(delta) < 6) {
      return;
    }

    const track = trackRef.current;
    const maxScroll = track.scrollWidth - track.clientWidth;
    targetScroll.current = Math.max(
      0,
      Math.min(maxScroll, targetScroll.current + delta * 0.95)
    );

    if (animationFrame.current) {
      return;
    }

    const glide = () => {
      if (!trackRef.current) {
        animationFrame.current = null;
        return;
      }

      const current = trackRef.current.scrollLeft;
      const next = current + (targetScroll.current - current) * 0.11;
      trackRef.current.scrollLeft = Math.abs(targetScroll.current - next) < 0.35
        ? targetScroll.current
        : next;

      if (Math.abs(targetScroll.current - trackRef.current.scrollLeft) > 0.35) {
        animationFrame.current = requestAnimationFrame(glide);
      } else {
        animationFrame.current = null;
      }
    };

    animationFrame.current = requestAnimationFrame(glide);
  };

  const handleTrackScroll = () => {
    if (!isDesktop || !trackRef.current) {
      return;
    }

    const maxScroll = trackRef.current.scrollWidth - trackRef.current.clientWidth;
    const progress = maxScroll > 0 ? trackRef.current.scrollLeft / maxScroll : 0;

    if (!animationFrame.current) {
      targetScroll.current = trackRef.current.scrollLeft;
    }

    setScrollProgress(progress);
    setActivePanel(Math.max(0, Math.min(panelIds.length - 1, Math.round(trackRef.current.scrollLeft / window.innerWidth))));
  };

  return (
    <main
      className="relative overflow-hidden md:h-screen"
      onWheel={handleWheel}
    >
      <ParallaxSalonLayer progress={scrollProgress} />
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-[11px] uppercase tracking-[0.34em] text-pearl/72 md:px-10">
        <button onClick={() => goToPanel(0)} className="font-semibold text-pearl">
          Beauty Boom Plus
        </button>
        <div className="hidden gap-8 md:flex">
          <button onClick={() => goToPanel(1)}>Signature transformations</button>
          <button onClick={() => goToPanel(2)}>Services</button>
          <button onClick={() => goToPanel(3)}>Studio</button>
          <button onClick={() => goToPanel(8)}>Booking</button>
        </div>
      </nav>

      <section className="relative md:h-screen">
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="horizontal-track h-screen overflow-x-auto overflow-y-hidden max-[900px]:h-auto max-[900px]:overflow-visible"
        >
          <motion.div
            className="flex h-screen w-[960vw] max-[900px]:block max-[900px]:h-auto max-[900px]:w-full max-[900px]:!transform-none"
          >
            <HeroPanel onBook={() => goToPanel(8)} />
            <TransformationsPanel />
            <ServicesPanel />
            <StudioPanel />
            <GalleryPanel />
            <BlowdryRevealPanel />
            <TestimonialsPanel />
            <ExperiencePanel />
            <BookingPanel />
            <FooterPanel />
          </motion.div>
        </div>
        <div className="fixed bottom-7 left-10 z-50 hidden items-center gap-5 text-[11px] uppercase tracking-[0.28em] text-pearl/48 md:flex">
          <span>{String(activePanel + 1).padStart(2, "0")}</span>
          <div className="h-px w-24 overflow-hidden bg-pearl/16">
            <motion.div
              className="h-full bg-rose"
              animate={{ width: `${((activePanel + 1) / panelIds.length) * 100}%` }}
              transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            />
          </div>
          <span>{String(panelIds.length).padStart(2, "0")}</span>
        </div>
      </section>
    </main>
  );
}

function ParallaxSalonLayer({ progress }: { progress: number }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block">
      <motion.div
        className="absolute right-[8vw] top-[13vh] h-[72vh] w-[30vw] overflow-hidden opacity-80"
        animate={{
          x: `${-progress * 18}vw`,
          y: `${Math.sin(progress * Math.PI) * 2}vh`
        }}
        transition={{ duration: 0.25, ease: "linear" }}
      >
        <Image
          src="/beauty-boom-blowdry.png"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,7,18,0.7),rgba(17,7,18,0.08)_45%,rgba(17,7,18,0.76))]" />
      </motion.div>
      <motion.div
        className="absolute left-[8vw] top-[22vh] h-72 w-72 rounded-full bg-rose/16 blur-3xl"
        animate={{ x: `${progress * 20}vw`, opacity: 0.32 + progress * 0.2 }}
        transition={{ duration: 0.25, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-[12vh] right-[22vw] h-96 w-96 rounded-full bg-lilac/12 blur-3xl"
        animate={{ x: `${-progress * 28}vw` }}
        transition={{ duration: 0.25, ease: "linear" }}
      />
    </div>
  );
}

function HeroPanel({ onBook }: { onBook: () => void }) {
  return (
    <section id="top" className="panel">
      <Image
        src="/beauty-boom-campaign.png"
        alt="Cinematic Beauty Boom Plus beauty editorial campaign"
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_35%,rgba(243,161,200,0.08),transparent_24rem),linear-gradient(90deg,rgba(12,4,14,0.96),rgba(25,7,28,0.58)_42%,rgba(17,7,18,0.1)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 flex min-h-screen items-end px-5 pb-12 pt-28 md:px-10 md:pb-16">
        <div className="max-w-[78rem]">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.42em] text-rose">
              <Sparkles size={15} /> Novi Sad beauty studio
            </p>
            <CinematicHeading
              as="h1"
              text="Beauty Boom Plus"
              className="serif max-w-6xl text-balance text-[18vw] font-light leading-[0.78] tracking-normal text-pearl md:text-[12vw]"
            />
            <Reveal delay={0.18} className="mt-8 grid max-w-5xl gap-7 md:grid-cols-[1.1fr_.8fr] md:items-end">
              <p className="max-w-2xl text-lg leading-8 text-pearl/76 md:text-xl">
                A glossy, feminine beauty destination by Tijana Marković,
                designed for transformations that feel cinematic, intimate and
                unmistakably premium.
              </p>
              <button
                onClick={onBook}
                className="group inline-flex w-fit items-center gap-4 rounded-full border border-rose/35 bg-pearl/10 px-6 py-4 text-sm uppercase tracking-[0.24em] text-pearl shadow-bloom backdrop-blur-2xl transition hover:border-rose hover:bg-rose/20"
              >
                Book the glow
                <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
              </button>
            </Reveal>
          </Reveal>
        </div>
      </div>
      <p className="absolute bottom-7 right-6 z-20 hidden text-xs uppercase tracking-[0.34em] text-pearl/50 md:block">
        Scroll sideways
      </p>
    </section>
  );
}

function TransformationsPanel() {
  return (
    <section id="transformations" className="panel bg-[linear-gradient(135deg,#160817,#37113a_55%,#130611)] px-5 py-24 md:px-14">
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle,rgba(243,161,200,0.24),transparent_28rem)]" />
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.42em] text-lilac">Signature transformations</span>
          <CinematicHeading
            text="Soft glamour, sharpened by precision."
            className="serif mt-6 max-w-3xl text-6xl font-light leading-[0.88] text-pearl md:text-8xl"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-4 md:grid-cols-3">
            {["Radiant skin", "Sculpted eyes", "Polished finish"].map((item, index) => (
              <motion.div
                key={item}
                className="glass-line min-h-80 p-7 transition hover:-translate-y-2 hover:border-rose/36 hover:bg-pearl/10"
                initial={{ opacity: 0, y: 42, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.32 }}
                transition={{ duration: 0.78, delay: index * 0.09, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="serif text-7xl text-rose/70">0{index + 1}</span>
                <h3 className="mt-14 text-2xl font-medium text-pearl">{item}</h3>
                <p className="mt-4 leading-7 text-pearl/62">
                  Editorial beauty language translated into wearable confidence
                  for events, everyday rituals and personal reinvention.
                </p>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function ServicesPanel() {
  return (
    <section id="services" className="panel px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[1fr_.95fr]">
        <Reveal>
          <CinematicHeading
            text="Beauty services with a campaign-level finish."
            className="serif text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-8 text-pearl/68">
            A focused menu for women who want the experience to feel calm, the
            result to feel polished, and the atmosphere to feel quietly rare.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-pearl/12 border-y border-pearl/12">
            {services.map((service, index) => (
              <motion.div
                key={service}
                className="group flex items-center justify-between py-6"
                initial={{ opacity: 0, x: 44 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.72, delay: index * 0.055, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="serif text-4xl text-pearl transition group-hover:text-rose">{service}</span>
                <Wand2 className="text-lilac/70 transition group-hover:rotate-12 group-hover:text-rose" />
              </motion.div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StudioPanel() {
  return (
    <section id="studio" className="panel bg-[#170817] px-5 py-24 md:px-14">
      <div className="absolute inset-8 border border-pearl/10" />
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <motion.div
            className="glass-line max-w-md p-8"
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.38em] text-rose">Owner</p>
            <h2 className="serif mt-5 text-6xl font-light text-pearl">Tijana Marković</h2>
            <p className="mt-7 leading-8 text-pearl/68">
              The studio is led with a refined eye for proportion, glow and
              feminine confidence. The feeling is personal, elevated and never
              rushed.
            </p>
          </motion.div>
        </Reveal>
        <Reveal delay={0.1}>
          <motion.div
            className="relative h-[62vh] min-h-96 overflow-hidden"
            initial={{ opacity: 0, clipPath: "inset(8% 12% 8% 12%)" }}
            whileInView={{ opacity: 1, clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: false, amount: 0.36 }}
            transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          >
            <Image
              src="/beauty-boom-campaign.png"
              alt="Beauty Boom Plus glossy studio mood"
              fill
              className="object-cover object-right"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,8,23,0.14),rgba(23,8,23,0.72))]" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-pearl/16 pt-5 text-xs uppercase tracking-[0.32em] text-pearl/66">
              <span>Private beauty studio</span>
              <span>Novi Sad</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPanel() {
  return (
    <section className="panel px-5 py-24 md:px-14">
      <div className="relative min-h-[calc(100vh-12rem)]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <CinematicHeading
              text="The feed should feel like a beauty magazine."
              className="serif max-w-4xl text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
            />
            <a href="https://www.instagram.com/" className="inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.28em] text-rose">
              <Instagram size={18} /> Instagram
            </a>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          {gallery.map((item, index) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.22 }}
              transition={{ delay: index * 0.05, duration: 0.7 }}
              className="group relative aspect-[3/4] overflow-hidden bg-plum"
            >
              <Image
                src="/beauty-boom-campaign.png"
                alt={`${item} beauty editorial tile`}
                fill
                className="object-cover transition duration-700 group-hover:scale-110"
                style={{ objectPosition: `${25 + index * 10}% center` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-rose/10" />
              <span className="absolute bottom-4 left-4 serif text-3xl text-pearl">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlowdryRevealPanel() {
  return (
    <section id="blowdry" className="reveal-gap relative h-screen flex-[0_0_60vw] overflow-hidden px-10 py-24 max-[900px]:hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
      <div className="relative z-10 flex h-full items-end justify-end">
        <div className="max-w-md border-r border-rose/28 pr-7 text-right">
          <p className="text-xs uppercase tracking-[0.42em] text-rose/80">
            Beauty in motion
          </p>
          <CinematicHeading
            text="Salon air, silk movement, rose light."
            className="serif mt-5 text-5xl font-light leading-[0.88] text-pearl md:text-7xl"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialsPanel() {
  return (
    <section className="panel bg-[linear-gradient(135deg,#260b29,#09030a)] px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-8 md:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.42em] text-lilac">Client notes</span>
          <CinematicHeading
            text="Quiet proof, glowing after."
            className="serif mt-6 text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
          />
        </Reveal>
        <div className="grid gap-5">
          {testimonials.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <motion.blockquote
                className="glass-line p-8"
                whileHover={{ x: -10, borderColor: "rgba(243, 161, 200, 0.36)" }}
                transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
              >
                <div className="mb-8 flex gap-2 text-rose">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="serif text-3xl leading-tight text-pearl md:text-5xl">"{quote}"</p>
              </motion.blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ExperiencePanel() {
  return (
    <section className="panel px-5 py-24 md:px-14">
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-3xl" />
      <div className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center text-center">
        <Reveal>
          <p className="mx-auto mb-8 max-w-xl text-xs uppercase tracking-[0.42em] text-rose">
            The luxury beauty experience
          </p>
          <CinematicHeading
            text="Come in for a service. Leave with a different posture."
            className="serif mx-auto max-w-6xl text-7xl font-light leading-[0.84] text-pearl md:text-[9rem]"
          />
          <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-pearl/66">
            The space is atmospheric, the pace is composed, and every detail is
            shaped around the feeling of being beautifully taken care of.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BookingPanel() {
  return (
    <section id="booking" className="panel bg-[#100610] px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <CinematicHeading
            text="Reserve your glow."
            className="serif text-7xl font-light leading-[0.85] text-pearl md:text-9xl"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <motion.div
            className="glass-line p-8 md:p-10"
            initial={{ opacity: 0, y: 34, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.4 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-lg leading-8 text-pearl/72">
              Book a private appointment at Beauty Boom Plus in Novi Sad and
              step into a softer, more polished version of your beauty ritual.
            </p>
            <div className="mt-10 grid gap-4">
              <a className="group flex items-center justify-between rounded-full bg-pearl px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-rose" href="tel:+381000000000">
                <span className="flex items-center gap-3"><CalendarHeart size={18} /> Book appointment</span>
                <ArrowUpRight size={18} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a className="flex items-center gap-3 rounded-full border border-pearl/14 px-6 py-5 text-sm uppercase tracking-[0.24em] text-pearl/76 transition hover:border-rose hover:text-rose" href="https://maps.google.com/?q=Novi%20Sad%20Serbia">
                <MapPin size={18} /> Novi Sad, Serbia
              </a>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function FooterPanel() {
  return (
    <footer id="contact" className="panel bg-[linear-gradient(135deg,#090309,#2b0d2f)] px-5 py-24 md:px-14">
      <div className="relative flex min-h-[calc(100vh-12rem)] flex-col justify-between">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-lilac">Beauty Boom Plus</p>
          <CinematicHeading
            text="Feminine beauty, made cinematic."
            className="serif mt-8 max-w-5xl text-7xl font-light leading-[0.84] text-pearl md:text-[10rem]"
          />
        </Reveal>
        <div className="mt-16 grid gap-6 border-t border-pearl/12 pt-8 text-sm uppercase tracking-[0.24em] text-pearl/60 md:grid-cols-4">
          <span>Owner: Tijana Marković</span>
          <span>Novi Sad, Serbia</span>
          <span>Instagram-ready glow</span>
          <span className="md:text-right">Appointments only</span>
        </div>
      </div>
    </footer>
  );
}

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
  "testimonials",
  "experience",
  "booking",
  "contact"
];

function Reveal({
  children
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <div>{children}</div>;
}

export default function BeautyBoomExperience() {
  const [activePanel, setActivePanel] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

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
      trackRef.current?.scrollTo({
        left: nextIndex * window.innerWidth,
        behavior: "smooth"
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

  const changePanel = useCallback((direction: 1 | -1) => {
    setActivePanel((current) => {
      const nextIndex = Math.max(0, Math.min(panelIds.length - 1, current + direction));
      trackRef.current?.scrollTo({
        left: nextIndex * window.innerWidth,
        behavior: "smooth"
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
    if (!isDesktop) {
      return;
    }

    event.preventDefault();
    const delta = Math.abs(event.deltaY) > Math.abs(event.deltaX) ? event.deltaY : event.deltaX;

    if (Math.abs(delta) < 6) {
      return;
    }

    trackRef.current?.scrollBy({
      left: delta * 1.25,
      behavior: "smooth"
    });
  };

  const handleTrackScroll = () => {
    if (!isDesktop || !trackRef.current) {
      return;
    }

    setActivePanel(Math.round(trackRef.current.scrollLeft / window.innerWidth));
  };

  return (
    <main
      className="relative overflow-hidden md:h-screen"
      onWheel={handleWheel}
    >
      <div className="noise" />
      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 py-5 text-[11px] uppercase tracking-[0.34em] text-pearl/72 md:px-10">
        <button onClick={() => goToPanel(0)} className="font-semibold text-pearl">
          Beauty Boom Plus
        </button>
        <div className="hidden gap-8 md:flex">
          <button onClick={() => goToPanel(1)}>Signature transformations</button>
          <button onClick={() => goToPanel(2)}>Services</button>
          <button onClick={() => goToPanel(3)}>Studio</button>
          <button onClick={() => goToPanel(7)}>Booking</button>
        </div>
      </nav>

      <section className="relative md:h-screen">
        <div
          ref={trackRef}
          onScroll={handleTrackScroll}
          className="horizontal-track h-screen overflow-x-auto overflow-y-hidden scroll-smooth md:snap-x md:snap-mandatory max-[900px]:h-auto max-[900px]:overflow-visible"
        >
          <motion.div
            className="flex h-screen w-[900vw] will-change-transform max-[900px]:block max-[900px]:h-auto max-[900px]:w-full max-[900px]:!transform-none"
          >
            <HeroPanel onBook={() => goToPanel(7)} />
            <TransformationsPanel />
            <ServicesPanel />
            <StudioPanel />
            <GalleryPanel />
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
            <h1 className="serif max-w-6xl text-balance text-[18vw] font-light leading-[0.78] tracking-normal text-pearl md:text-[12vw]">
              Beauty Boom Plus
            </h1>
            <div className="mt-8 grid max-w-5xl gap-7 md:grid-cols-[1.1fr_.8fr] md:items-end">
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
            </div>
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
          <h2 className="serif mt-6 max-w-3xl text-6xl font-light leading-[0.88] text-pearl md:text-8xl">
            Soft glamour, sharpened by precision.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-4 md:grid-cols-3">
            {["Radiant skin", "Sculpted eyes", "Polished finish"].map((item, index) => (
              <div key={item} className="glass-line min-h-80 p-7">
                <span className="serif text-7xl text-rose/70">0{index + 1}</span>
                <h3 className="mt-14 text-2xl font-medium text-pearl">{item}</h3>
                <p className="mt-4 leading-7 text-pearl/62">
                  Editorial beauty language translated into wearable confidence
                  for events, everyday rituals and personal reinvention.
                </p>
              </div>
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
          <h2 className="serif text-6xl font-light leading-[0.9] text-pearl md:text-8xl">
            Beauty services with a campaign-level finish.
          </h2>
          <p className="mt-8 max-w-xl text-lg leading-8 text-pearl/68">
            A focused menu for women who want the experience to feel calm, the
            result to feel polished, and the atmosphere to feel quietly rare.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-pearl/12 border-y border-pearl/12">
            {services.map((service) => (
              <div key={service} className="group flex items-center justify-between py-6">
                <span className="serif text-4xl text-pearl transition group-hover:text-rose">{service}</span>
                <Wand2 className="text-lilac/70 transition group-hover:rotate-12 group-hover:text-rose" />
              </div>
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
          <div className="glass-line max-w-md p-8">
            <p className="text-xs uppercase tracking-[0.38em] text-rose">Owner</p>
            <h2 className="serif mt-5 text-6xl font-light text-pearl">Tijana Marković</h2>
            <p className="mt-7 leading-8 text-pearl/68">
              The studio is led with a refined eye for proportion, glow and
              feminine confidence. The feeling is personal, elevated and never
              rushed.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative h-[62vh] min-h-96 overflow-hidden">
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
          </div>
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
            <h2 className="serif max-w-4xl text-6xl font-light leading-[0.9] text-pearl md:text-8xl">
              The feed should feel like a beauty magazine.
            </h2>
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
              animate={{ opacity: 1, y: 0 }}
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

function TestimonialsPanel() {
  return (
    <section className="panel bg-[linear-gradient(135deg,#260b29,#09030a)] px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-8 md:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.42em] text-lilac">Client notes</span>
          <h2 className="serif mt-6 text-6xl font-light leading-[0.9] text-pearl md:text-8xl">
            Quiet proof, glowing after.
          </h2>
        </Reveal>
        <div className="grid gap-5">
          {testimonials.map((quote, index) => (
            <Reveal key={quote} delay={index * 0.08}>
              <blockquote className="glass-line p-8">
                <div className="mb-8 flex gap-2 text-rose">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star key={starIndex} size={15} fill="currentColor" />
                  ))}
                </div>
                <p className="serif text-3xl leading-tight text-pearl md:text-5xl">"{quote}"</p>
              </blockquote>
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
          <h2 className="serif mx-auto max-w-6xl text-7xl font-light leading-[0.84] text-pearl md:text-[9rem]">
            Come in for a service. Leave with a different posture.
          </h2>
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
          <h2 className="serif text-7xl font-light leading-[0.85] text-pearl md:text-9xl">
            Reserve your glow.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div className="glass-line p-8 md:p-10">
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
          </div>
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
          <h2 className="serif mt-8 max-w-5xl text-7xl font-light leading-[0.84] text-pearl md:text-[10rem]">
            Feminine beauty, made cinematic.
          </h2>
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

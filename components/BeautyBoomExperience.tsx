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
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";

const translations = {
  sr: {
    languageLabel: "SR",
    languageSwitch: "EN",
    themeLabel: "Tema",
    themeDark: "Tamna",
    themeLight: "Svetla",
    nav: {
      transformations: "Transformacije",
      services: "Usluge",
      studio: "Studio",
      booking: "Zakazivanje"
    },
    hero: {
      eyebrow: "Studio lepote u Novom Sadu",
      title: "Beauty Boom Plus",
      body: "Sofisticirana, ženstvena destinacija lepote koju vodi Tijana Marković, osmišljena za transformacije koje deluju filmski, intimno i istinski luksuzno.",
      cta: "Zakaži tretman",
      scroll: "Pomeraj u stranu"
    },
    transformations: {
      eyebrow: "Prepoznatljive transformacije",
      title: "Meki glamur, oblikovan preciznošću.",
      items: [
        {
          title: "Blještav ten",
          body: "Estetika modnog editorijala prevedena u nosivo samopouzdanje za događaje, svakodnevne rituale i ličnu promenu."
        },
        {
          title: "Oblikovan pogled",
          body: "Preciznost, dubina i mekani glamur koji naglašava lice bez osećaja težine."
        },
        {
          title: "Uglancana završnica",
          body: "Završni detalj koji izgleda luksuzno, smireno i spremno za kameru."
        }
      ]
    },
    services: {
      title: "Usluge lepote sa završnicom dostojnom kampanje.",
      body: "Pažljivo odabran meni za žene koje žele mirno iskustvo, uglađen rezultat i atmosferu tihog luksuza.",
      items: ["Frizura i feniranje", "Šminkanje", "Obrve i trepavice", "Rituali za lice", "Nokti", "Priprema za događaje"]
    },
    studio: {
      eyebrow: "Vlasnica",
      owner: "Tijana Marković",
      body: "Studio vodi istančan osećaj za proporciju, sjaj i ženstveno samopouzdanje. Iskustvo je lično, uzvišeno i nikada užurbano.",
      captionLeft: "Privatni studio lepote",
      captionRight: "Novi Sad"
    },
    gallery: {
      title: "Objave treba da deluju kao magazin lepote.",
      instagram: "Instagram",
      items: [
        {
          label: "Pramenovi",
          context: "Meki prelazi i dimenzija kose",
          image: "/beauty-boom-blowdry.png",
          position: "42% center"
        },
        {
          label: "Boja",
          context: "Sjajna nijansa i salonska završnica",
          image: "/beauty-boom-campaign.png",
          position: "34% center"
        },
        {
          label: "Feniranje",
          context: "Pokret, volumen i uredna forma",
          image: "/beauty-boom-blowdry.png",
          position: "58% center"
        },
        {
          label: "Sjaj",
          context: "Zdrav izgled i uglađena tekstura",
          image: "/beauty-boom-campaign.png",
          position: "52% center"
        },
        {
          label: "Šminka",
          context: "Mekani glamur za događaje",
          image: "/beauty-boom-campaign.png",
          position: "44% center"
        },
        {
          label: "Nega",
          context: "Rituali koji ostavljaju kosu svilenom",
          image: "/beauty-boom-blowdry.png",
          position: "68% center"
        }
      ]
    },
    blowdry: {
      eyebrow: "Lepota u pokretu",
      title: "Salonski vazduh, pokret svile, ružičasta svetlost."
    },
    testimonials: {
      eyebrow: "Utisci klijentkinja",
      title: "Tihi dokaz, sjaj koji ostaje.",
      items: [
        "Mesto koje deluje privatno, uglađeno i veoma ženstveno. Svaki detalj je promišljen.",
        "Beauty Boom Plus je učinio da moj termin izgleda kao prava transformacija iz editorijala.",
        "Tijana ima retku smirenost i preciznost. Izlaziš sa osećajem da izgledaš luksuznije."
      ]
    },
    experience: {
      eyebrow: "Luksuzno iskustvo lepote",
      title: "Dođi na tretman. Izađi sa drugačijim držanjem.",
      body: "Prostor je atmosferičan, tempo je miran, a svaki detalj je oblikovan oko osećaja da je neko zaista preuzeo brigu o tvojoj lepoti."
    },
    booking: {
      title: "Rezerviši svoj sjaj.",
      body: "Zakaži privatni termin u Beauty Boom Plus u Novom Sadu i uđi u mekšu, uglađeniju verziju svog rituala lepote.",
      cta: "Zakaži termin",
      location: "Novi Sad, Srbija"
    },
    footer: {
      eyebrow: "Beauty Boom Plus",
      title: "Ženstvena lepota, oblikovana filmski.",
      owner: "Vlasnica: Tijana Marković",
      location: "Novi Sad, Srbija",
      glow: "Sjaj spreman za fotografiju",
      appointment: "Isključivo po zakazivanju"
    }
  },
  en: {
    languageLabel: "EN",
    languageSwitch: "SR",
    themeLabel: "Theme",
    themeDark: "Dark",
    themeLight: "Light",
    nav: {
      transformations: "Signature transformations",
      services: "Services",
      studio: "Studio",
      booking: "Booking"
    },
    hero: {
      eyebrow: "Novi Sad beauty studio",
      title: "Beauty Boom Plus",
      body: "A glossy, feminine beauty destination by Tijana Marković, designed for transformations that feel cinematic, intimate and unmistakably premium.",
      cta: "Book the glow",
      scroll: "Scroll sideways"
    },
    transformations: {
      eyebrow: "Signature transformations",
      title: "Soft glamour, sharpened by precision.",
      items: [
        {
          title: "Radiant skin",
          body: "Editorial beauty language translated into wearable confidence for events, everyday rituals and personal reinvention."
        },
        {
          title: "Sculpted eyes",
          body: "Precision, depth and soft glam that frames the face without feeling heavy."
        },
        {
          title: "Polished finish",
          body: "A final touch that feels expensive, composed and ready for the camera."
        }
      ]
    },
    services: {
      title: "Beauty services with a campaign-level finish.",
      body: "A focused menu for women who want the experience to feel calm, the result to feel polished, and the atmosphere to feel quietly rare.",
      items: ["Hair styling", "Makeup", "Brows & lashes", "Facial rituals", "Nails", "Beauty prep"]
    },
    studio: {
      eyebrow: "Owner",
      owner: "Tijana Marković",
      body: "The studio is led with a refined eye for proportion, glow and feminine confidence. The feeling is personal, elevated and never rushed.",
      captionLeft: "Private beauty studio",
      captionRight: "Novi Sad"
    },
    gallery: {
      title: "The feed should feel like a beauty magazine.",
      instagram: "Instagram",
      items: [
        {
          label: "Highlights",
          context: "Soft transitions and dimensional hair",
          image: "/beauty-boom-blowdry.png",
          position: "42% center"
        },
        {
          label: "Color",
          context: "Glossy tone and salon finish",
          image: "/beauty-boom-campaign.png",
          position: "34% center"
        },
        {
          label: "Blowout",
          context: "Movement, volume and polished shape",
          image: "/beauty-boom-blowdry.png",
          position: "58% center"
        },
        {
          label: "Glow",
          context: "Healthy shine and refined texture",
          image: "/beauty-boom-campaign.png",
          position: "52% center"
        },
        {
          label: "Makeup",
          context: "Soft glamour for special moments",
          image: "/beauty-boom-campaign.png",
          position: "44% center"
        },
        {
          label: "Care",
          context: "Rituals that leave hair feeling silky",
          image: "/beauty-boom-blowdry.png",
          position: "68% center"
        }
      ]
    },
    blowdry: {
      eyebrow: "Beauty in motion",
      title: "Salon air, silk movement, rose light."
    },
    testimonials: {
      eyebrow: "Client notes",
      title: "Quiet proof, glowing after.",
      items: [
        "A place that feels private, polished and very feminine. Every detail feels considered.",
        "Beauty Boom Plus made my appointment feel like a full editorial transformation.",
        "Tijana has that rare calm precision. You leave feeling expensive."
      ]
    },
    experience: {
      eyebrow: "The luxury beauty experience",
      title: "Come in for a service. Leave with a different posture.",
      body: "The space is atmospheric, the pace is composed, and every detail is shaped around the feeling of being beautifully taken care of."
    },
    booking: {
      title: "Reserve your glow.",
      body: "Book a private appointment at Beauty Boom Plus in Novi Sad and step into a softer, more polished version of your beauty ritual.",
      cta: "Book appointment",
      location: "Novi Sad, Serbia"
    },
    footer: {
      eyebrow: "Beauty Boom Plus",
      title: "Feminine beauty, made cinematic.",
      owner: "Owner: Tijana Marković",
      location: "Novi Sad, Serbia",
      glow: "Instagram-ready glow",
      appointment: "Appointments only"
    }
  }
} as const;

type Locale = keyof typeof translations;
type Copy = (typeof translations)[Locale];
const CopyContext = createContext<Copy>(translations.sr);
const useCopy = () => useContext(CopyContext);

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

const instagramUrl = "https://www.instagram.com/beauty_boom_plus/";

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
  const [locale, setLocale] = useState<Locale>("sr");
  const [activePanel, setActivePanel] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const targetScroll = useRef(0);
  const animationFrame = useRef<number | null>(null);
  const copy = translations[locale];

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
    const savedLocale = window.localStorage.getItem("beauty-boom-locale");

    if (savedLocale === "sr" || savedLocale === "en") {
      setLocale(savedLocale);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    window.localStorage.setItem("beauty-boom-locale", locale);
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.remove("theme-light");
    document.documentElement.classList.add("theme-dark");
  }, []);

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
    <CopyContext.Provider value={copy}>
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
            <button onClick={() => goToPanel(1)}>{copy.nav.transformations}</button>
            <button onClick={() => goToPanel(2)}>{copy.nav.services}</button>
            <button onClick={() => goToPanel(3)}>{copy.nav.studio}</button>
            <button onClick={() => goToPanel(8)}>{copy.nav.booking}</button>
            <button
              aria-label={`Switch language to ${copy.languageSwitch}`}
              aria-pressed={locale === "en"}
              className="text-rose"
              onClick={() => setLocale((current) => (current === "sr" ? "en" : "sr"))}
            >
              {copy.languageLabel}/{copy.languageSwitch}
            </button>
          </div>
          <div className="flex items-center gap-4 md:hidden">
            <button
              aria-label={`Switch language to ${copy.languageSwitch}`}
              aria-pressed={locale === "en"}
              className="text-rose"
              onClick={() => setLocale((current) => (current === "sr" ? "en" : "sr"))}
            >
              {copy.languageLabel}/{copy.languageSwitch}
            </button>
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
    </CopyContext.Provider>
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
        <div className="parallax-image-veil absolute inset-0" />
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
  const copy = useCopy();

  return (
    <section id="top" className="panel">
      <Image
        src="/beauty-boom-campaign.png"
        alt="Cinematic Beauty Boom Plus beauty editorial campaign"
        fill
        priority
        className="object-cover opacity-80"
      />
      <div className="hero-overlay absolute inset-0" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-10 flex min-h-screen items-end px-5 pb-12 pt-28 md:px-10 md:pb-16">
        <div className="max-w-[78rem]">
          <Reveal>
            <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.42em] text-rose">
              <Sparkles size={15} /> {copy.hero.eyebrow}
            </p>
            <CinematicHeading
              as="h1"
              text={copy.hero.title}
              className="serif max-w-6xl text-balance text-[18vw] font-light leading-[0.78] tracking-normal text-pearl md:text-[12vw]"
            />
            <Reveal delay={0.18} className="mt-8 grid max-w-5xl gap-7 md:grid-cols-[1.1fr_.8fr] md:items-end">
              <p className="max-w-2xl text-lg leading-8 text-pearl/76 md:text-xl">
                {copy.hero.body}
              </p>
              <button
                onClick={onBook}
                className="group inline-flex w-fit items-center gap-4 rounded-full border border-rose/35 bg-pearl/10 px-6 py-4 text-sm uppercase tracking-[0.24em] text-pearl shadow-bloom backdrop-blur-2xl transition hover:border-rose hover:bg-rose/20"
              >
                {copy.hero.cta}
                <ArrowUpRight className="transition group-hover:-translate-y-1 group-hover:translate-x-1" size={18} />
              </button>
            </Reveal>
          </Reveal>
        </div>
      </div>
      <p className="absolute bottom-7 right-6 z-20 hidden text-xs uppercase tracking-[0.34em] text-pearl/50 md:block">
        {copy.hero.scroll}
      </p>
    </section>
  );
}

function TransformationsPanel() {
  const copy = useCopy();

  return (
    <section id="transformations" className="panel panel-transformations px-5 py-24 md:px-14">
      <div className="transformation-glow absolute right-0 top-0 h-full w-1/2" />
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-10 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.42em] text-lilac">{copy.transformations.eyebrow}</span>
          <CinematicHeading
            text={copy.transformations.title}
            className="serif mt-6 max-w-3xl text-6xl font-light leading-[0.88] text-pearl md:text-8xl"
          />
        </Reveal>
        <Reveal delay={0.12}>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.transformations.items.map((item, index) => (
              <motion.div
                key={item.title}
                className="glass-line min-h-80 p-7 transition hover:-translate-y-2 hover:border-rose/36 hover:bg-pearl/10"
                initial={{ opacity: 0, y: 42, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.32 }}
                transition={{ duration: 0.78, delay: index * 0.09, ease: [0.19, 1, 0.22, 1] }}
              >
                <span className="serif text-7xl text-rose/70">0{index + 1}</span>
                <h3 className="mt-14 text-2xl font-medium text-pearl">{item.title}</h3>
                <p className="mt-4 leading-7 text-pearl/62">
                  {item.body}
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
  const copy = useCopy();

  return (
    <section id="services" className="panel px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[1fr_.95fr]">
        <Reveal>
          <CinematicHeading
            text={copy.services.title}
            className="serif text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
          />
          <p className="mt-8 max-w-xl text-lg leading-8 text-pearl/68">
            {copy.services.body}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="divide-y divide-pearl/12 border-y border-pearl/12">
            {copy.services.items.map((service, index) => (
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
  const copy = useCopy();

  return (
    <section id="studio" className="panel panel-studio px-5 py-24 md:px-14">
      <div className="absolute inset-8 border border-pearl/10" />
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
        <Reveal>
          <motion.div
            className="glass-line max-w-md p-8"
            whileHover={{ y: -8, scale: 1.015 }}
            transition={{ duration: 0.45, ease: [0.19, 1, 0.22, 1] }}
          >
            <p className="text-xs uppercase tracking-[0.38em] text-rose">{copy.studio.eyebrow}</p>
            <h2 className="serif mt-5 text-6xl font-light text-pearl">{copy.studio.owner}</h2>
            <p className="mt-7 leading-8 text-pearl/68">
              {copy.studio.body}
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
            <div className="studio-image-veil absolute inset-0" />
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between border-t border-pearl/16 pt-5 text-xs uppercase tracking-[0.32em] text-pearl/66">
              <span>{copy.studio.captionLeft}</span>
              <span>{copy.studio.captionRight}</span>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryPanel() {
  const copy = useCopy();

  return (
    <section className="panel px-5 py-24 md:px-14">
      <div className="relative min-h-[calc(100vh-12rem)]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <CinematicHeading
              text={copy.gallery.title}
              className="serif max-w-4xl text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
            />
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center gap-3 text-sm uppercase tracking-[0.28em] text-rose"
            >
              <Instagram size={18} /> {copy.gallery.instagram}
            </a>
          </div>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-6">
          {copy.gallery.items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.22 }}
              transition={{ delay: index * 0.05, duration: 0.7 }}
              className="group relative aspect-[3/4] overflow-hidden bg-plum"
            >
              <a
                href={instagramUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`${copy.gallery.instagram}: ${item.label}`}
                className="block h-full"
              >
                <Image
                  src={item.image}
                  alt={`${item.label} - Beauty Boom Plus Instagram primer`}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-110"
                  style={{ objectPosition: item.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/84 via-transparent to-rose/10" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="serif block text-3xl text-pearl">{item.label}</span>
                  <span className="mt-2 block text-[11px] uppercase leading-5 tracking-[0.22em] text-pearl/64">
                    {item.context}
                  </span>
                </div>
                <ArrowUpRight className="absolute right-4 top-4 text-pearl/60 transition group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-rose" size={18} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlowdryRevealPanel() {
  const copy = useCopy();

  return (
    <section id="blowdry" className="reveal-gap relative h-screen flex-[0_0_60vw] overflow-hidden px-10 py-24 max-[900px]:hidden">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-ink to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-ink to-transparent" />
      <div className="relative z-10 flex h-full items-end justify-end">
        <div className="max-w-md border-r border-rose/28 pr-7 text-right">
          <p className="text-xs uppercase tracking-[0.42em] text-rose/80">
            {copy.blowdry.eyebrow}
          </p>
          <CinematicHeading
            text={copy.blowdry.title}
            className="serif mt-5 text-5xl font-light leading-[0.88] text-pearl md:text-7xl"
          />
        </div>
      </div>
    </section>
  );
}

function TestimonialsPanel() {
  const copy = useCopy();

  return (
    <section className="panel panel-testimonials px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-8 md:grid-cols-[.7fr_1.3fr]">
        <Reveal>
          <span className="text-xs uppercase tracking-[0.42em] text-lilac">{copy.testimonials.eyebrow}</span>
          <CinematicHeading
            text={copy.testimonials.title}
            className="serif mt-6 text-6xl font-light leading-[0.9] text-pearl md:text-8xl"
          />
        </Reveal>
        <div className="grid gap-5">
          {copy.testimonials.items.map((quote, index) => (
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
  const copy = useCopy();

  return (
    <section className="panel px-5 py-24 md:px-14">
      <div className="absolute left-1/2 top-1/2 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose/15 blur-3xl" />
      <div className="relative flex min-h-[calc(100vh-12rem)] items-center justify-center text-center">
        <Reveal>
          <p className="mx-auto mb-8 max-w-xl text-xs uppercase tracking-[0.42em] text-rose">
            {copy.experience.eyebrow}
          </p>
          <CinematicHeading
            text={copy.experience.title}
            className="serif mx-auto max-w-6xl text-7xl font-light leading-[0.84] text-pearl md:text-[9rem]"
          />
          <p className="mx-auto mt-9 max-w-2xl text-lg leading-8 text-pearl/66">
            {copy.experience.body}
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function BookingPanel() {
  const copy = useCopy();

  return (
    <section id="booking" className="panel panel-booking px-5 py-24 md:px-14">
      <div className="relative grid min-h-[calc(100vh-12rem)] items-center gap-12 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <CinematicHeading
            text={copy.booking.title}
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
              {copy.booking.body}
            </p>
            <div className="mt-10 grid gap-4">
              <a className="group flex items-center justify-between rounded-full bg-pearl px-6 py-5 text-sm font-semibold uppercase tracking-[0.24em] text-ink transition hover:bg-rose" href="tel:+381000000000">
                <span className="flex items-center gap-3"><CalendarHeart size={18} /> {copy.booking.cta}</span>
                <ArrowUpRight size={18} className="transition group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
              <a className="flex items-center gap-3 rounded-full border border-pearl/14 px-6 py-5 text-sm uppercase tracking-[0.24em] text-pearl/76 transition hover:border-rose hover:text-rose" href="https://maps.google.com/?q=Novi%20Sad%20Serbia">
                <MapPin size={18} /> {copy.booking.location}
              </a>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}

function FooterPanel() {
  const copy = useCopy();

  return (
    <footer id="contact" className="panel panel-footer px-5 py-24 md:px-14">
      <div className="relative flex min-h-[calc(100vh-12rem)] flex-col justify-between">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.42em] text-lilac">{copy.footer.eyebrow}</p>
          <CinematicHeading
            text={copy.footer.title}
            className="serif mt-8 max-w-5xl text-7xl font-light leading-[0.84] text-pearl md:text-[10rem]"
          />
        </Reveal>
        <div className="mt-16 grid gap-6 border-t border-pearl/12 pt-8 text-sm uppercase tracking-[0.24em] text-pearl/60 md:grid-cols-4">
          <span>{copy.footer.owner}</span>
          <span>{copy.footer.location}</span>
          <span>{copy.footer.glow}</span>
          <span className="md:text-right">{copy.footer.appointment}</span>
        </div>
      </div>
    </footer>
  );
}

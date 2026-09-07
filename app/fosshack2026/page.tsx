"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import {
  ArrowUp,
  ArrowRight,
  Calendar,
  Camera,
  Link2,
  MapPin,
  MessageCircle,
  Moon,
  Quote,
  Send,
  Sun,
  Trophy,
  Users,
} from "lucide-react";
import { SiInstagram, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { useLenis } from "lenis/react";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const DynamicGeometricShapes = dynamic(
  () =>
    import("@/components/fosshack/geometric-shapes").then(
      (mod) => mod.GeometricShapes,
    ),
  {
    ssr: false,
  },
);

const BlurElement = ({ className }: { className: string }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 2 }}
    className={`absolute rounded-full mix-blend-multiply filter blur-3xl ${className}`}
  />
);

const Section = ({
  children,
  id,
}: {
  children: React.ReactNode;
  id: string;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.2,
  });

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="min-h-screen flex items-center justify-center p-8 relative"
    >
      {children}
    </motion.section>
  );
};

const AnimatedTitle = ({ children }: { children: React.ReactNode }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  return (
    <motion.h2
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
      className="text-5xl font-bold mb-12 text-foreground text-center"
    >
      {children}
    </motion.h2>
  );
};

const stats = [
  { label: "Registrations", value: "5430", icon: Users },
  { label: "Projects Submitted", value: "800", icon: Trophy },
  { label: "Prize Pool", value: "₹5,00,000", icon: Trophy },
  { label: "Community Partners", value: "10+", icon: Users },
  { label: "Sponsors", value: "5+", icon: Trophy },
  { label: "Cities Represented", value: "20+", icon: MapPin },
];

const eventPlaceholderImage = "/fosshack/FOSSHack2026.webp";

interface SubEvent {
  title: string;
  tag: string;
  date: string;
  time: string;
  venue?: string;
  speaker?: string;
  desc: string;
  image: string;
}

interface EventPhase {
  phase: string;
  intro: string;
  events: SubEvent[];
}

const eventPhases: EventPhase[] = [
  {
    phase: "Orientation & Kickoff",
    intro:
      "We kicked off the month by getting everyone on the same page before the building began.",
    events: [
      {
        title: "Orientation Day",
        tag: "Online",
        date: "March 2, 2026",
        time: "6:00 PM – 7:30 PM",
        desc: "The official kickoff session covering the event flow, team guidelines, submission process, open-source contribution expectations, judging criteria, and support channels — followed by an open Q&A.",
        image: "/fosshack2026/first_meetup_fosshack2026.webp",
      },
    ],
  },
  {
    phase: "Talks & Community",
    intro:
      "Inspiring talks and our first offline community meetup connected hackers with seasoned open-source voices.",
    events: [
      {
        title: "Speaker Session with Pushplata Ranjan",
        tag: "Online",
        date: "March 7, 2026",
        time: "6:00 PM – 7:00 PM",
        speaker: "Pushplata Ranjan · Senior Lead Engineer, R Systems",
        desc: "Pushplata shared insights from her professional journey and hands-on experience working with open-source technologies.",
        image: "/fosshack2026/pushplata.webp",
      },
      {
        title: "FOSS Hack 2026 Offline Community Meetup",
        tag: "Offline",
        date: "March 16, 2026",
        time: "12:30 PM – 4:30 PM",
        venue: "Auditorium, Delhi Technical Campus",
        desc: "Our first offline meetup of the season — an overview of FOSS Hack 2026 and its timeline, followed by a speaker session on OpenStreetMap and the open-source mapping ecosystem to kick off OSM Week.",
        image: "/fosshack2026/firstmeetup_fosshack2026_crowd.webp",
      },
    ],
  },
  {
    phase: "OSM Week",
    intro:
      "A dedicated week of open mapping workshops and community calls to map our world, together.",
    events: [
      {
        title: "Open Mapping & MapRoulette Workshop",
        tag: "Online",
        date: "March 17, 2026",
        time: "6:00 PM – 8:00 PM",
        speaker: "Kiran Ahire · Community Manager, TomTom",
        desc: "A hands-on online workshop on open mapping and MapRoulette, run in collaboration with TomTom. Participants could win xyz domains, CodeCrafters project courses, and official FOSS Hack tees.",
        image: "/fosshack2026/osmweek_tomtom.webp",
      },
      {
        title: "OSM Week Community Call: Mapping with Vespucci",
        tag: "Online",
        date: "March 22, 2026",
        time: "6:00 PM IST",
        speaker: "Akbar",
        desc: "An open community call guiding hackers through Vespucci and best practices for mapping effectively on Android — from getting started to accurate field workflows.",
        image: "/fosshack2026/akbar_occ.webp",
      },
    ],
  },
  {
    phase: "The Final Hack",
    intro:
      "The month-long build came to a close with our final hack day",
    events: [
      {
        title: "The Final Hack",
        tag: "Offline",
        date: "March 31, 2026",
        time: "All Day",
        desc: "The last day of FOSS Hack 2026 and the official closing of the event. Hackers put the finishing touches on their projects, celebrated their work, and wrapped up a month of open-source collaboration.",
        image: "/fosshack2026/finalhack.webp",
      },
    ],
  },
  {
    phase: "Post-Event Initiative",
    intro:
      "The impact continues after the hackathon closes.",
    events: [
      {
        title: "Yamuna Basin Flood Mapping Drive",
        tag: "Online",
        date: "April 19, 2026",
        time: "1:30 PM IST",
        desc: "A joint initiative by UN Mappers and The FOSS Club mapping flood-prone villages across the Yamuna Basin to support disaster responders with accurate, real-time data.",
        image: "/fosshack2026/yamuna_mapping.webp",
      },
    ],
  },
];

const winners = [
  {
    rank: "1st Place",
    prize: "₹50,000",
    team: "Push & Pray",
    project: "Livabl",
    image: "/fosshack2026/livabl.webp",
    desc: "Tooshar · Karanveer Singh · Janamjai",
  },
  {
    rank: "2nd Place",
    prize: "₹25,000",
    team: "CrypticByte",
    project: "Dockfleet",
    image: "/fosshack2026/dockfleet.webp",
    desc: "Khushi · Sunidhi Singh · Aayush Jha · Pratyush",
  },
];

const resultsThreadUrl = "https://forum.fossunited.org/t/foss-hack-2026-results/8094";

const testimonials = [
  {
    quote: "Glad I got to organise a hackathon in my college life, always greateful to The FOSS Club and FOSS UNITED for this oppourtunity",
    author: "Avneesh Kumar",
    role: "Organizer",
  },
  {
    quote: "Greatful for the experience, and even more motivated for what's next",
    author: "Mayank Choubey",
    role: "Participant",
  },
  {
    quote: "A huge thank you to the mentors, organizers, reviewers, and everyone involved in making FOSS Hack 2026 an incredible experience",
    author: "Anshika Yadav",
    role: "Winner",
  },
];

const presenceLinks = [
  {
    title: "Instagram",
    desc: "Photos, reels and stories from the event",
    url: "https://instagram.com/thefossclub",
    icon: SiInstagram,
  },
  {
    title: "X / Twitter",
    desc: "Live updates and highlights",
    url: "https://x.com/TheFOSSClub",
    icon: SiX,
  },
  {
    title: "LinkedIn",
    desc: "Professional recaps and announcements",
    url: "https://linkedin.com/company/thefossclub",
    icon: FaLinkedin,
  },
  {
    title: "Discord Server",
    desc: "Join our community",
    url: "https://discord.gg/sjKNEYQPnk",
    icon: MessageCircle,
  },
  {
    title: "Telegram Group",
    desc: "Join our telegram group",
    url: "https://t.me/TheFOSSClub",
    icon: Send,
  },
  {
    title: "LinkTree",
    desc: "Access all our links",
    url: "https://linktr.ee/thefossclub",
    icon: Link2,
  },
];

const socialPosts = [
  {
    image: "/fosshack2026/venue.webp",
    caption: "venue for FOSSHACK 2026 revealed!",
    url: "https://www.instagram.com/p/DULaUzdDYCw",
    platform: "Instagram",
  },
  {
    image: "/fosshack2026/timeline.webp",
    caption: "official timeline for FOSSHACK2026",
    url: "https://www.instagram.com/p/DWWyVZ6AebV",
    platform: "Instagram",
  },
  {
    image: "/fosshack2026/onsight.webp",
    caption: "The Onsite Phase Begins Today",
    url: "https://www.linkedin.com/posts/thefossclub_fosshack2026-fossunited-delhitechnicalcampus-activity-7443486219340267520-d8Wf",
    platform: "LinkedIn",
  },
];

// Event photograph gallery — add as many photos as you like here.
const galleryImages = [
  { src: "/fosshack2026/register.webp", alt: "Registrations" },
  { src: "/fosshack2026/register2.webp", alt: "Photo Booth" },
  { src: "/fosshack2026/register3.webp", alt: "Photo Booth" },
  { src: "/fosshack2026/register4.webp", alt: "Registrations" },
  { src: "/fosshack2026/cake.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab2.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab3.webp", alt: "Event photograph" },
  { src: "/fosshack2026/lab4.webp", alt: "Event photograph" },
  { src: "/fosshack2026/scribble.webp", alt: "Event photograph" },
  { src: "/fosshack2026/cake2.webp", alt: "Event photograph" },
  { src: "/fosshack2026/jamming2.webp", alt: "Event photograph" },
  { src: "/fosshack2026/jamming3.webp", alt: "Event photograph" },
];

const sponsors = [
  { name: "TomTom", logo: "/fosshack/TomTom.webp", url: "https://tomtom.com" },
  { name: "XYZ", logo: "/fosshack/XYZ.webp", url: "https://nic.xyz" },
  {
    name: "CodeCrafters",
    logo: "/fosshack/CodeCrafters.webp",
    url: "https://codecrafters.io",
  },
  { name: "Maxflex", logo: "/fosshack/Maxflex.webp", url: "" },
];

const communities = [
  { name: "PyDelhi", logo: "/fosshack/pydelhi_community_logo.webp" },
  { name: "Django India", logo: "/fosshack/djangoi.webp" },
  { name: "FOSS USAR", logo: "/fosshack/Usar.webp" },
  { name: "AIR", logo: "/fosshack/AiR.webp" },
  { name: "ECell", logo: "/fosshack/ecell.webp" },
  { name: "IEEE", logo: "/fosshack/ieee.webp" },
  { name: "ASC", logo: "/fosshack/asc.webp" },
];

const team = [
  { name: "Tanmay Maheshwari", title: "Lead Organizer" },
  { name: "Sanjam Kaur", title: "Management" },
  { name: "Jayesh Bisht", title: "Management" },
  { name: "Avneesh Kumar", title: "Community Partners" },
  { name: "Manya Yadav", title: "PR & Outreach Head" },
  { name: "Ishita Kaushik", title: "Social Media" },
  { name: "Nitya Kapoor", title: "Graphics & Content Head" },
  { name: "Bhumi Aggarwal", title: "Logistics Head" },
];

export default function Home() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "light") {
      root.classList.add("theme-light");
    } else {
      root.classList.remove("theme-light");
    }
  }, [theme]);

  useLenis((lenis) => {
    setShowScrollTop(lenis.scroll > 400);
  });

  const toggleTheme = () =>
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <div className="bg-background text-foreground text-lg relative overflow-hidden">
      <div className="fixed right-6 top-6 z-30">
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className={`group inline-flex items-center rounded-full px-2 py-1 backdrop-blur-md transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-cyan)]/60 focus-visible:ring-offset-2 border border-[rgba(var(--accent-green),0.6)] ${
            theme === "light"
              ? "bg-white text-[#141414] shadow-md shadow-black/15 hover:shadow-black/25 focus-visible:ring-offset-white"
              : "bg-white/18 text-white shadow-[0_0_12px_rgba(0,0,0,0.4)] hover:bg-white/24 focus-visible:ring-offset-black"
          }`}
        >
          <span
            className={`relative flex h-6 w-10 items-center rounded-full p-1 transition-all ${
              theme === "light"
                ? "bg-black/8 group-hover:bg-black/12"
                : "bg-black/35 group-hover:bg-black/45"
            }`}
          >
            <span
              className={`flex h-4 w-4 items-center justify-center rounded-full shadow-sm transition-transform duration-300 ${
                theme === "light" ? "bg-white" : "bg-black/70"
              } ${theme === "light" ? "translate-x-4" : "translate-x-0"}`}
            >
              {theme === "light" ? (
                <Sun className="h-3.5 w-3.5 text-[#141414]" />
              ) : (
                <Moon className="h-3.5 w-3.5 text-white" />
              )}
            </span>
          </span>
        </button>
      </div>
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[800px] h-[800px] -top-[400px] -left-[300px] ${
          theme === "light" ? "opacity-[0.28]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-cyan)]/40 w-[600px] h-[600px] top-[30%] -right-[200px] ${
          theme === "light" ? "opacity-[0.26]" : "opacity-[0.15]"
        }`}
      />
      <BlurElement
        className={`bg-[var(--accent-green)]/40 w-[700px] h-[700px] bottom-0 left-1/2 -translate-x-1/2 ${
          theme === "light" ? "opacity-[0.24]" : "opacity-[0.15]"
        }`}
      />

      <Suspense fallback={<div>Loading...</div>}>
        <DynamicGeometricShapes />
      </Suspense>

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-10 right-6 z-30 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition-all bg-background/80 text-foreground border border-foreground/20 shadow-lg hover:bg-background"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      )}

      <Section id="overview">
        <div className="text-center max-w-5xl mx-auto relative z-10">
          <motion.div
            className="mb-16 space-y-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <motion.h1
              className="text-6xl sm:text-8xl font-bold text-foreground"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.6, -0.05, 0.01, 0.99] }}
            >
              FOSSHack 2026
            </motion.h1>
            <motion.p
              className="text-3xl sm:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 1 }}
            >
              That&apos;s a Wrap! 🎉
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-6 text-xl text-foreground/60"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 1 }}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-6 h-6 text-foreground" />
                <span>March 1-31, 2026</span>
              </div>
              <div className="hidden sm:block text-2xl">•</div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-foreground" />
                <span>Delhi Technical Campus, Greater Noida</span>
              </div>
            </motion.div>
            <motion.p
              className="max-w-3xl mx-auto text-2xl leading-relaxed text-foreground/70"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 1 }}
            >
              India&apos;s Biggest FOSS Hackathon came to Delhi-NCR. A huge
              thanks to every participant, mentor, sponsor and community
              partner who made this month of open-source magic possible.
            </motion.p>
            <motion.div
              className="flex flex-wrap items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Link
                href="#journey"
                className="group relative inline-flex items-center gap-3 px-9 py-4 text-lg font-semibold rounded-full overflow-hidden text-[#141414] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-green),0.6)] focus-visible:ring-offset-2"
              >
                <span className="absolute inset-0 rounded-full bg-white" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[var(--accent-green)]/60 via-white to-[var(--accent-cyan)]/60 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-full blur-lg bg-[var(--accent-cyan)]/25 opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
                <span className="absolute inset-0 rounded-full border border-[rgba(var(--accent-green),0.6)]" />
                <span className="relative flex items-center gap-3">
                  <Camera className="w-5 h-5" />
                  View Highlights
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
              <Link
                href="#winners"
                className="group relative inline-flex items-center gap-3 px-9 py-4 text-lg font-semibold rounded-full overflow-hidden text-foreground border border-foreground/30 transition-all duration-300 hover:border-foreground/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(var(--accent-cyan),0.6)]"
              >
                <span className="relative flex items-center gap-3">
                  <Trophy className="w-5 h-5" />
                  See Winners
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </Section>

      <Section id="overview">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Event At a Glance</AnimatedTitle>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.8 }}
                className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur p-10 text-center"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-foreground/8">
                  <stat.icon className="h-8 w-8 text-[var(--accent-cyan)]" />
                </div>
                <div className="text-4xl font-bold text-foreground">
                  {stat.value}
                </div>
                <div className="mt-2 text-lg text-foreground/60">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="journey">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>The Journey</AnimatedTitle>
          <motion.p
            className="text-center text-xl text-foreground/70 max-w-3xl mx-auto -mt-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
          >
            A month of building, learning, and mapping
          </motion.p>

          <div className="space-y-16">
            {eventPhases.map((phase, phaseIndex) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * phaseIndex, duration: 1 }}
              >
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)]">
                    {phase.phase}
                  </h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-foreground/20 to-transparent" />
                </div>
                <p className="mb-8 text-lg text-foreground/60">{phase.intro}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {phase.events.map((event, index) => (
                    <motion.div
                      key={event.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index, duration: 0.8 }}
                      className="group rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur overflow-hidden hover:border-foreground/30 transition-colors duration-300"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <Image
                          src={event.image}
                          alt={`${event.title} — photo coming soon`}
                          width={640}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <span
                          className={`absolute top-4 right-4 rounded-full px-3 py-1 text-xs font-semibold backdrop-blur ${
                            event.tag === "Online"
                              ? "bg-[var(--accent-cyan)]/20 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/30"
                              : "bg-[var(--accent-green)]/20 text-[var(--accent-green)] border border-[var(--accent-green)]/30"
                          }`}
                        >
                          {event.tag}
                        </span>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-foreground/60 mb-3">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                          <span>•</span>
                          <span>{event.time}</span>
                        </div>
                        <h4 className="text-2xl font-bold mb-2 text-foreground">
                          {event.title}
                        </h4>
                        {event.speaker && (
                          <div className="flex items-center gap-2 text-base text-foreground/70 mb-3">
                            <Users className="w-4 h-4 text-[var(--accent-cyan)]" />
                            <span>{event.speaker}</span>
                          </div>
                        )}
                        {event.venue && (
                          <div className="flex items-center gap-2 text-base text-foreground/70 mb-3">
                            <MapPin className="w-4 h-4 text-[var(--accent-green)]" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                        <p className="text-base leading-relaxed text-foreground/70">
                          {event.desc}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Section id="gallery">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Photo Gallery</AnimatedTitle>
          <motion.p
            className="text-center text-xl text-foreground/70 max-w-3xl mx-auto -mt-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
          >
            A collection of our favourite moments from FOSS Hack 2026.
          </motion.p>
          <motion.div
            className="columns-2 md:columns-3 lg:columns-4 gap-4 [&>*]:mb-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {galleryImages.map((img, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.03 }}
                transition={{ delay: 0.1 * (index % 8), duration: 0.8 }}
                className="group relative overflow-hidden rounded-2xl border border-foreground/10 break-inside-avoid cursor-pointer"
                onClick={() => setActiveImage(index)}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={400}
                  height={300}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    index % 3 === 0 ? "aspect-[3/4]" : "aspect-square"
                  }`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <Dialog
          open={activeImage !== null}
          onOpenChange={(open) => !open && setActiveImage(null)}
        >
          <DialogContent className="max-w-5xl border-foreground/10 bg-background/95 backdrop-blur-md p-0 overflow-hidden">
            <DialogTitle className="sr-only">
              {activeImage !== null
                ? galleryImages[activeImage].alt
                : "Event photograph"}
            </DialogTitle>
            {activeImage !== null && (
              <div className="relative w-full">
                <Image
                  src={galleryImages[activeImage].src}
                  alt={galleryImages[activeImage].alt}
                  width={1200}
                  height={800}
                  priority
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                <div className="pb-4 px-4 text-center text-sm text-foreground/60">
                  {galleryImages[activeImage].alt}
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </Section>

      <Section id="winners">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Winners & Projects</AnimatedTitle>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {winners.map((winner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.8 }}
                className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur overflow-hidden flex flex-col items-center text-center"
              >
                <div className="w-full overflow-hidden aspect-video">
                  <Image
                    src={winner.image}
                    alt={`${winner.team} — photo coming soon`}
                    width={640}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 flex flex-col items-center w-full">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)]">
                  {winner.rank}
                </h3>
                <div className="mt-2 text-2xl font-bold text-foreground">
                  {winner.team}
                </div>
                <div className="text-xl text-foreground/70">
                  {winner.project}
                </div>
                <div className="mt-2 rounded-full bg-foreground/8 px-4 py-1 text-base font-semibold text-[var(--accent-green)]">
                  {winner.prize}
                </div>
                <p className="mt-4 text-foreground/60 text-base">
                  {winner.desc}
                </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <Link
              href={resultsThreadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/30 px-6 py-3 text-base font-semibold text-foreground transition-colors duration-300 hover:border-foreground/60"
            >
              View Full Results
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </div>
      </Section>

      <Section id="testimonials">
        <div className="w-full max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>What People Said</AnimatedTitle>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {testimonials.map((t, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 * index, duration: 0.8 }}
                className="rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur p-8 flex flex-col"
              >
                <Quote className="h-8 w-8 mb-4 text-[var(--accent-cyan)]" />
                <p className="flex-1 text-lg leading-relaxed text-foreground/80">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="mt-6">
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-foreground/60">{t.role}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="presence">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Our Online Presence</AnimatedTitle>
          <motion.p
            className="text-center text-xl text-foreground/70 max-w-3xl mx-auto -mt-6 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
          >
            Relive the moments, see the photos and stay connected with the
            community.
          </motion.p>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {presenceLinks.map((link, index) => (
              <motion.div
                key={link.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.8 }}
                className="relative group/link"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--accent-cyan)]/18 via-[var(--accent-purple)]/14 to-[var(--accent-green)]/10 opacity-0 blur-xl group-hover/link:opacity-100 transition-opacity duration-500" />
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative flex items-center justify-between gap-4 p-6 rounded-2xl transition-colors duration-300 border bg-background/60 text-foreground border-foreground/10 hover:border-foreground/30 hover:bg-background/80"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-foreground/8">
                      <link.icon className="h-5 w-5 text-[var(--accent-cyan)]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {link.title}
                      </h3>
                      <p className="text-sm text-foreground/60">{link.desc}</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 flex-shrink-0 text-foreground/50 transition-transform duration-300 group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--accent-green)] to-[var(--accent-cyan)] text-center mb-2">
              Recent Posts
            </h3>
            <p className="text-center text-lg text-foreground/60 mb-8">
              A few moments we shared online.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {socialPosts.map((post, index) => (
                <motion.a
                  key={index}
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.8 }}
                  className="group rounded-2xl border border-foreground/10 bg-background/60 backdrop-blur overflow-hidden hover:border-foreground/30 transition-colors duration-300 flex flex-col"
                >
                  <div className="overflow-hidden aspect-square">
                    <Image
                      src={post.image}
                      alt={post.caption}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-semibold uppercase tracking-wide text-[var(--accent-cyan)] mb-2">
                      {post.platform}
                    </div>
                    <p className="text-base leading-relaxed text-foreground/70 flex-1">
                      {post.caption}
                    </p>
                    <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-foreground/60 group-hover:text-foreground transition-colors">
                      View Post
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </Section>

      <Section id="credits">
        <div className="max-w-5xl mx-auto relative z-10">
          <AnimatedTitle>Our Sponsors & Communities</AnimatedTitle>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
          >
            {sponsors.map((sponsor, index) => (
              <Link
                key={index}
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${sponsor.name}`}
                className="rounded-2xl border border-foreground/10 bg-white p-4 flex items-center justify-center min-h-[90px]"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.6 }}
                  className="flex items-center justify-center"
                >
                  <Image
                    src={sponsor.logo}
                    width={200}
                    height={100}
                    alt={sponsor.name}
                    className="max-h-[70px] w-auto object-contain"
                  />
                </motion.div>
              </Link>
            ))}
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {communities.map((community, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="rounded-xl bg-background/80 flex flex-col items-center justify-center border border-foreground/10 p-4"
              >
                <div className="w-full flex items-center justify-center h-20">
                  <Image
                    src={community.logo}
                    width={160}
                    height={80}
                    alt={community.name}
                    className="max-h-full w-auto object-contain"
                  />
                </div>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {community.name}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <Section id="team">
        <div className="max-w-6xl mx-auto relative z-10">
          <AnimatedTitle>Thank You, Team</AnimatedTitle>
          <motion.p
            className="text-center text-xl text-foreground/70 max-w-3xl mx-auto -mt-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 1 }}
          >
            None of this would have been possible without our incredible
            organizing team.
          </motion.p>
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.8 }}
              >
                <motion.div
                  className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-foreground/8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-8 h-8 sm:w-10 sm:h-10 text-foreground" />
                </motion.div>
                <h3 className="text-lg sm:text-xl font-medium mb-1 text-foreground">
                  {member.name}
                </h3>
                <p className="text-sm text-foreground/60">{member.title}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <motion.footer
        className="relative z-10 border-t border-foreground/15 bg-background/60 backdrop-blur-md py-14 px-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-foreground/5 to-transparent" />
        <div className="max-w-5xl mx-auto text-center text-foreground/70">
          <p className="text-xl">
            &copy; 2026 FOSS Hack Delhi-NCR. All rights reserved.
          </p>
          <p className="mt-2 text-foreground/50">
            Made with ❤ by The FOSS Club
          </p>
        </div>
      </motion.footer>
    </div>
  );
}

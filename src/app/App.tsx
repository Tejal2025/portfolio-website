import { useState, useEffect, useRef } from "react";
import {
  Github, Linkedin, Mail, ExternalLink, Download,
  Menu, X, MapPin, GraduationCap, Code2, Terminal,
  Database, Layers, Wrench, Users, Send, Calendar,
  ArrowUpRight, ChevronDown, Briefcase,
} from "lucide-react";

/* ════════════════════════════════════════
   UTILITIES
════════════════════════════════════════ */
function useReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) setOn(true); }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, on };
}

/* ════════════════════════════════════════
   BACKGROUND
════════════════════════════════════════ */
function Bg() {
  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }}>
      {/* deep noise gradient */}
      <div className="absolute inset-0" style={{
        background: "radial-gradient(ellipse 80% 60% at 10% 0%, rgba(99,102,241,0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 90% 90%, rgba(129,140,248,0.12) 0%, transparent 55%)",
      }} />
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: "linear-gradient(#818cf8 1px,transparent 1px),linear-gradient(90deg,#818cf8 1px,transparent 1px)",
        backgroundSize: "72px 72px",
      }} />
      {/* top-left orb */}
      <div className="absolute -top-32 -left-32 w-[560px] h-[560px] rounded-full opacity-[0.14] blur-3xl"
        style={{ background: "radial-gradient(circle,#6366f1,transparent 70%)" }} />
      {/* bottom-right orb */}
      <div className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full opacity-[0.10] blur-3xl"
        style={{ background: "radial-gradient(circle,#818cf8,transparent 70%)" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   NAV
════════════════════════════════════════ */
const NAV = ["About", "Skills", "Experience", "Projects", "Education", "Contact"];

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const go = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };
  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
      style={{ background: scrolled ? "rgba(5,5,16,0.82)" : "transparent", backdropFilter: scrolled ? "blur(18px)" : "none", borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* logo */}
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-[Poppins] font-bold text-lg tracking-tight"
          style={{ background: "linear-gradient(135deg,#818cf8,#6366f1)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          Tejal.dev
        </button>
        {/* desktop links */}
        <nav className="hidden md:flex items-center gap-7">
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)}
              className="text-sm text-[#8892a4] hover:text-white transition-colors duration-200 font-[Inter] font-medium">
              {n}
            </button>
          ))}
        </nav>
        {/* hire me */}
        <button onClick={() => go("Contact")}
          className="hidden md:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]"
          style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
          Hire Me
        </button>
        {/* mobile toggle */}
        <button className="md:hidden text-[#8892a4]" onClick={() => setOpen(!open)}>
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {/* mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 px-6 py-4 flex flex-col gap-1"
          style={{ background: "rgba(5,5,16,0.96)", backdropFilter: "blur(20px)" }}>
          {NAV.map(n => (
            <button key={n} onClick={() => go(n)}
              className="text-left py-2.5 text-sm text-[#8892a4] hover:text-white transition-colors font-medium border-b border-white/[0.04] last:border-0">
              {n}
            </button>
          ))}
          <button onClick={() => go("Contact")}
            className="mt-3 py-2.5 rounded-lg text-sm font-semibold text-white"
            style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
            Hire Me
          </button>
        </div>
      )}
    </header>
  );
}

/* ════════════════════════════════════════
   HERO
════════════════════════════════════════ */
function Hero() {
  const roles = ["Full Stack Developer", "MSc CS Student"];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [fwd, setFwd] = useState(true);

  useEffect(() => {
    const target = roles[idx];
    let t: ReturnType<typeof setTimeout>;
    if (fwd) {
      if (text.length < target.length) t = setTimeout(() => setText(target.slice(0, text.length + 1)), 65);
      else t = setTimeout(() => setFwd(false), 2200);
    } else {
      if (text.length > 0) t = setTimeout(() => setText(text.slice(0, -1)), 35);
      else { setIdx((idx + 1) % roles.length); setFwd(true); }
    }
    return () => clearTimeout(t);
  }, [text, fwd, idx]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col justify-center px-6 pt-20 pb-12" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto w-full grid lg:grid-cols-[1fr_auto] gap-16 items-center">

        {/* ── Left ── */}
        <div className="max-w-xl">
          {/* available badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-8"
            style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.28)", color: "#a5b4fc" }}>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ boxShadow: "0 0 6px #34d399" }} />
            Open to opportunities
          </div>

          <h1 className="font-[Poppins] font-extrabold text-5xl md:text-6xl leading-[1.1] text-white mb-4">
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(130deg,#818cf8 0%,#6366f1 50%,#38bdf8 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              Tejal
            </span>
          </h1>

          {/* typewriter */}
          <div className="flex items-center gap-2 mb-5 h-8">
            <span className="text-lg md:text-xl font-semibold text-[#818cf8]">{text}</span>
            <span className="w-[2px] h-5 rounded-full bg-indigo-400 animate-pulse" />
          </div>

          <p className="text-[#8892a4] text-base leading-7 mb-8 max-w-lg">
            Passionate about crafting responsive, user-friendly web applications using
            Java, ReactJS, NodeJS, and MySQL. Currently pursuing MSc Computer Science at
            Savitribai Phule Pune University.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <button onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-200 hover:shadow-[0_0_28px_rgba(99,102,241,0.45)] hover:-translate-y-0.5"
              style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
              View Projects <ArrowUpRight size={15} />
            </button>
            <a href="src\assets\Tejal_Chaudhari_Resume.pdf" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#a5b4fc] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(99,102,241,0.35)" }}>
              <Download size={15} /> Resume
            </a>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-[#8892a4] transition-all duration-200 hover:text-white hover:-translate-y-0.5"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
              Contact Me
            </button>
          </div>

          {/* social row */}
          <div className="flex items-center gap-3 mt-8">
            {[
              { href: "https://github.com/Tejal2025", icon: <Github size={17} />, label: "GitHub" },
              { href: "https://www.linkedin.com/in/tejal-chaudhary-1438902bb", icon: <Linkedin size={17} />, label: "LinkedIn" },
              { href: "mailto:chaudhariteju7030@gmail.com", icon: <Mail size={17} />, label: "Email" },
            ].map(s => (
              <a key={s.label} href={s.href} target={s.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer"
                className="p-2.5 rounded-xl text-[#8892a4] hover:text-white transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_16px_rgba(99,102,241,0.25)]"
                style={{ border: "1px solid rgba(255,255,255,0.07)", background: "rgba(255,255,255,0.03)" }}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Right: illustration card ── */}
        <div className="hidden lg:block">
          <div className="relative w-[300px]">
            {/* glow */}
            <div className="absolute inset-0 rounded-3xl blur-3xl opacity-30"
              style={{ background: "radial-gradient(circle,#6366f1,#818cf8,transparent)" }} />
            <div className="relative rounded-3xl overflow-hidden p-6"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(20px)" }}>
              {/* terminal header */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-red-400/70" />
                <span className="w-3 h-3 rounded-full bg-yellow-400/70" />
                <span className="w-3 h-3 rounded-full bg-green-400/70" />
                <span className="ml-2 text-xs text-[#8892a4] font-mono">portfolio.tsx</span>
              </div>
              {/* code lines */}
              <div className="space-y-2 font-mono text-xs">
                {[
                  { c: "#818cf8", t: "const developer = {" },
                  { c: "#8892a4", t: '  name: "Tejal Chaudhari",' },
                  { c: "#8892a4", t: '  role: "Full Stack Dev",' },
                  { c: "#34d399", t: "  skills: [" },
                  { c: "#38bdf8", t: '    "Java", "React",' },
                  { c: "#38bdf8", t: '    "NodeJS", "MySQL"' },
                  { c: "#34d399", t: "  ]," },
                  { c: "#fb923c", t: '  status: "Hiring ✓"' },
                  { c: "#818cf8", t: "};" },
                ].map((l, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span className="text-[#8892a4]/40 w-4 text-right flex-shrink-0">{i + 1}</span>
                    <span style={{ color: l.c }}>{l.t}</span>
                  </div>
                ))}
                {/* blinking cursor */}
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-[#8892a4]/40 w-4 text-right">10</span>
                  <span className="w-2 h-4 rounded-sm bg-indigo-400 animate-pulse" />
                </div>
              </div>
              {/* skill badges */}
              <div className="mt-5 flex flex-wrap gap-1.5">
                {["React", "Java", "NodeJS", "MySQL", "JSP"].map(t => (
                  <span key={t} className="px-2 py-1 rounded-md text-[10px] font-semibold"
                    style={{ background: "rgba(99,102,241,0.14)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.22)" }}>
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {/* floating stat */}
            <div className="absolute -bottom-4 -right-4 rounded-xl px-4 py-2.5"
              style={{ background: "rgba(12,12,30,0.9)", border: "1px solid rgba(99,102,241,0.28)", backdropFilter: "blur(12px)" }}>
              <p className="text-[10px] text-[#8892a4] uppercase tracking-wider">Projects</p>
              <p className="text-xl font-bold font-[Poppins] text-white">6<span className="text-indigo-400">+</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-40">
        <span className="text-[10px] tracking-[0.2em] uppercase text-[#8892a4]">scroll</span>
        <ChevronDown size={14} className="text-[#8892a4] animate-bounce" />
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SHARED: pill tag
════════════════════════════════════════ */
function Tag({ children, color = "#6366f1" }: { children: React.ReactNode; color?: string }) {
  return (
    <span className="px-2.5 py-1 rounded-lg text-xs font-semibold"
      style={{ background: `${color}16`, color, border: `1px solid ${color}28` }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════
   SHARED: glass card
════════════════════════════════════════ */
function Card({ children, className = "", lift = true }: { children: React.ReactNode; className?: string; lift?: boolean }) {
  return (
    <div className={`rounded-2xl transition-all duration-300 ${lift ? "hover:-translate-y-1 hover:shadow-[0_12px_48px_rgba(99,102,241,0.14)] hover:border-indigo-500/25" : ""} ${className}`}
      style={{ background: "rgba(255,255,255,0.035)", border: "1px solid rgba(255,255,255,0.07)", backdropFilter: "blur(16px)" }}>
      {children}
    </div>
  );
}

/* ════════════════════════════════════════
   SHARED: section heading
════════════════════════════════════════ */
function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  const words = title.split(" ");
  return (
    <div className="text-center mb-16">
      <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-3"
        style={{ color: "#818cf8" }}>
        {eyebrow}
      </p>
      <h2 className="font-[Poppins] font-bold text-3xl md:text-4xl text-white">
        {words.slice(0, -1).join(" ")}{" "}
        <span style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
          {words[words.length - 1]}
        </span>
      </h2>
      <div className="mt-4 mx-auto h-[3px] w-14 rounded-full"
        style={{ background: "linear-gradient(90deg,#6366f1,#818cf8)" }} />
    </div>
  );
}

/* ════════════════════════════════════════
   ABOUT
════════════════════════════════════════ */
function About() {
  const { ref, on } = useReveal();
  const stats = [
    { v: "3+", l: "Years Learning" },
    { v: "6+", l: "Projects Built" },
    { v: "15+", l: "Technologies" },
    { v: "6mo", l: "Internship" },
  ];
  return (
    <section id="about" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <Heading eyebrow="Who I Am" title="About Me" />
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-14 items-center">
          {/* photo */}
          <div className="relative mx-auto w-full max-w-[340px]">
            <div className="absolute inset-0 rounded-3xl blur-2xl opacity-25"
              style={{ background: "radial-gradient(circle,#6366f1,transparent)" }} />
            <div className="relative rounded-3xl overflow-hidden aspect-square"
              style={{ border: "1px solid rgba(255,255,255,0.09)" }}>
              <img src="src\assets\profile.jpg"
                alt="Tejal Chaudhari" className="w-full h-full object-cover" style={{ filter: "brightness(0.85) saturate(1.1)" }} />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(5,5,16,0.65) 0%,transparent 55%)" }} />
              <div className="absolute bottom-5 left-5">
                <p className="text-white font-[Poppins] font-semibold">Tejal Chaudhari</p>
                <p className="text-indigo-300 text-sm">Full Stack Developer</p>
              </div>
            </div>
            {/* badge */}
            <div className="absolute -top-4 -right-4 rounded-2xl px-4 py-3"
              style={{ background: "rgba(12,12,30,0.88)", border: "1px solid rgba(99,102,241,0.28)", backdropFilter: "blur(12px)" }}>
              <p className="text-[10px] text-[#8892a4] uppercase tracking-wider mb-0.5">Status</p>
              <p className="text-xs font-semibold text-emerald-400">Actively Hiring</p>
            </div>
          </div>
          {/* text */}
          <div>
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8892a4]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <MapPin size={12} className="text-indigo-400" /> Nashik, Maharashtra, India
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-[#8892a4]"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <GraduationCap size={12} className="text-purple-400" /> MSc Computer Science
              </span>
            </div>
            <p className="text-[#c4cbd8] leading-7 text-sm mb-4">
              I am a dedicated Computer Science postgraduate with strong knowledge of frontend and
              backend development. I enjoy creating scalable web applications, solving challenging
              problems, and continuously improving my technical skills.
            </p>
            <p className="text-[#8892a4] leading-7 text-sm mb-9">
              Currently pursuing my MSc at Savitribai Phule Pune University after completing my
              BSc in Computer Science. I'm actively seeking opportunities as a Software Developer
              where I can contribute meaningfully and grow professionally.
            </p>
            {/* stats grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {stats.map(s => (
                <Card key={s.l} className="p-4 text-center" lift={false}>
                  <p className="text-2xl font-bold font-[Poppins] text-white mb-0.5">{s.v}</p>
                  <p className="text-[10px] text-[#8892a4] uppercase tracking-wider">{s.l}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   SKILLS
════════════════════════════════════════ */
const SKILL_GROUPS = [
  { icon: <Code2 size={18} />, label: "Languages", color: "#6366f1", skills: ["Java", "Python", "C", "C++"] },
  { icon: <Layers size={18} />, label: "Frontend", color: "#818cf8", skills: ["HTML5", "CSS3", "JavaScript", "ReactJS", "Bootstrap"] },
  { icon: <Terminal size={18} />, label: "Backend", color: "#38bdf8", skills: ["NodeJS", "Java Servlets", "JSP"] },
  { icon: <Database size={18} />, label: "Database", color: "#34d399", skills: ["MySQL"] },
  { icon: <Wrench size={18} />, label: "Tools", color: "#fb923c", skills: ["VS Code", "Git", "GitHub", "Apache Tomcat"] },
  { icon: <Users size={18} />, label: "Soft Skills", color: "#f472b6", skills: ["Problem Solving", "Teamwork", "Communication", "Quick Learner"] },
];

function Skills() {
  const { ref, on } = useReveal();
  return (
    <section id="skills" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <Heading eyebrow="What I Know" title="My Skills" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SKILL_GROUPS.map(g => (
            <Card key={g.label} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg" style={{ background: `${g.color}18`, color: g.color }}>
                  {g.icon}
                </div>
                <h3 className="font-[Poppins] font-semibold text-sm text-white">{g.label}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {g.skills.map(s => <Tag key={s} color={g.color}>{s}</Tag>)}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   EXPERIENCE
════════════════════════════════════════ */
const EXP = [
  {
    role: "Software & Hardware Support Intern",
    company: "MSC Computer Classes",
    duration: "6 Months",
    color: "#6366f1",
    points: [
      "Hardware troubleshooting and maintenance for lab systems",
      "Software support and issue resolution for clients",
      "Client communication and technical documentation",
      "Assisted students with technical problems and system configuration",
    ],
  },
  {
    role: "Web Developer Intern",
    company: "NEXTIN SOFT PRIVATE LIMITED",
    duration: "6 Months",
    color: "#818cf8",
    points: [
      "Designed and developed responsive business websites",
      "Implemented PHP backend integration for client projects",
      "Built modern frontend UIs with HTML, CSS, JavaScript",
      "Delivered live project: vosonoz.com for a real client",
    ],
  },
];

function Experience() {
  const { ref, on } = useReveal();
  return (
    <section id="experience" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-3xl mx-auto">
        <Heading eyebrow="Work History" title="My Experience" />
        <div className="relative pl-8">
          {/* timeline line */}
          <div className="absolute left-2.5 top-2 bottom-2 w-px"
            style={{ background: "linear-gradient(to bottom,#6366f1,#818cf8,rgba(129,140,248,0.1))" }} />
          <div className="space-y-7">
            {EXP.map((e, i) => (
              <div key={i} className="relative">
                {/* dot */}
                <div className="absolute -left-[22px] top-5 w-3.5 h-3.5 rounded-full border-2"
                  style={{ background: e.color, borderColor: "#050510", boxShadow: `0 0 10px ${e.color}90` }} />
                <Card className="p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <h3 className="font-[Poppins] font-semibold text-white">{e.role}</h3>
                      <p className="text-sm mt-0.5" style={{ color: e.color }}>{e.company}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#8892a4]">
                      <Calendar size={12} /> {e.duration}
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {e.points.map((p, j) => (
                      <li key={j} className="flex items-start gap-2.5 text-sm text-[#8892a4]">
                        <span className="mt-2 w-1 h-1 rounded-full flex-shrink-0" style={{ background: e.color }} />
                        {p}
                      </li>
                    ))}
                  </ul>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   PROJECTS
════════════════════════════════════════ */
const PROJECTS = [
  {
    title: "Music Recommendation Engine",
    desc: "Recommends songs based on user emotions and genres using a Java Servlets backend, JSP views, and a MySQL database with intelligent matching logic.",
    tech: ["Java", "JSP", "Servlets", "MySQL", "Tomcat"],
    img: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=640&h=380&fit=crop&auto=format",
    color: "#6366f1",
    link: null,
  },
  {
    title: "Genesis Event Platform",
    desc: "Full-stack event management platform — users can register, browse, and organize events with a secure Node.js backend and a clean React frontend.",
    tech: ["ReactJS", "NodeJS", "MySQL"],
    img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=640&h=380&fit=crop&auto=format",
    color: "#818cf8",
    link: null,
  },
  {
    title: "Vosonoz — Company Website",
    desc: "Professional business website built during internship: responsive UI, PHP integration, modern frontend — delivered and live for a real client.",
    tech: ["HTML5", "CSS3", "JavaScript", "PHP"],
    img: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=640&h=380&fit=crop&auto=format",
    color: "#38bdf8",
    link: "https://vosonoz.com/",
  },
];

function Projects() {
  const { ref, on } = useReveal();
  return (
    <section id="projects" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <Heading eyebrow="What I've Built" title="Featured Projects" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map(p => (
            <Card key={p.title} className="overflow-hidden flex flex-col">
              {/* image */}
              <div className="relative h-44 overflow-hidden bg-slate-900/60">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover opacity-70 transition-transform duration-500 hover:scale-105" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top,rgba(5,5,16,0.75),transparent 60%)" }} />
                {/* live dot */}
                {p.link && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px] font-semibold"
                    style={{ background: "rgba(5,5,16,0.75)", color: "#34d399", border: "1px solid rgba(52,211,153,0.35)" }}>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
                  </div>
                )}
              </div>
              {/* body */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="font-[Poppins] font-semibold text-white text-[15px] mb-2">{p.title}</h3>
                <p className="text-[#8892a4] text-sm leading-6 mb-4 flex-1">{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tech.map(t => <Tag key={t} color={p.color}>{t}</Tag>)}
                </div>
                {p.link && (
                  <a href={p.link} target="_blank" rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold transition-all duration-150 hover:gap-2.5"
                    style={{ color: p.color }}>
                    <ExternalLink size={13} /> Visit Website
                  </a>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   EDUCATION
════════════════════════════════════════ */
const EDU = [
  {
    degree: "MSc Computer Science",
    school: "Savitribai Phule Pune University",
    period: "2024 – Present",
    status: "Pursuing",
    color: "#6366f1",
    detail: "Advanced studies in algorithms, distributed systems, machine learning, and software engineering.",
  },
  {
    degree: "BSc Computer Science",
    school: "Savitribai Phule Pune University",
    period: "2021 – 2024",
    status: "Completed",
    color: "#818cf8",
    detail: "Core foundation in programming, data structures, databases, networking, and web technologies.",
  },
];

function Education() {
  const { ref, on } = useReveal();
  return (
    <section id="education" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-3xl mx-auto">
        <Heading eyebrow="Academic Journey" title="Education Timeline" />
        <div className="space-y-5">
          {EDU.map((e, i) => (
            <Card key={i} className="p-6 md:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl mt-0.5 flex-shrink-0" style={{ background: `${e.color}18` }}>
                    <GraduationCap size={20} style={{ color: e.color }} />
                  </div>
                  <div>
                    <h3 className="font-[Poppins] font-semibold text-white">{e.degree}</h3>
                    <p className="text-sm text-[#8892a4] mt-0.5">{e.school}</p>
                    <p className="text-xs text-[#8892a4]/70 mt-2.5 leading-5 max-w-sm">{e.detail}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2.5 flex-shrink-0">
                  <span className="flex items-center gap-1.5 text-xs text-[#8892a4]">
                    <Calendar size={11} /> {e.period}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold"
                    style={{ background: `${e.color}16`, color: e.color, border: `1px solid ${e.color}28` }}>
                    {e.status}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   CONTACT
════════════════════════════════════════ */
function Contact() {
  const { ref, on } = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    const phone = "+917030311817"; // Apna WhatsApp number without + (e.g. 919876543210)

    const text = `*New Portfolio Contact*

Name: ${form.name}
Email: ${form.email}

Message:
${form.message}`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(text)}`,
      "_blank"
    );

    setTimeout(() => setState("sent"), 1000);
  };

  const links = [
    { icon: <Mail size={18} />, label: "Email", val: "chaudhariteju7030@gmail.com", href: "mailto:chaudhariteju7030@gmail.com", color: "#6366f1" },
    { icon: <Github size={18} />, label: "GitHub", val: "github.com/Tejal2025", href: "https://github.com/Tejal2025", color: "#818cf8" },
    { icon: <Linkedin size={18} />, label: "LinkedIn", val: "linkedin.com/in/tejal-chaudhary", href: "https://www.linkedin.com/in/tejal-chaudhary-1438902bb", color: "#38bdf8" },
  ];

  return (
    <section id="contact" ref={ref}
      className={`relative py-28 px-6 transition-all duration-700 ${on ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <Heading eyebrow="Get In Touch" title="Contact Me" />
        <div className="grid lg:grid-cols-[1fr_1.15fr] gap-10 items-start">
          {/* left */}
          <div>
            <p className="text-[#8892a4] text-sm leading-7 mb-8">
              I'm actively looking for new opportunities. Whether you have a project idea,
              a job offer, or just want to connect — my inbox is always open.
            </p>
            <div className="space-y-3">
              {links.map(l => (
                <a key={l.label} href={l.href} target={l.href.startsWith("mailto") ? undefined : "_blank"} rel="noreferrer">
                  <Card className="p-4 flex items-center gap-4">
                    <div className="p-2.5 rounded-xl flex-shrink-0" style={{ background: `${l.color}16`, color: l.color }}>
                      {l.icon}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] text-[#8892a4] uppercase tracking-wider">{l.label}</p>
                      <p className="text-sm text-white font-medium truncate mt-0.5">{l.val}</p>
                    </div>
                    <ArrowUpRight size={14} className="ml-auto text-[#8892a4]/50 flex-shrink-0" />
                  </Card>
                </a>
              ))}
            </div>
          </div>

          {/* form */}
          <Card className="p-7" lift={false}>
            {state === "sent" ? (
              <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.28)" }}>
                  <Send size={22} className="text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-[Poppins] font-semibold text-white mb-1">Message Sent!</h3>
                  <p className="text-sm text-[#8892a4]">Thank you — I'll reply as soon as possible.</p>
                </div>
                <button onClick={() => { setState("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="text-xs text-indigo-400 hover:text-indigo-300 transition-colors mt-2">
                  Send another →
                </button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                {(["name", "email"] as const).map(f => (
                  <div key={f}>
                    <label className="block text-[10px] text-[#8892a4] uppercase tracking-widest mb-1.5">{f}</label>
                    <input
                      type={f === "email" ? "email" : "text"}
                      required
                      placeholder={f === "name" ? "Your full name" : "your@email.com"}
                      value={form[f]}
                      onChange={e => setForm({ ...form, [f]: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-[#8892a4]/50 outline-none transition-all duration-200"
                      style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "Inter,sans-serif" }}
                      onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                      onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[10px] text-[#8892a4] uppercase tracking-widest mb-1.5">Message</label>
                  <textarea
                    required rows={5}
                    placeholder="Tell me about your project or opportunity..."
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-[#8892a4]/50 outline-none resize-none transition-all duration-200"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", fontFamily: "Inter,sans-serif" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(99,102,241,0.5)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.07)")}
                  />
                </div>
                <button type="submit" disabled={state === "sending"}
                  className="w-full py-3 rounded-xl text-sm font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-[0_0_28px_rgba(99,102,241,0.38)] hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ background: "linear-gradient(135deg,#6366f1,#818cf8)" }}>
                  {state === "sending" ? (
                    <><svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16 8 8 0 01-8-8z" />
                    </svg> Sending...</>
                  ) : <><Send size={15} /> Send Message</>}
                </button>
              </form>
            )}
          </Card>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════════
   FOOTER
════════════════════════════════════════ */
function Footer() {
  return (
    <footer className="relative py-10 px-6" style={{ zIndex: 1, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[#8892a4]">
          © 2026 <span className="text-white font-medium">Tejal Chaudhari</span> · Designed with ❤️
        </p>
        <div className="flex items-center gap-4">
          {[
            { href: "https://github.com/Tejal2025", icon: <Github size={15} /> },
            { href: "https://www.linkedin.com/in/tejal-chaudhary-1438902bb", icon: <Linkedin size={15} /> },
            { href: "mailto:chaudhariteju7030@gmail.com", icon: <Mail size={15} /> },
          ].map((s, i) => (
            <a key={i} href={s.href} target="_blank" rel="noreferrer"
              className="text-[#8892a4] hover:text-white transition-colors duration-200">
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ════════════════════════════════════════
   APP
════════════════════════════════════════ */
export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden" style={{ fontFamily: "Inter,sans-serif" }}>
      <Bg />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </div>
  );
}

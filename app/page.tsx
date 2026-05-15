import {
  ArrowUpRight,
  EnvelopeSimple,
  FileText,
  GithubLogo,
  LinkedinLogo,
  Phone,
  PinterestLogo,
} from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site";

const projects = [
  {
    name: "SamOps",
    href: "https://samops.app",
    meta: "Next.js, Go, Node.js, Python, LLMs, AI agents, AWS, Vercel",
    summary:
      "Agentic FinOps platform for monitoring cloud spend in real time, detecting unusual cost behavior with AI, and scanning source code or Terraform for optimization opportunities.",
  },
  {
    name: "Styleto",
    meta: "SwiftUI, Kotlin Jetpack Compose, NestJS, MongoDB",
    summary:
      "AI-powered fashion mobile app with clothing detection, personalized outfit recommendations, virtual try-on, a digital wardrobe, and a real-time marketplace messaging flow.",
  },
  {
    name: "WeFarm",
    meta: "Symfony, JavaFX",
    summary:
      "Web and desktop platform for sustainable agriculture workflows, including crop management, recruitment, and climate tracking. Selected among the best projects at ESPRIT's Bal des Projets.",
  },
  {
    name: "Recruitment Innovation Platform",
    meta: "HTML, CSS, JavaScript, PHP",
    summary:
      "Web platform designed to improve candidate-company matching with personalized recommendations, community advice spaces, online certification programs, job presentation videos, and virtual company tours.",
  },
  {
    name: "Delivery Operations Desktop App",
    meta: "C++, Qt, Arduino",
    summary:
      "Desktop application for simplifying online delivery management, combining order and stock workflows with an embedded detector for battery charge status and maximum courier route alerts.",
  },
  {
    name: "Quantum Escape",
    meta: "C, SDL",
    summary:
      "Video game set in NovaCore, a futuristic metaverse city where Orion Vega travels from 2030 to 2060 to reverse Neuroflux's robot-controlled future and bring disappeared citizens home.",
  },
  {
    name: "Multilingual AI Chatbot",
    meta: "NLP, hackathon delivery",
    summary:
      "Multilingual chatbot built during the IHEC Chatbot Challenge under time constraints, applying NLP techniques in a team setting.",
  },
];

const skillGroups = [
  ["Languages", "Java", "Python", "C/C++", "C#", "JavaScript", "PHP", "Kotlin", "Swift", "Go", "ABAP"],
  ["Mobile", "SwiftUI", "Kotlin Jetpack Compose", "Flutter", "React Native"],
  ["Web + Backend", "NestJS", "Symfony", ".NET", "Next.js", "REST APIs"],
  ["Data + AI", "MongoDB", "PostgreSQL", "SQL", "Firebase", "Machine Learning", "NLP", "Computer Vision"],
  ["Tools", "Git", "Linux", "UML", "Android Studio", "Xcode", "IntelliJ", "VS Code"],
  ["SAP", "ABAP", "RAP", "CDS Access Controls", "EML", "ETags"],
];

const visualNotes = [
  "Color systems",
  "Editorial references",
  "Interface tone",
  "Material texture",
  "Place details",
];

const palette = [
  { name: "Soft rose", value: "#e8b7c9" },
  { name: "Ink", value: "#18181b" },
  { name: "Ceramic blue", value: "#315f8f" },
  { name: "Olive", value: "#6f7a48" },
  { name: "Warm paper", value: "#f6efe8" },
];

const links = [
  {
    label: "GitHub",
    href: siteConfig.github,
    icon: GithubLogo,
  },
  {
    label: "LinkedIn",
    href: siteConfig.linkedin,
    icon: LinkedinLogo,
  },
  {
    label: "Pinterest",
    href: siteConfig.pinterest,
    icon: PinterestLogo,
  },
  {
    label: "Email",
    href: `mailto:${siteConfig.email}`,
    icon: EnvelopeSimple,
  },
  {
    label: "Phone",
    href: siteConfig.phoneHref,
    icon: Phone,
  },
  {
    label: "CV",
    href: "/salma-mahjoub-cv.pdf",
    icon: FileText,
  },
];

const headerLinks = links.filter(({ label }) =>
  ["GitHub", "LinkedIn", "Pinterest"].includes(label),
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: "Mobile Information Systems Engineering Student",
  address: {
    "@type": "PostalAddress",
    streetAddress: "7 Rue des Rossignols",
    addressLocality: "Ariana",
    addressCountry: "TN",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "ESPRIT",
  },
  knowsAbout: [
    "Mobile development",
    "Full-stack development",
    "Machine learning",
    "Natural language processing",
    "Computer vision",
    "Flutter",
    "SwiftUI",
    "Kotlin Jetpack Compose",
    "NestJS",
    "Symfony",
  ],
  sameAs: [siteConfig.github, siteConfig.linkedin, siteConfig.pinterest],
};

export default function Home() {
  return (
    <main className="min-h-screen bg-[linear-gradient(135deg,#fff8fb_0%,#ffffff_34%,#ffffff_67%,#fff4f8_100%)] text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex flex-col gap-6 border-b py-6 sm:flex-row sm:items-center sm:justify-between">
          <a
            className="text-sm font-medium"
            href="#top"
            aria-label="Salma Mahjoub home"
          >
            Salma Mahjoub
          </a>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="flex flex-wrap gap-1 text-xs text-muted-foreground">
              <a
                className="px-2 py-1 transition-colors hover:text-foreground"
                href="#work"
              >
                Work
              </a>
              <a
                className="px-2 py-1 transition-colors hover:text-foreground"
                href="#skills"
              >
                Skills
              </a>
              <a
                className="px-2 py-1 transition-colors hover:text-foreground"
                href="#moodboard"
              >
                Moodboard
              </a>
              <a
                className="px-2 py-1 transition-colors hover:text-foreground"
                href="#github"
              >
                GitHub
              </a>
              <a
                className="px-2 py-1 transition-colors hover:text-foreground"
                href="#contact"
              >
                Contact
              </a>
            </nav>
            <div className="flex gap-1">
              {headerLinks.map(({ href, icon: Icon, label }) => (
                <Button asChild key={label} size="icon-xs" variant="ghost">
                  <a
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Icon aria-hidden="true" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </header>

        <section
          id="top"
          className="grid gap-12 py-20 sm:py-28 lg:grid-cols-[1.3fr_0.7fr]"
        >
          <div className="max-w-3xl">
            <p className="mb-5 text-sm text-muted-foreground">
              Mobile Information Systems engineering student in Tunis
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-6xl">
              Building mobile, AI, and data-driven digital products.
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Computer science engineering student at ESPRIT, specializing in
              mobile information systems. I work across SwiftUI, Kotlin Jetpack
              Compose, Flutter, React Native, NestJS, Symfony, Next.js, machine
              learning, NLP, and computer vision.
            </p>
            <div className="mt-10 flex flex-wrap gap-2">
              <Button asChild>
                <a href={`mailto:${siteConfig.email}`}>
                  Contact me
                  <EnvelopeSimple aria-hidden="true" />
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/salma-mahjoub-cv.pdf">
                  View CV
                  <FileText aria-hidden="true" />
                </a>
              </Button>
            </div>
          </div>

          <aside className="grid content-start gap-5 border-t pt-6 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <div>
              <p className="text-xs uppercase text-muted-foreground">Current</p>
              <p className="mt-2 text-sm leading-6">
                Seeking a 2026 engineering internship focused on development and
                delivery of a high-impact technical project.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Education</p>
              <p className="mt-2 text-sm leading-6">
                Computer Science Engineering Degree, ESPRIT. Mobile Information
                Systems specialization. Expected graduation: 2027.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Experience</p>
              <p className="mt-2 text-sm leading-6">
                ABAP developer intern at SIRYOS, SAP Gold Partner. Previous
                marketing and data analysis internship at Ipsos MENA.
              </p>
            </div>
            <div>
              <p className="text-xs uppercase text-muted-foreground">Languages</p>
              <p className="mt-2 text-sm leading-6">
                Arabic native, French B2, English B2, Spanish A2.
              </p>
            </div>
          </aside>
        </section>

        <section id="work" className="border-t py-14">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2 className="text-xl font-semibold">Selected work</h2>
            <p className="hidden text-sm text-muted-foreground sm:block">
              Mobile, AI, web, desktop, and embedded systems.
            </p>
          </div>

          <div className="divide-y">
            {projects.map((project) => (
              <article
                className="grid gap-3 py-6 sm:grid-cols-[0.8fr_1.2fr]"
                key={project.name}
              >
                <div>
                  {project.href ? (
                    <a
                      className="inline-flex items-center gap-1 font-medium underline-offset-4 hover:underline"
                      href={project.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {project.name}
                      <ArrowUpRight aria-hidden="true" className="size-3.5" />
                    </a>
                  ) : (
                    <h3 className="font-medium">{project.name}</h3>
                  )}
                  <p className="mt-2 text-xs leading-5 text-muted-foreground">
                    {project.meta}
                  </p>
                </div>
                <p className="text-sm leading-7 text-muted-foreground">
                  {project.summary}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="border-t py-14">
          <h2 className="mb-8 text-xl font-semibold">Skills</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {skillGroups.map(([group, ...skills]) => (
              <div className="border-t pt-4" key={group}>
                <h3 className="text-sm font-medium">{group}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                  {skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="moodboard" className="border-t py-14">
          <div className="mb-8 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <h2 className="text-xl font-semibold">Visual direction</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground">
                A curated Pinterest board used as a visual research layer for
                color restraint, interface atmosphere, editorial rhythm, and
                details that make digital products feel considered.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:justify-end">
              {visualNotes.map((note) => (
                <span
                  className="border bg-white/55 px-3 py-1 text-xs text-muted-foreground backdrop-blur"
                  key={note}
                >
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-stretch">
            <a
              className="group block overflow-hidden border bg-white/35 p-2 transition-colors hover:border-primary/50"
              href={siteConfig.pinterest}
              target="_blank"
              rel="noreferrer"
              aria-label="Open Salma Mahjoub on Pinterest"
            >
              <Image
                className="aspect-[16/9] w-full object-cover transition-transform duration-500 group-hover:scale-[1.015]"
                src="/pinterest-moodboard-v2.jpg"
                alt="Pinterest moodboard with travel, cafes, architecture, food, and fashion inspiration"
                width={1800}
                height={905}
                priority
              />
            </a>

            <div className="flex flex-col justify-between gap-8 border bg-white/55 p-6 backdrop-blur">
              <div>
                <p className="text-xs uppercase text-muted-foreground">Design cues</p>
                <div className="mt-5 grid gap-3">
                  {palette.map((color) => (
                    <div className="flex items-center gap-3" key={color.name}>
                      <span
                        className="size-5 border"
                        style={{ backgroundColor: color.value }}
                        aria-hidden="true"
                      />
                      <span className="text-sm text-muted-foreground">
                        {color.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm leading-7 text-muted-foreground">
                  The board balances warm personal references with a cleaner
                  product lens: soft contrast, precise color accents, tactile
                  materials, and travel details translated into interface
                  hierarchy.
                </p>
                <Button asChild className="mt-6" variant="outline">
                  <a
                    href={siteConfig.pinterest}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View Pinterest
                    <PinterestLogo aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="github" className="border-t py-14">
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">GitHub activity</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Recent contribution graph for public work and open-source
                activity.
              </p>
            </div>
            <Button asChild variant="outline">
              <a
                href={siteConfig.github}
                target="_blank"
                rel="noreferrer"
              >
                View profile
                <GithubLogo aria-hidden="true" />
              </a>
            </Button>
          </div>
          <div className="overflow-x-auto border bg-muted/20 p-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="h-auto min-h-32 w-[760px] max-w-none lg:w-full"
              src="https://ghchart.rshah.org/18181b/salma-mahjoub"
              alt="Salma Mahjoub GitHub contribution graph"
              loading="lazy"
            />
          </div>
        </section>

        <footer
          id="contact"
          className="flex flex-col gap-6 border-t py-8 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Based in Ariana, Tunisia. Available for engineering internships in
            mobile development, AI, and product-focused software work.
          </p>
          <div className="flex flex-wrap gap-2">
            {links.map(({ href, icon: Icon, label }) => (
              <Button asChild key={label} size="icon" variant="outline">
                <a
                  href={href}
                  aria-label={label}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                >
                  <Icon aria-hidden="true" />
                </a>
              </Button>
            ))}
          </div>
          <a
            className="text-sm font-medium underline-offset-4 hover:underline"
            href={siteConfig.phoneHref}
          >
            {siteConfig.phone}
          </a>
        </footer>
      </div>
    </main>
  );
}

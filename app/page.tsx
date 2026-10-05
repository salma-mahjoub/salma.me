import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

import { T } from "@/components/t";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { projects } from "@/lib/projects";
import { Polaroid } from "@/components/polaroid";
import { CommandPalette } from "@/components/command-palette";
import { ContactCard } from "@/components/contact-card";
import { Interests } from "@/components/interests";
import { PinFan } from "@/components/pin-fan";
import { GithubGraph } from "@/components/github-graph";
import { getContributions } from "@/lib/github";
import { Certificates } from "@/components/certificates";
import { certifications } from "@/lib/certifications";
import { Skills } from "@/components/skills";
import { Section } from "@/components/section";
import { SiteHeader } from "@/components/site-header";
import { siteConfig } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  url: siteConfig.url,
  email: siteConfig.email,
  telephone: siteConfig.phone,
  jobTitle: "Creative Mobile & Full-Stack Developer",
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


export default async function Home() {
  const contributions = await getContributions("salma-mahjoub");

  return (
    <main className="min-h-screen bg-background text-foreground">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <SiteHeader />

      <div className="mx-auto flex w-full max-w-5xl flex-col px-6 sm:px-8 lg:px-10">
        <Hero />
      </div>

      <Section
        id="skills"
        title={<T en="Skills" fr="Compétences" />}
        blurb={<T en="The languages, frameworks and tools I build with." fr="Les langages, frameworks et outils avec lesquels je construis." />}
      >
        <Reveal>
          <Skills projects={projects.map((p) => ({ name: p.name, meta: p.tags.join(", ") }))} />
        </Reveal>
      </Section>

      <Section
        id="experience"
        title={<T en="Experience" fr="Expérience" />}
        blurb={<T en="Real projects, hands-on experience, and the opportunities that came with them." fr="Des projets réels, de l'expérience concrète et les opportunités qui en ont découlé." />}
      >
        <Experience />
      </Section>

      <Section
        id="projects"
        title={<T en="Projects" fr="Projets" />}
        blurb={<T en="Internship builds, team work and academic projects." fr="Réalisations de stage, travail d'équipe et projets académiques." />}
      >
        <Projects items={projects} />
      </Section>

      <Section
        id="github"
        title="GitHub"
        blurb={<T en="A year of commits, one square per day." fr="Un an de commits, un carré par jour." />}
      >
        <Reveal>
          {contributions ? (
            <GithubGraph days={contributions.days} total={contributions.total} profile={siteConfig.github} />
          ) : (
            <div className="overflow-x-auto rounded-2xl border bg-card/60 p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="h-auto min-h-24 w-[640px] max-w-none lg:w-full"
                src="https://ghchart.rshah.org/cf4a8a/salma-mahjoub"
                alt="Salma Mahjoub GitHub contribution graph"
                loading="lazy"
              />
            </div>
          )}
        </Reveal>
      </Section>

      <Section
        id="certifications"
        title="Certifications"
        blurb={<T en="Badges and credentials from Cisco and AWS." fr="Badges et certifications de Cisco et d'AWS." />}
      >
        <Certificates items={certifications} />
      </Section>

      <Section
        id="beyond"
        title={<T en="Beyond the code" fr="Au-delà du code" />}
        blurb={<T en="Kanun player, Pinterest collector. Where my eye for detail comes from." fr="Joueuse de kanun, collectionneuse sur Pinterest. D'où vient mon œil pour le détail." />}
      >
        <div className="grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <Reveal className="beyond-wrap relative">
            <Polaroid />
            <div className="relative z-10 h-full">
              <PinFan href={siteConfig.pinterest} />
            </div>
          </Reveal>

          <Reveal delay={120}>
            <Interests />
          </Reveal>
        </div>
      </Section>

      <Section
        id="contact"
        title={<T en="Got an idea? Let's make it real." fr="Une idée ? Donnons-lui vie." />}
        blurb={<T en="Internships, collabs, or just geeking out about tech. My inbox is open." fr="Stages, collaborations, ou simplement parler tech. Ma boîte mail est ouverte." />}
        dark
      >
        <Reveal>
          <ContactCard />
        </Reveal>
      </Section>

      <footer className="keep-light bg-foreground text-background">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 border-t border-background/15 px-6 py-6 text-sm text-background/60 sm:px-8 lg:px-10">
          <span>© 2026 Salma Mahjoub</span>
          <a href="#top" className="back-top inline-flex items-center gap-1.5 hover:text-background">
            <T en="Back to top" fr="Retour en haut" />
            <ArrowUpRight aria-hidden="true" className="size-3.5 -rotate-45 text-primary" />
          </a>
        </div>
      </footer>
      <CommandPalette />
    </main>
  );
}

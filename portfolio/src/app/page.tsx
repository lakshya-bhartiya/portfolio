import { getHero, getAbout, getSkills, getExperience, getProjects, getCertifications, getAchievements, getContact } from "@/lib/api";
import type { Hero, ContactInfo } from "@/lib/types";
import { Navbar } from "@/components/Navbar";
import { LoadingScreen } from "@/components/LoadingScreen";
import { HeroSection } from "@/components/sections/Hero";
import { AboutSection } from "@/components/sections/About";
import { SkillsSection } from "@/components/sections/Skills";
import { TechMarquee } from "@/components/sections/TechMarquee";
import { ExperienceSection } from "@/components/sections/Experience";
import { ProjectsSection } from "@/components/sections/Projects";
import { CertificationsSection } from "@/components/sections/Certifications";
import { GithubStatsSection } from "@/components/sections/GithubStats";
import { AchievementsSection } from "@/components/sections/Achievements";
import { ContactSection } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";

function extractGithubUsername(url?: string): string | undefined {
  if (!url) return undefined;
  const match = url.match(/github\.com\/([^\/\?#]+)/i);
  return match?.[1];
}

// Fallback data shown if the backend hasn't been seeded yet, so the page never crashes blank.
const fallbackHero: Hero = {
  name: "Lakshya Bhartiya",
  role: "MERN Stack Developer",
  tagline:
    "Full Stack MERN Developer passionate about building scalable web and mobile applications using React, Next.js, Node.js, Express, MongoDB, and React Native.",
};
const fallbackContact: ContactInfo = { email: "you@example.com" };

export default async function Home() {
  const [hero, about, skills, experience, projects, certifications, achievements, contact] = await Promise.all([
    getHero(),
    getAbout(),
    getSkills(),
    getExperience(),
    getProjects(),
    getCertifications(),
    getAchievements(),
    getContact(),
  ]);

  const heroData = hero || fallbackHero;
  const contactData = contact || fallbackContact;
  const githubUsername = extractGithubUsername(heroData.socialLinks?.github || contactData.github);

  return (
    <>
      <LoadingScreen name={heroData.name} />
      <Navbar name={heroData.name.split(" ")[0]} />

      <main>
        <HeroSection hero={heroData} />
        {about && <AboutSection about={about} />}
        {skills && skills.length > 0 && (
          <>
            <SkillsSection skills={skills} />
            <TechMarquee skills={skills} />
          </>
        )}
        {experience && <ExperienceSection experience={experience} />}
        {projects && <ProjectsSection projects={projects} />}
        {certifications && <CertificationsSection certifications={certifications} />}
        <GithubStatsSection username={githubUsername} />
        {achievements && <AchievementsSection achievements={achievements} />}
        <ContactSection contact={contactData} />
      </main>

      <Footer hero={heroData} />
    </>
  );
}

import type { Hero, About, Skill, Experience, Project, Certification, Achievement, ContactInfo } from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Every fetch uses `cache: "no-store"` so that any change made in the admin
// panel shows up immediately without needing a redeploy. If your traffic is
// high and content changes rarely, swap this for `{ next: { revalidate: 60 } }`.
async function getJSON<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    const json = await res.json();
    return json.data as T;
  } catch (err) {
    console.error(`Failed to fetch ${path}:`, err);
    return null;
  }
}

export const getHero = () => getJSON<Hero>("/hero");
export const getAbout = () => getJSON<About>("/about");
export const getSkills = () => getJSON<Skill[]>("/skills");
export const getExperience = () => getJSON<Experience[]>("/experience");
export const getProjects = (featuredOnly = false) =>
  getJSON<Project[]>(`/projects${featuredOnly ? "?featured=true" : ""}`);
export const getCertifications = () => getJSON<Certification[]>("/certifications");
export const getAchievements = () => getJSON<Achievement[]>("/achievements");
export const getContact = () => getJSON<ContactInfo>("/contact");

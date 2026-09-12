import { EquationTicker, Hero } from "@/app/components/hero";
import { Profile } from "@/app/components/profile";
import { Education } from "@/app/components/education";
import { Experience } from "@/app/components/experience";
import { Skills } from "@/app/components/skills";
import { Projects } from "@/app/components/projects";
import { Awards } from "@/app/components/awards";
import { Contact, Footer } from "@/app/components/contact";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <EquationTicker />
      <Profile />
      <Education />
      <Experience />
      <Skills />
      <Projects />
      <Awards />
      <Contact />
      <Footer />
    </main>
  );
}

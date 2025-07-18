import Header from "@/components/ui/header";
import HeroSection from "@/components/sections/hero";
import AboutSection from "@/components/sections/about";
import SkillsSection from "@/components/sections/skills";
import ProjectsSection from "@/components/sections/projects";
import LeadershipSection from "@/components/sections/leadership";
import ContactSection from "@/components/sections/contact";
import Footer from "@/components/ui/footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <LeadershipSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}

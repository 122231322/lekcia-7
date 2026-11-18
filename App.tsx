import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PaletteModal from "./components/PaletteModal";
import HomePage from "./pages/HomePage";
import SkillsPage from "./pages/SkillsPage";
import ProjectsPage from "./pages/ProjectsPage";
import ExperiencePage from "./pages/ExperiencePage";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState<
    "home" | "skills" | "projects" | "experience"
  >(() => {
    const hash = window.location.hash;
    if (hash === "#/skills" || hash === "#skills") return "skills";
    if (hash === "#/projects" || hash === "#projects") return "projects";
    if (hash === "#/experience" || hash === "#experience") return "experience";
    return "home";
  });

  const [isPaletteOpen, setIsPaletteOpen] = useState(false);

  // Sync with browser back/forward and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash === "#/skills" || hash === "#skills") {
        setCurrentPage("skills");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#/projects" || hash === "#projects") {
        setCurrentPage("projects");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (hash === "#/experience" || hash === "#experience") {
        setCurrentPage("experience");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        setCurrentPage("home");
        if (hash && hash !== "#/" && hash !== "#") {
          setTimeout(() => {
            const el = document.querySelector(hash.replace("#/", "#"));
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const navigateToHome = () => {
    setCurrentPage("home");
    window.location.hash = "#/";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSkills = () => {
    setCurrentPage("skills");
    window.location.hash = "#/skills";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToProjects = () => {
    setCurrentPage("projects");
    window.location.hash = "#/projects";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToExperience = () => {
    setCurrentPage("experience");
    window.location.hash = "#/experience";
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToSection = (sectionId: string) => {
    if (currentPage !== "home") {
      setCurrentPage("home");
      window.location.hash = sectionId;
      setTimeout(() => {
        const el = document.querySelector(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.querySelector(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="portfolio-app">
      {/* Universal Top Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigateHome={navigateToHome}
        onNavigateSkills={navigateToSkills}
        onNavigateProjects={navigateToProjects}
        onNavigateExperience={navigateToExperience}
        onNavigateSection={navigateToSection}
        onOpenPaletteModal={() => setIsPaletteOpen(true)}
      />

      {/* Page Content */}
      <main className="portfolio-main">
        {currentPage === "skills" ? (
          <SkillsPage
            onNavigateHome={navigateToHome}
            onNavigateProjects={navigateToProjects}
            onNavigateSection={navigateToSection}
            onOpenPaletteModal={() => setIsPaletteOpen(true)}
          />
        ) : currentPage === "projects" ? (
          <ProjectsPage
            onNavigateHome={navigateToHome}
            onNavigateSkills={navigateToSkills}
            onNavigateSection={navigateToSection}
            onOpenPaletteModal={() => setIsPaletteOpen(true)}
          />
        ) : currentPage === "experience" ? (
          <ExperiencePage
            onNavigateHome={navigateToHome}
            onNavigateSkills={navigateToSkills}
            onNavigateProjects={navigateToProjects}
            onNavigateSection={navigateToSection}
            onOpenPaletteModal={() => setIsPaletteOpen(true)}
          />
        ) : (
          <HomePage
            onNavigateProjects={navigateToProjects}
            onOpenPaletteModal={() => setIsPaletteOpen(true)}
          />
        )}
      </main>

      {/* Universal Footer */}
      <Footer
        onNavigateHome={navigateToHome}
        onNavigateSkills={navigateToSkills}
        onNavigateProjects={navigateToProjects}
        onNavigateExperience={navigateToExperience}
        onNavigateSection={navigateToSection}
      />

      {/* Color Palette Modal */}
      <PaletteModal
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />

      {/* Floating Quick Action Button */}
      <button
        type="button"
        className="floating-palette-trigger"
        onClick={() => setIsPaletteOpen(true)}
        title="ნახე ჩემი ფერების პალიტრა 🎨"
      >
        <span className="floating-trigger-emoji">🎨</span>
        <span className="floating-trigger-text">პალიტრა</span>
      </button>
    </div>
  );
}

export default App;

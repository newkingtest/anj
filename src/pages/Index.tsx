import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import BirthdayCountdown from "@/components/BirthdayCountdown";
import MusicPlayer from "@/components/MusicPlayer";
import PhotoGallery from "@/components/PhotoGallery";
import FriendshipTimeline from "@/components/FriendshipTimeline";
import PersonalMessage from "@/components/PersonalMessage";
import InteractiveElements from "@/components/InteractiveElements";
import heroImage from "../assets/home.jpg";

const Index = () => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const [activeSection, setActiveSection] = useState("welcome");

  // Create floating particles
  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
    }));
    setParticles(newParticles);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Particle Background */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle animate-particle-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 backdrop-glass border-b border-border/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center gap-2 md:gap-4 flex-wrap">
            {[
              { id: "welcome", label: "🏠 Home", icon: "🏠" },
              { id: "countdown", label: "⏰ Countdown", icon: "⏰" },
              { id: "gallery", label: "📸 Gallery", icon: "📸" },
              { id: "music", label: "🎵 Music", icon: "🎵" },
              { id: "message", label: "💌 Letter", icon: "💌" },
              { id: "timeline", label: "📅 Timeline", icon: "📅" },
              { id: "interactive", label: "🎮 Fun", icon: "🎮" },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "outline"}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className={`btn-soft text-xs md:text-sm ${
                  activeSection === item.id ? "btn-celebration" : ""
                }`}
              >
                <span className="mr-1">{item.icon}</span>
                <span className="hidden md:inline">
                  {item.label.split(" ")[1]}
                </span>
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="welcome"
        className="min-h-screen flex items-center justify-center relative pt-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="animate-float">
            <h1 className="text-4xl md:text-7xl font-bold text-gradient mb-6 p-4">
              🎉 Happy Birthday! 🎉
            </h1>
            <p className="text-xl md:text-2xl text-foreground mb-8 animate-bounce-gentle">
              To the most amazing friend in the universe! ✨
            </p>
            <div className="flex justify-center gap-4 mb-12">
              <Button
                onClick={() => scrollToSection("countdown")}
                className="btn-celebration text-lg px-8 py-4"
              >
                🎁 Start Celebrating!
              </Button>
              <Button
                onClick={() => scrollToSection("message")}
                variant="outline"
                className="btn-soft text-lg px-8 py-4"
              >
                💌 Read Letter
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Section */}
      <section id="countdown" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Birthday Countdown ⏰
            </h2>
            <p className="text-xl text-muted-foreground">
              The excitement builds...
            </p>
          </div>
          <BirthdayCountdown />
        </div>
      </section>

      {/* Memory Lane Section */}
      <section
        id="gallery"
        className="py-20 px-4 bg-gradient-to-b from-card/10 to-background relative overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/30 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/30 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 text-sm font-medium bg-primary/10 text-primary rounded-full mb-4">
              Cherished Memories
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Memory Lane <span className="animate-pulse">📸</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Every picture tells a story, and these are the chapters of our
              incredible journey together
            </p>
          </div>

          <div className="relative">
            <PhotoGallery />
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <p className="text-sm text-muted-foreground">
                Click on any photo to relive the moment
              </p>
              <div className="mt-2 flex justify-center space-x-2">
                <span className="inline-block w-2 h-2 bg-primary/30 rounded-full"></span>
                <span className="inline-block w-2 h-2 bg-primary/50 rounded-full"></span>
                <span className="inline-block w-2 h-2 bg-primary/70 rounded-full"></span>
                <span className="inline-block w-2 h-2 bg-primary rounded-full"></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Music Player Section */}
      <section id="music" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Our Soundtrack 🎵
            </h2>
            <p className="text-xl text-muted-foreground">
              Songs that tell our story
            </p>
          </div>
          <MusicPlayer />
        </div>
      </section>

      {/* Personal Message Section */}
      <section id="message" className="py-20 px-4 bg-card/20">
        <div className="container mx-auto">
          <PersonalMessage />
        </div>
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gradient mb-4">
              Our Journey 📅
            </h2>
            <p className="text-xl text-muted-foreground">
              Friendship milestones & memories
            </p>
          </div>
          <FriendshipTimeline />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-border/30">
        <div className="container mx-auto text-center">
          <div className="card-glow p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gradient mb-4">
              Made with Love ❤️
            </h3>
            <p className="text-muted-foreground mb-6">
              This website was created especially for you, my amazing the the
              best friend 😘. Every detail was crafted with love, memories, and
              excitement for your special day!
            </p>
            <div className="flex justify-center gap-4 text-2xl">
              <span className="animate-bounce-gentle">🎂</span>
              <span
                className="animate-bounce-gentle"
                style={{ animationDelay: "0.2s" }}
              >
                🎈
              </span>
              <span
                className="animate-bounce-gentle"
                style={{ animationDelay: "0.4s" }}
              >
                🎉
              </span>
              <span
                className="animate-bounce-gentle"
                style={{ animationDelay: "0.6s" }}
              >
                ✨
              </span>
              <span
                className="animate-bounce-gentle"
                style={{ animationDelay: "0.8s" }}
              >
                🎁
              </span>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Happy Birthday, and here's to many more years of incredible
              friendship! 🥳
            </p>
          </div>
        </div>
      </footer>

      {/* Floating Action Button - Back to Top */}
      <Button
        onClick={() => scrollToSection("welcome")}
        className="fixed bottom-8 right-8 btn-celebration rounded-full w-14 h-14 text-2xl z-50 animate-bounce-gentle"
        title="Back to Top"
      >
        ⬆️
      </Button>
    </div>
  );
};

export default Index;

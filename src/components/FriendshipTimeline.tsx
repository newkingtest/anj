const FriendshipTimeline = () => {
  const milestones = [
    {
      year: "2020",
      title: "First Meeting",
      description: "The day our paths crossed and an amazing friendship began! Who knew that random encounter would lead to this? 🌟",
      icon: "👋"
    },
    {
      year: "2021",
      title: "Adventure Buddies",
      description: "Our first big adventure together - that spontaneous road trip that cemented our friendship forever! 🚗",
      icon: "🗺️"
    },
    {
      year: "2022",
      title: "Coffee Shop Regulars",
      description: "Found our perfect hangout spot! Countless hours of deep conversations and terrible jokes over amazing coffee ☕",
      icon: "☕"
    },
    {
      year: "2023",
      title: "Through Thick & Thin",
      description: "The year we proved true friendship means being there for each other no matter what. You're amazing! 💪",
      icon: "🤝"
    },
    {
      year: "2024",
      title: "Unbreakable Bond",
      description: "Here we are, stronger than ever! Thank you for being the most incredible friend anyone could ask for 💖",
      icon: "❤️"
    },
    {
      year: "2025",
      title: "Many More Adventures",
      description: "This is just the beginning! Can't wait to see what amazing memories we'll create this year and beyond! 🚀",
      icon: "🌟"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-accent"></div>
        
        {milestones.map((milestone, index) => (
          <div 
            key={index} 
            className={`relative flex items-center mb-12 animate-float ${
              index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-lg border-4 border-background animate-pulse-glow">
              {milestone.icon}
            </div>
            
            {/* Content */}
            <div className={`ml-20 md:ml-0 md:w-1/2 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
              <div className="card-glow p-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-gradient">{milestone.year}</span>
                  <h3 className="text-xl font-semibold text-foreground">{milestone.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{milestone.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendshipTimeline;
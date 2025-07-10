const FriendshipTimeline = () => {
  const milestones = [
    {
      date: "Jan 2022",
      title: "First Time I Saw You",
      description:
        "Heard your voice for the first time during your MATLAB viva — you were explaining simulations, wearing blue overhead headphones 🎧.",
      icon: "🎤",
    },
    {
      date: "May 2022",
      title: "First Meeting",
      description:
        "Our paths crossed and an amazing friendship began! Study sessions before exams became our thing 📚",
      icon: "👋",
    },
    {
      date: "Dec 2022",
      title: "Special Birthday",
      description:
        "Made my birthday the best one yet - a day full of joy and unforgettable memories 🎂",
      icon: "🎉",
    },
    {
      date: "Mar 2023",
      title: "Distance",
      description:
        "You went far away and started a new chapter, but true friendship knows no distance 🌍",
      icon: "✈️",
    },
    {
      date: "12 May 2023",
      title: "Dance Together",
      description:
        "We danced like nobody was watching - a beautiful moment of reconnection 💃",
      icon: "🕺",
    },
    {
      date: "22 Dec 2023",
      title: "Reunion",
      description:
        "You came back into my life, proving some bonds can never be broken 💫",
      icon: "✨",
    },
    {
      date: "1 Jan 2024",
      title: "New Beginnings",
      description:
        "Started the new year together, creating new memories and strengthening our bond 🎆",
      icon: "🎇",
    },
    {
      date: "26-27 Jan 2024",
      title: "Weekend Getaway",
      description:
        "Sanibarbada and Friendship Bar - two days of laughter and fun that brought us even closer 🍻",
      icon: "🍹",
    },
    {
      date: "12 May 2024",
      title: "Spiritual Visit",
      description:
        "Visited Swaminarayan Temple together, a peaceful and meaningful experience 🕉️",
      icon: "🛕",
    },
    {
      date: "19 May 2024",
      title: "Aga Place",
      description:
        "Another wonderful memory added to our collection of shared experiences 🌟",
      icon: "⭐",
    },
    {
      date: "14 July 2024",
      title: "Pataleshwar",
      description:
        "Explored the ancient caves together, discovering history and making our own story 🏛️",
      icon: "🔦",
    },
    {
      date: "15 Sep 2024",
      title: "Dagrusheth",
      description:
        "Visited the famous temple, another beautiful memory in our journey together 🕌",
      icon: "🕌",
    },
    {
      date: "6 Dec 2024",
      title: "Birthday Celebration",
      description:
        "Another year, another amazing birthday celebration together! 🎂✨",
      icon: "🎈",
    },
    {
      date: "22 Jun 2025",
      title: "Sinhagad Adventure",
      description:
        "Conquered Sinhagad Fort together - the view was amazing, but the company was even better! ⛰️",
      icon: "🥾",
    },
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
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            {/* Timeline Dot */}
            <div className="absolute left-8 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-lg border-4 border-background animate-pulse-glow">
              {milestone.icon}
            </div>

            {/* Content */}
            <div
              className={`ml-20 md:ml-0 md:w-1/2 ${
                index % 2 === 0 ? "md:pr-12" : "md:pl-12"
              }`}
            >
              <div className="card-glow p-6 group hover:scale-105 transition-transform duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-bold text-gradient">
                    {milestone.date}
                  </span>
                  <h3 className="text-xl font-semibold text-foreground">
                    {milestone.title}
                  </h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {milestone.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendshipTimeline;

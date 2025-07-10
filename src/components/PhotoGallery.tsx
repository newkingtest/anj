import { useState } from "react";
// Import your personal photos here
import photo1 from "../assets/hero-birthday.jpg"; // First meeting
import photo2 from "../assets/birthday-cake.jpg"; // Birthday celebration
import photo3 from "../assets/friends-sunset.jpg"; // Dance moment
import photo4 from "../assets/coffee-memories.jpg"; // Study together
import photo5 from "../assets/sanibaar.jpg"; // Sanibarbada
import photo6 from "../assets/friendship_park.jpg"; // Friendship bar
import photo7 from "../assets/swami-narayan.jpg"; // Swaminarayan Temple
import photo8 from "../assets/aga_place.jpg"; // Aga Place
import pataleshwar from "../assets/pataleshwar.jpg"; // Pataleshwar
import dagrusheth from "../assets/dagrusheth.jpg"; // Dagrusheth
import birthday_celebration from "../assets/birthday_celebration.jpg"; // Birthday Celebration
import senhagad from "../assets/senhagad.jpg"; // Senhagad

interface Photo {
  id: number;
  src: string;
  title: string;
  year: string;
  memory: string;
}

const PhotoGallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);

  const photos: Photo[] = [
    {
      id: 2,
      src: photo4,
      title: "Study Partners",
      year: "May 2022",
      memory:
        "Our study sessions before exams were special. I admired how you sought knowledge from everyone, and I felt privileged to be part of your learning journey. Your determination was truly inspiring! 📚",
    },
    {
      id: 3,
      src: photo1,
      title: "Best Birthday Ever",
      year: "Dec 2022",
      memory:
        "Making your birthday unforgettable was my pleasure! Your radiant smile that day was all the reward I needed. You bring so much light to the world. 🎉",
    },
    {
      id: 4,
      src: photo3,
      title: "Dance Together",
      year: "12 May 2023",
      memory:
        "That magical dance we shared rekindled our connection. For those few moments, nothing else mattered but the rhythm and your beautiful smile. 💃",
    },
    {
      id: 5,
      src: photo5,
      title: "Shaniwar Wada",
      year: "26 Jan 2024",
      memory:
        "At Shaniwar Wada, we met a kind-hearted Dadaji who blessed us with warmth and wisdom. He even clicked our picture, saying, 'Capture this moment — it will mean more someday.' A beautiful memory wrapped in unexpected kindness. 🙏📸",
    },
    {
      id: 6,
      src: photo6,
      title: "Friendship Park",
      year: "27 Jan 2024",
      memory:
        "A peaceful afternoon at Friendship Park, Pune — a place that truly lives up to its name. Surrounded by greenery and laughter, we created memories that will last a lifetime. 🌳✨",
    },
    {
      id: 7,
      src: photo7,
      title: "Swaminarayan Temple",
      year: "12 May 2024",
      memory:
        "The temple's peace paled in comparison to the serenity I feel in your presence. That day was truly special. 🙏",
    },
    {
      id: 8,
      src: photo8,
      title: "Aga Place",
      year: "19 May 2024",
      memory:
        "Simple moments at Aga Place became extraordinary because we shared them. Your company turns ordinary places into treasured memories. 💫",
    },
    {
      id: 9,
      src: pataleshwar,
      title: "Pataleshwar",
      year: "14 July 2024",
      memory:
        "Exploring ancient caves couldn't match the depth of our shared stories. Every adventure with you becomes legendary. 🕌",
    },
    {
      id: 10,
      src: dagrusheth,
      title: "Dagrusheth",
      year: "15 Sep 2024",
      memory:
        "The temple's divine energy was amplified by your presence. Our spiritual journeys together are always profound. 🕉️",
    },
    {
      id: 11,
      src: birthday_celebration,
      title: "Birthday Celebration",
      year: "6 Dec 2024",
      memory:
        "Another year of celebrating you! Your happiness is my greatest joy. May all your dreams unfold beautifully. 🎂",
    },
    {
      id: 12,
      src: senhagad,
      title: "Senhagad Adventure",
      year: "22 Jun 2025",
      memory:
        "Senhagad's breathtaking views were nothing compared to the beauty of our shared laughter. Here's to scaling new heights together! 🌄",
    },
  ];

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            className="card-glow overflow-hidden cursor-pointer group animate-float"
            style={{ animationDelay: `${index * 0.1}s` }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="relative">
              <img
                src={photo.src}
                alt={photo.title}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-semibold text-lg">{photo.title}</h3>
                <p className="text-sm opacity-80">{photo.year}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="card-glow max-w-2xl max-h-[90vh] overflow-auto">
            <img
              src={selectedPhoto.src}
              alt={selectedPhoto.title}
              className="w-full h-64 md:h-96 object-cover rounded-t-2xl"
            />
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gradient mb-2">
                {selectedPhoto.title}
              </h3>
              <p className="text-muted-foreground mb-4">{selectedPhoto.year}</p>
              <p className="text-foreground italic">"{selectedPhoto.memory}"</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;

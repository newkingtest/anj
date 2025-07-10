import { useState } from 'react';
import heroImage from '../assets/hero-birthday.jpg';
import birthdayImage from '../assets/birthday-cake.jpg';
import friendsImage from '../assets/friends-sunset.jpg';
import coffeeImage from '../assets/coffee-memories.jpg';
import adventureImage from '../assets/adventure-hike.jpg';
import partyImage from '../assets/party-celebration.jpg';

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
      id: 1,
      src: friendsImage,
      title: "Golden Hour Laughs",
      year: "2023",
      memory: "That evening when we talked for hours and watched the most beautiful sunset together. Pure magic! ✨"
    },
    {
      id: 2,
      src: coffeeImage,
      title: "Coffee Shop Chronicles",
      year: "2022",
      memory: "Our favorite spot where we solved the world's problems over endless cups of coffee ☕"
    },
    {
      id: 3,
      src: adventureImage,
      title: "Mountain Adventures",
      year: "2023",
      memory: "When we conquered that challenging hike and felt on top of the world! So proud of us 🏔️"
    },
    {
      id: 4,
      src: birthdayImage,
      title: "Birthday Celebrations",
      year: "2024",
      memory: "Last year's birthday surprise! The look on your face was priceless 🎂"
    },
    {
      id: 5,
      src: partyImage,
      title: "Epic Party Night",
      year: "2023",
      memory: "The night we danced until dawn and created memories that'll last forever 🎉"
    },
    {
      id: 6,
      src: heroImage,
      title: "Celebration Time",
      year: "2024",
      memory: "Here's to many more years of friendship, laughter, and incredible moments together! 🎈"
    }
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
              <h3 className="text-2xl font-bold text-gradient mb-2">{selectedPhoto.title}</h3>
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
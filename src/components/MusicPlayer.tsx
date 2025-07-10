import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';

interface Song {
  title: string;
  artist: string;
  memory: string;
  // Note: In a real implementation, you'd have actual audio files
  // For demo purposes, we'll simulate the music player
}

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [musicNotes, setMusicNotes] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const intervalRef = useRef<NodeJS.Timeout>();
  const progressRef = useRef<NodeJS.Timeout>();

  const songs: Song[] = [
    {
      title: "Good Times",
      artist: "Our Playlist",
      memory: "This always reminds me of our road trip adventures! 🚗"
    },
    {
      title: "Celebration",
      artist: "Best Friends Mix",
      memory: "Our go-to party song - remember that epic dance battle? 💃"
    },
    {
      title: "Memories",
      artist: "Friendship Vibes",
      memory: "The soundtrack to all our late-night conversations ☕"
    },
    {
      title: "Adventure Time",
      artist: "Squad Anthems",
      memory: "This played during our hiking trip to the mountains! 🏔️"
    }
  ];

  const createMusicNote = () => {
    if (isPlaying) {
      const newNote = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 100
      };
      setMusicNotes(prev => [...prev, newNote]);
      
      setTimeout(() => {
        setMusicNotes(prev => prev.filter(note => note.id !== newNote.id));
      }, 3000);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(createMusicNote, 500);
      progressRef.current = setInterval(() => {
        setProgress(prev => (prev >= 100 ? 0 : prev + 2));
      }, 200);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (progressRef.current) {
        clearInterval(progressRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // Add visual feedback for play/pause
    if (isPlaying) {
      console.log('🎵 Pausing music');
    } else {
      console.log('🎵 Playing:', songs[currentSong].title);
    }
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  return (
    <div className="relative">
      {/* Floating Music Notes */}
      {musicNotes.map((note) => (
        <div
          key={note.id}
          className="absolute text-2xl animate-float"
          style={{
            left: `${note.x}%`,
            top: `${note.y}%`,
            animation: 'float 3s ease-in-out infinite, particle-float 3s linear forwards'
          }}
        >
          ♪
        </div>
      ))}

      <div className="card-glow p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className={`w-32 h-32 mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center mb-4 relative overflow-hidden ${
            isPlaying ? 'animate-pulse-glow' : 'hover:scale-105'
          }`} style={{ transition: 'var(--transition-smooth)' }}>
            <div className="text-4xl relative z-10">🎵</div>
            {isPlaying && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                <div className="absolute inset-4 border-2 border-white/30 rounded-full animate-ping"></div>
              </>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-2">{songs[currentSong].title}</h3>
          <p className="text-muted-foreground">{songs[currentSong].artist}</p>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <Button 
            variant="outline" 
            size="icon" 
            onClick={prevSong} 
            className="btn-soft hover:bg-primary/20 hover:border-primary/50"
          >
            ⏮️
          </Button>
          <Button 
            size="icon" 
            onClick={togglePlay}
            className={`btn-celebration w-16 h-16 text-2xl relative overflow-hidden ${
              isPlaying ? 'animate-pulse shadow-lg' : 'hover:scale-110'
            }`}
            style={{ 
              boxShadow: isPlaying ? 'var(--glow-primary)' : 'none',
              transition: 'var(--transition-smooth)'
            }}
          >
            {isPlaying ? '⏸️' : '▶️'}
            {isPlaying && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            )}
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={nextSong} 
            className="btn-soft hover:bg-primary/20 hover:border-primary/50"
          >
            ⏭️
          </Button>
        </div>

        <div className="backdrop-glass p-4 rounded-xl">
          <p className="text-sm italic text-center text-muted-foreground">
            💭 "{songs[currentSong].memory}"
          </p>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{Math.floor(progress * 2.5 / 60)}:{String(Math.floor(progress * 2.5 % 60)).padStart(2, '0')}</span>
            <span>4:15</span>
          </div>
          <div className="w-full bg-muted/50 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-primary via-secondary to-accent h-2 rounded-full transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
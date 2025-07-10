import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";

interface Song {
  title: string;
  artist: string;
  memory: string;
  audioSrc: string;
  duration?: number;
}

const MusicPlayer = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [musicNotes, setMusicNotes] = useState<
    Array<{ id: number; x: number; y: number }>
  >([]);
  const [showMessage, setShowMessage] = useState(false);
  const [hasFirstPlayed, setHasFirstPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const animationRef = useRef<number>();
  const intervalRef = useRef<NodeJS.Timeout>();

  const songs: Song[] = [
    {
      title: "Good Times",
      artist: "Our Playlist",
      memory: "This always reminds me of our road trip adventures! 🚗",
      audioSrc: "/music/good-times.mp3",
    },
    {
      title: "Celebration",
      artist: "Best Friends Mix",
      memory: "Our go-to party song - remember that epic dance battle? 💃",
      audioSrc: "/music/celebration.mp3",
    },
    {
      title: "Memories",
      artist: "Friendship Vibes",
      memory: "The soundtrack to all our late-night conversations ☕",
      audioSrc: "/music/memories.mp3",
    },
    {
      title: "Adventure Time",
      artist: "Squad Anthems",
      memory: "This played during our hiking trip to the mountains! 🏔️",
      audioSrc: "/music/adventure-time.mp3",
    },
  ];

  const createMusicNote = () => {
    if (isPlaying) {
      const newNote = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: 100,
      };
      setMusicNotes((prev) => [...prev, newNote]);

      setTimeout(() => {
        setMusicNotes((prev) => prev.filter((note) => note.id !== newNote.id));
      }, 3000);
    }
  };

  // Format time in MM:SS format
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle audio playback
  // Handle click outside to hide message
  useEffect(() => {
    if (!showMessage) return;

    const handleClick = () => {
      setShowMessage(false);
    };

    // Add a small delay to prevent immediate hiding on the click that shows the message
    const timer = setTimeout(() => {
      document.addEventListener("click", handleClick, { once: true });
    }, 100);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClick);
    };
  }, [showMessage]);

  useEffect(() => {
    const audio = audioRef.current;

    // Set up event listeners
    const setAudioData = () => {
      setDuration(audio.duration);
      setCurrentTime(audio.currentTime);
    };

    const setAudioTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      animationRef.current = requestAnimationFrame(setAudioTime);
    };

    const handleEnded = () => {
      nextSong();
    };

    audio.addEventListener("loadeddata", setAudioData);
    audio.addEventListener("timeupdate", setAudioTime);
    audio.addEventListener("ended", handleEnded);

    // Cleanup function
    return () => {
      audio.removeEventListener("loadeddata", setAudioData);
      audio.removeEventListener("timeupdate", setAudioTime);
      audio.removeEventListener("ended", handleEnded);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Handle song changes
  useEffect(() => {
    const audio = audioRef.current;

    // Pause and reset current audio
    audio.pause();
    audio.currentTime = 0;

    // Load new song
    if (songs[currentSong]?.audioSrc) {
      audio.src = songs[currentSong].audioSrc;
      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      }
    }

    // Cleanup on unmount
    return () => {
      audio.pause();
    };
  }, [currentSong]);

  // Handle play/pause
  useEffect(() => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.play().catch((error) => {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      });
      intervalRef.current = setInterval(createMusicNote, 500);
    } else {
      audio.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else {
      audioRef.current.play();
      intervalRef.current = setInterval(createMusicNote, 300);

      // Show message on first play
      if (!hasFirstPlayed) {
        setHasFirstPlayed(true);
        setShowMessage(true);
      }
    }
    setIsPlaying(!isPlaying);
  };

  const nextSong = () => {
    setCurrentSong((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const prevSong = () => {
    setCurrentSong((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(parseFloat(e.target.value));
  };

  return (
    <div className="relative">
      {/* First play message */}
      {showMessage && hasFirstPlayed && !isPlaying && (
        <div
          className="absolute -top-16 left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-center px-6 py-3 rounded-xl shadow-lg text-base font-semibold animate-bounce z-50 whitespace-nowrap cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        >
          तुम्हारी प्यारी आवाज़ है, फिर किसी और के गाने क्यों सुनो? 💕
        </div>
      )}

      {/* Floating Music Notes */}
      {musicNotes.map((note) => (
        <div
          key={note.id}
          className="absolute text-2xl animate-float"
          style={{
            left: `${note.x}%`,
            top: `${note.y}%`,
            animation:
              "float 3s ease-in-out infinite, particle-float 3s linear forwards",
          }}
        >
          ♪
        </div>
      ))}

      <div className="card-glow p-8 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div
            className={`w-32 h-32 mx-auto bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center mb-4 relative overflow-hidden ${
              isPlaying ? "animate-pulse-glow" : "hover:scale-105"
            }`}
            style={{ transition: "var(--transition-smooth)" }}
          >
            <div className="text-4xl relative z-10">🎵</div>
            {isPlaying && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                <div className="absolute inset-4 border-2 border-white/30 rounded-full animate-ping"></div>
              </>
            )}
          </div>
          <h3 className="text-2xl font-bold text-gradient mb-2">
            {songs[currentSong].title}
          </h3>
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
              isPlaying ? "animate-pulse shadow-lg" : "hover:scale-110"
            }`}
            style={{
              boxShadow: isPlaying ? "var(--glow-primary)" : "none",
              transition: "var(--transition-smooth)",
            }}
          >
            {isPlaying ? "⏸️" : "▶️"}
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
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleProgressChange}
            className="w-full h-2 bg-muted/50 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, var(--primary) ${progress}%, var(--muted) ${progress}%)`,
              WebkitAppearance: "none",
              height: "8px",
              borderRadius: "9999px",
              outline: "none",
              transition: "background 0.2s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;

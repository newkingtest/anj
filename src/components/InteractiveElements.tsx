import { useState } from 'react';
import { Button } from './ui/button';

const InteractiveElements = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string }>>([]);
  const [currentSurprise, setCurrentSurprise] = useState<string | null>(null);
  const [balloonSurprises, setBalloonSurprises] = useState<Array<{ id: number; message: string; emoji: string; x: number }>>([]);

  const surprises = [
    "🎓 Remember our study sessions at the library? Your dedication to learning is truly inspiring! 📚",
    "💃 That time we danced like no one was watching at the college fest - pure magic! ✨",
    "🎂 Your birthday surprise was one of my favorite memories - your smile made it all worth it! 🥳",
    "🌅 Our evening at Friendship Park, just talking about life - those are the moments I cherish the most 💖",
    "🏛️ Exploring historical places with you is always an adventure - you make every moment special! 🗺️",
    "☕ Our coffee dates where we solve world problems and share our dreams - never change! 💭",
    "📸 Every photo we take together becomes a treasured memory - here's to many more! 📷",
    "🎵 The way you light up when you talk about your passions is absolutely beautiful to see ✨",
    "🤝 Through thick and thin, your friendship has been my anchor - thank you for everything 🙏",
    "🌟 You have this incredible ability to make ordinary moments feel extraordinary - that's your superpower! 💫"
  ];

  const createConfetti = () => {
    const colors = ['#8B5CF6', '#EC4899', '#F59E0B', '#10B981', '#3B82F6'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));

    setConfetti(prev => [...prev, ...newConfetti]);

    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.some(nc => nc.id === c.id)));
    }, 3000);
  };

  const showRandomSurprise = () => {
    const randomSurprise = surprises[Math.floor(Math.random() * surprises.length)];
    setCurrentSurprise(randomSurprise);
    createConfetti();
    
    setTimeout(() => {
      setCurrentSurprise(null);
    }, 5000);
  };

  const balloonPop = (e: React.MouseEvent, balloonIndex: number) => {
    const balloonSurprises = [
      { message: "🎂 Your birthday surprise was the highlight of my year!", emoji: "🎂", colors: ['#FF6B9D', '#C44569'] },
      { message: "✨ Your smile could light up the darkest room!", emoji: "✨", colors: ['#FFA726', '#FF7043'] },
      { message: "🎵 Our impromptu dance sessions are my favorite memories!", emoji: "💃", colors: ['#9C27B0', '#673AB7'] },
      { message: "📚 Study sessions with you are always productive and fun!", emoji: "📚", colors: ['#2196F3', '#3F51B5'] },
      { message: "🌅 Our friendship is my most treasured adventure!", emoji: "💖", colors: ['#FF4081', '#E91E63'] }
    ];

    const currentBalloon = balloonSurprises[balloonIndex];
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    
    // Create confetti with balloon-specific colors
    const newConfetti = Array.from({ length: 20 }, (_, i) => ({
      id: Date.now() + i,
      x: x + (Math.random() - 0.5) * 30,
      color: currentBalloon.colors[Math.floor(Math.random() * currentBalloon.colors.length)]
    }));

    setConfetti(prev => [...prev, ...newConfetti]);

    // Show balloon-specific surprise message
    const newSurprise = {
      id: Date.now(),
      message: currentBalloon.message,
      emoji: currentBalloon.emoji,
      x: x
    };

    setBalloonSurprises(prev => [...prev, newSurprise]);

    // Clean up confetti
    setTimeout(() => {
      setConfetti(prev => prev.filter(c => !newConfetti.some(nc => nc.id === c.id)));
    }, 2000);

    // Clean up balloon surprise
    setTimeout(() => {
      setBalloonSurprises(prev => prev.filter(s => s.id !== newSurprise.id));
    }, 4000);
  };

  return (
    <div className="relative min-h-screen">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className="absolute w-2 h-2 animate-confetti-fall pointer-events-none"
          style={{
            left: `${piece.x}%`,
            backgroundColor: piece.color,
            top: '-10px'
          }}
        />
      ))}

      {/* Balloon Surprise Messages */}
      {balloonSurprises.map((surprise) => (
        <div
          key={surprise.id}
          className="absolute top-20 backdrop-glass p-4 rounded-xl animate-scale-in pointer-events-none z-30"
          style={{
            left: `${Math.max(10, Math.min(80, surprise.x - 10))}%`,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="text-center">
            <div className="text-3xl mb-2">{surprise.emoji}</div>
            <p className="text-sm font-medium text-foreground max-w-xs">{surprise.message}</p>
          </div>
        </div>
      ))}

      <div className="max-w-4xl mx-auto text-center space-y-12">
        {/* Interactive Balloons */}
          <div className="mb-12">
          <h3 className="text-2xl font-bold text-gradient mb-6">Pop the Balloons for Surprises! 🎈</h3>
          <div className="flex justify-center gap-4 flex-wrap">
            {['🎈', '🎈', '🎈', '🎈', '🎈'].map((balloon, index) => {
              const animations = ['animate-balloon-float', 'animate-balloon-swing', 'animate-balloon-wobble', 'animate-balloon-pulse', 'animate-balloon-dance'];
              return (
                <button
                  key={index}
                  onClick={(e) => balloonPop(e, index)}
                  className={`text-6xl hover:scale-110 active:scale-90 transition-transform duration-200 ${animations[index]}`}
                  style={{ 
                    animationDelay: `${index * 0.3}s`,
                    filter: `hue-rotate(${index * 72}deg)`
                  }}
                >
                  {balloon}
                </button>
              );
            })}
          </div>
        </div>

        {/* Surprise Button */}
        <div className="card-glow p-8">
          <h3 className="text-2xl font-bold text-gradient mb-4">Memory Lane Button 🎭</h3>
          <p className="text-muted-foreground mb-6">
            Click to relive our favorite moments together!
          </p>
          <Button onClick={showRandomSurprise} className="btn-celebration text-lg px-8 py-4">
            ✨ Surprise Me! ✨
          </Button>
        </div>

        {/* Surprise Message Display */}
        {currentSurprise && (
          <div className="card-glow p-6 backdrop-glass animate-scale-in">
            <div className="text-xl mb-4">🎁 Surprise!</div>
            <p className="text-lg text-foreground italic">{currentSurprise}</p>
          </div>
        )}

        {/* Party Mode Button */}
        <div className="card-glow p-8">
          <h3 className="text-2xl font-bold text-gradient mb-4">Celebration Time! 🎉</h3>
          <p className="text-muted-foreground mb-6">
            Let's make it rain happiness!
          </p>
          <Button onClick={createConfetti} className="btn-celebration text-lg px-8 py-4">
            🎊 Let's Party! 🎊
          </Button>
        </div>

        {/* Fun Facts */}
        <div className="card-glow p-8">
          <h3 className="text-2xl font-bold text-gradient mb-6">Our Friendship in Numbers 📊</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary">3+</div>
              <div className="text-sm text-muted-foreground">Years of Friendship</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-secondary">100+</div>
              <div className="text-sm text-muted-foreground">Cups of Coffee Shared</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Memories Created</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-celebration">100%</div>
              <div className="text-sm text-muted-foreground">Best Friend Material</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveElements;
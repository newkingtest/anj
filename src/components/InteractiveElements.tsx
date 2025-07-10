import { useState } from 'react';
import { Button } from './ui/button';

const InteractiveElements = () => {
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string }>>([]);
  const [currentSurprise, setCurrentSurprise] = useState<string | null>(null);
  const [balloonSurprises, setBalloonSurprises] = useState<Array<{ id: number; message: string; emoji: string; x: number }>>([]);

  const surprises = [
    "🎉 Remember when you tried to cook that 'simple' recipe and nearly burned down the kitchen? Classic you! 😂",
    "✨ You have the most contagious laugh - it literally makes everyone around you smile instantly! 😊",
    "🌟 That time you spent 3 hours helping me pick the perfect outfit for my date - you're the best wingperson ever! 👗",
    "💫 Your dance moves at karaoke night are LEGENDARY! We need a repeat performance! 💃",
    "🎭 You quote movies at the most random times and somehow it's always perfectly timed! 🎬",
    "🎨 Your creativity amazes me every single day - from your art to your problem-solving skills! 🖌️",
    "🍕 We've probably eaten our weight in pizza together and I regret nothing! 🍕",
    "🎵 You introduced me to the best music - my playlist is 90% songs you recommended! 🎧",
    "🏃‍♂️ Your determination to reach your goals inspires me to be better every day! 💪",
    "🌈 You see the bright side in everything - your optimism is absolutely magical! ☀️"
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
      { message: "🎂 Remember your epic cake fail? Still laughing about it!", emoji: "🎂", colors: ['#FF6B9D', '#C44569'] },
      { message: "✨ You light up every room you enter - literally magical!", emoji: "✨", colors: ['#FFA726', '#FF7043'] },
      { message: "🎵 That karaoke night when you sang off-key but with full confidence!", emoji: "🎵", colors: ['#9C27B0', '#673AB7'] },
      { message: "🌟 Your laugh is more contagious than any virus!", emoji: "🌟", colors: ['#FFD54F', '#FFC107'] },
      { message: "🎁 Best gift giver award goes to you - always so thoughtful!", emoji: "🎁", colors: ['#4CAF50', '#8BC34A'] }
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
          <h3 className="text-2xl font-bold text-gradient mb-4">Mystery Button 🎭</h3>
          <p className="text-muted-foreground mb-6">
            Click for a random memory, compliment, or inside joke!
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
          <h3 className="text-2xl font-bold text-gradient mb-4">Party Mode! 🎉</h3>
          <p className="text-muted-foreground mb-6">
            Ready to celebrate? Let the confetti rain!
          </p>
          <Button onClick={createConfetti} className="btn-celebration text-lg px-8 py-4">
            🎊 Let's Party! 🎊
          </Button>
        </div>

        {/* Fun Facts */}
        <div className="card-glow p-8">
          <h3 className="text-2xl font-bold text-gradient mb-6">Fun Friendship Stats 📊</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-primary">500+</div>
              <div className="text-sm text-muted-foreground">Laughs Shared</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-secondary">50+</div>
              <div className="text-sm text-muted-foreground">Adventures Together</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-accent">∞</div>
              <div className="text-sm text-muted-foreground">Inside Jokes</div>
            </div>
            <div className="backdrop-glass p-4 rounded-xl">
              <div className="text-3xl font-bold text-celebration">100%</div>
              <div className="text-sm text-muted-foreground">Awesome Friend Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveElements;
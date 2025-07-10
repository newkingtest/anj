import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const BirthdayCountdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isBirthdayToday, setIsBirthdayToday] = useState(false);

  useEffect(() => {
    const targetDate = new Date("2025-06-11T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
        setIsBirthdayToday(false);
      } else {
        setIsBirthdayToday(true);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isBirthdayToday) {
    return (
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gradient animate-pulse-glow p-4 mb-4">
          🎉 HAPPY BIRTHDAY! 🎉
        </h1>
        <p className="text-2xl text-celebration animate-bounce-gentle">
          Today is your special day! Let's celebrate! ✨
        </p>
      </div>
    );
  }

  return (
    <div className="text-center">
      <h2 className="text-3xl font-semibold text-foreground mb-6">
        Countdown to Your Special Day
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
        {[
          { value: timeLeft.days, label: "Days" },
          { value: timeLeft.hours, label: "Hours" },
          { value: timeLeft.minutes, label: "Minutes" },
          { value: timeLeft.seconds, label: "Seconds" },
        ].map((item, index) => (
          <div
            key={index}
            className="card-glow p-6 text-center animate-float"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <div className="text-4xl font-bold text-gradient mb-2">
              {item.value}
            </div>
            <div className="text-muted-foreground text-sm uppercase tracking-wider">
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BirthdayCountdown;

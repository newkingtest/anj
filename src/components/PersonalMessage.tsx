import { useState, useEffect } from 'react';

const PersonalMessage = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  const message = `Dear Amazing Friend,

As I sit here writing this message for your special day, my heart is filled with so much gratitude and joy. I can't believe how lucky I am to have you in my life!

From the moment we met, you've brought so much light, laughter, and adventure into my world. You're not just a friend – you're family, a partner in crime, and the most incredible human being I know.

I cherish every memory we've made together: our spontaneous adventures, our deep 2 AM conversations, our inside jokes that make us laugh until our stomachs hurt, and even the quiet moments when we just enjoy each other's company.

Thank you for being authentically you – kind, funny, supportive, and absolutely wonderful. Thank you for celebrating my wins, comforting me during tough times, and always believing in me even when I don't believe in myself.

On your birthday, I want you to know how much you mean to me and how grateful I am for our friendship. You deserve all the happiness, love, and amazing adventures this new year will bring.

Here's to another year of unforgettable memories, endless laughter, and the best friendship anyone could ask for!

Happy Birthday, you incredible human! 🎉✨

With all my love and best wishes,
Your Best Friend Forever ❤️`;

  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 30); // Adjust speed here (lower = faster)

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card-glow p-8 md:p-12 backdrop-glass">
        <h2 className="text-3xl font-bold text-gradient text-center mb-8">A Letter From The Heart 💌</h2>
        
        <div className="prose prose-lg max-w-none">
          <div className="text-foreground leading-relaxed text-lg whitespace-pre-line font-serif">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-0.5 h-6 bg-primary ml-1 animate-pulse"></span>
            )}
          </div>
        </div>

        {!isTyping && (
          <div className="text-center mt-8 animate-float">
            <div className="text-4xl mb-4">💝</div>
            <p className="text-celebration font-semibold text-xl">
              Made with love, just for you! ✨
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalMessage;
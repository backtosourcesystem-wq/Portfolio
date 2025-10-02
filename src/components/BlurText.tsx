import { useEffect, useState } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'words' | 'letters';
  direction?: 'top' | 'bottom';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText = ({
  text,
  delay = 200,
  animateBy = 'letters',
  direction = 'top',
  onAnimationComplete,
  className = ''
}: BlurTextProps) => {
  const [visibleElements, setVisibleElements] = useState<Set<number>>(new Set());

  useEffect(() => {
    if (animateBy === 'words') {
      const words = text.split(' ');
      let currentIndex = 0;

      const showNextWord = () => {
        if (currentIndex >= words.length) {
          onAnimationComplete?.();
          return;
        }

        setVisibleElements(prev => new Set([...prev, currentIndex]));

        setTimeout(() => {
          currentIndex++;
          showNextWord();
        }, delay);
      };

      // Start animation after a brief delay
      setTimeout(showNextWord, 100);
    } else {
      // Letter animation
      let currentIndex = 0;

      const showNextLetter = () => {
        if (currentIndex >= text.length) {
          onAnimationComplete?.();
          return;
        }

        setVisibleElements(prev => new Set([...prev, currentIndex]));

        setTimeout(() => {
          currentIndex++;
          showNextLetter();
        }, delay);
      };

      // Start animation after a brief delay
      setTimeout(showNextLetter, 100);
    }
  }, [text, delay, animateBy, onAnimationComplete]);

  const words = text.split(' ');

  return (
    <div className={`inline-block ${className}`}>
      {animateBy === 'words' ? (
        <span>
          {words.map((word, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-500 ${
                visibleElements.has(index)
                  ? 'opacity-100 blur-none translate-y-0'
                  : 'opacity-20 blur-sm ' + (direction === 'top' ? '-translate-y-2' : 'translate-y-2')
              }`}
              style={{
                transitionDelay: `${index * delay}ms`
              }}
            >
              {word}
              {index < words.length - 1 && ' '}
            </span>
          ))}
        </span>
      ) : (
        <span>
          {text.split('').map((letter, index) => (
            <span
              key={index}
              className={`inline-block transition-all duration-500 ${
                visibleElements.has(index)
                  ? 'opacity-100 blur-none translate-y-0'
                  : 'opacity-20 blur-sm ' + (direction === 'top' ? '-translate-y-2' : 'translate-y-2')
              }`}
              style={{
                transitionDelay: `${index * delay}ms`
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </span>
      )}
    </div>
  );
};

export default BlurText;

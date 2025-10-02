import { useState, useEffect } from 'react';
import { ArrowRight, Play } from 'lucide-react';
import BlurText from './BlurText';

const Hero = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [showSystem, setShowSystem] = useState(false);
  
  const quotes = [
    { text: "Ideas", highlight: "Ideas", rest: " into Reality" },
    { text: "From Concept", highlight: "From Concept", rest: " to Code" },
    { text: "Engineering", highlight: "Engineering", rest: " for Tomorrow" },
    { text: "Building", highlight: "Building", rest: " the Digital World" },
    { text: "Innovation", highlight: "Innovation", rest: " in Every Line" },
    { text: "Where", highlight: "Where", rest: " Your Vision Comes to Life" },
    { text: "Solutions", highlight: "Solutions", rest: " Unlocked" },
    { text: "Crafting", highlight: "Crafting", rest: " Digital Excellence" }
  ];
  
  useEffect(() => {
    const currentQuote = quotes[quoteIndex];
    const fullText = currentQuote.text + currentQuote.rest;
    
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    } else {
      // When typing is complete, wait 7 seconds then switch to next quote
      const switchTimeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
        setQuoteIndex(prev => (prev + 1) % quotes.length);
      }, 7000);
      
      return () => clearTimeout(switchTimeout);
    }
  }, [currentIndex, quoteIndex, quotes]);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWatchDemo = () => {
    // Placeholder for demo functionality
    console.log('contact us clicked');
  };

  const handleAnimationComplete = () => {
    console.log('Hero animation completed!');
    // Show "System" text with 200ms delay after "Back To Source" animation completes
    setTimeout(() => {
      setShowSystem(true);
    }, 200);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0" style={{ backgroundColor: '#FAF9F6' }} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000" />
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-2000" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-orange-200 mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-slate-700">Building the Future Today</span>
          </div>

         {/* Company Name */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Welcome to</h2>
            <div className="flex flex-col items-center">
              <div className="inline-flex items-start">
                <BlurText
                  text="Back To Source"
                  delay={150}
                  animateBy="words"
                  direction="top"
                  onAnimationComplete={handleAnimationComplete}
                  className="text-6xl md:text-8xl font-bold text-slate-800 nanum-myeongjo-regular"
                />
                {showSystem && (
                  <BlurText
                    text="sys"
                    delay={150}
                    animateBy="words"
                    direction="top"
                    className="text-xl md:text-2xl font-bold text-slate-800 nanum-myeongjo-regular ml-1"
                  />
                )}
              </div>
            </div>
            {showSystem && (
              <p className="text-lg md:text-xl text-slate-600 mt-4 italic">
                
              </p>
            )}
          </div>

          {/* Main Headline with typing effect */}
          <h1 className="text-2xl md:text-3xl font-light text-slate-600 mb-6 leading-tight">
            <span 
              dangerouslySetInnerHTML={{
                __html: displayedText.replace(
                  quotes[quoteIndex].highlight,
                  `<span class="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent font-semibold">${quotes[quoteIndex].highlight}</span>`
                )
              }}
            />
            <span className="animate-pulse text-orange-500">|</span>
          </h1>

          {/* Sub-headline */}
          <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your ideas into powerful digital solutions. We create cutting-edge web applications
            that drive growth and revolutionize user experiences.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Services
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={scrollToContact}
              className="group inline-flex items-center px-8 py-4 bg-white/90 backdrop-blur-sm text-slate-800 font-semibold rounded-full border-2 border-transparent hover:border-orange-300 hover:shadow-lg transition-all duration-300"
            >
              <Play className="mr-2 h-5 w-5" />
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

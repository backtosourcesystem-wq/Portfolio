import { useState, useEffect, useRef } from 'react';
import { Users, Target, Lightbulb, Award, DollarSign } from 'lucide-react';

const About = ({ onShowLogin }: { onShowLogin: () => void }) => {
  const [hasAnimated, setHasAnimated] = useState(false);
  const statsRef = useRef(null);

  const stats = [
    { number: 50, suffix: "+", label: "Projects Completed" },
    { number: 15, suffix: "+", label: "Clints" },
    { number: 1, suffix: "+", label: "Years Experience" },
    { number: 100, suffix: "%", label: "Client Satisfaction" }
  ];

  const values = [
    {
      icon: <Lightbulb className="h-8 w-8 text-orange-500" />,
      title: "Innovation First",
      description: "We push the boundaries of technology to deliver cutting-edge solutions that set new industry standards."
    },
    {
      icon: <Users className="h-8 w-8 text-orange-500" />,
      title: "Client-Centric",
      description: "Your vision and goals are at the heart of everything we do. We build lasting partnerships based on trust."
    },
    {
      icon: <Target className="h-8 w-8 text-orange-500" />,
      title: "Results Driven",
      description: "Every project is measured by its impact on your business. We focus on delivering tangible results."
    },
    {
      icon: <Award className="h-8 w-8 text-orange-500" />,
      title: "Excellence",
      description: "From concept to deployment, we maintain the highest standards of quality and craftsmanship."
    },
    {
      icon: <DollarSign className="h-8 w-8 text-orange-500" />,
      title: "Value for Money",
      description: "We deliver exceptional quality solutions at competitive prices, ensuring maximum return on your investment."
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const CountingNumber = ({ end, suffix, duration = 2000 }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!hasAnimated) return;

      let startTime;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = timestamp - startTime;
        const percentage = Math.min(progress / duration, 1);
        
        setCount(Math.floor(end * percentage));

        if (percentage < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };

      requestAnimationFrame(animate);
    }, [hasAnimated, end, duration]);

    return (
      <span>
        {count}
        {suffix}
      </span>
    );
  };

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-orange-100 rounded-full mb-4">
            <span className="w-2 h-2 bg-orange-500 rounded-full mr-2"></span>
            <span className="text-sm font-medium text-orange-700">About Us</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Transforming Ideas Into
            <span className="bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent"> Digital Reality</span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We're a passionate team of developers, designers, and innovators dedicated to creating
            exceptional digital experiences that drive business growth and user engagement.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center p-6 rounded-2xl backdrop-blur-md bg-gradient-to-br from-white/30 to-white/10 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:from-white/50 hover:to-white/30 hover:border-orange-200/60"
              style={{
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                boxShadow: '0 8px 32px 0 rgba(251, 146, 60, 0.15)'
              }}
            >
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-2">
                <CountingNumber end={stat.number} suffix={stat.suffix} />
              </div>
              <div className="text-slate-700 font-medium text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Story Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h3 className="text-3xl font-bold text-slate-800 mb-6">Our Story</h3>
            <p className="text-lg text-slate-600 mb-4 leading-relaxed">
              Founded with a vision to bridge the gap between innovative ideas and practical
              digital solutions, Back To Source System is growing from a small startup to a trusted
              partner for businesses worldwide.
            </p>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Our journey began with a simple belief: great technology should be accessible,
              scalable, and transformative. Today, we continue to push boundaries while
              maintaining our core values of quality, integrity, and client satisfaction.
            </p>
            <div className="flex items-center text-orange-500 font-semibold text-sm">
              <span className="w-12 h-0.5 bg-gradient-to-r from-orange-500 to-red-500 mr-4"></span>
              Building the future, one line of code at a time
            </div>
          </div>
          <div className="flex justify-center items-center">
            <div className="relative group">
              <div className="w-72 h-72 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] transition-shadow border border-white/50">
                <img
                  src="/images/logo.png"
                  alt="Company Logo"
                  className="w-60 h-60 object-contain transform group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-orange-600 text-xl font-bold shadow-lg border border-white/30">
                1+
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-slate-800 mb-4">Our Values</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do and shape how we work with our clients.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((value, index) => (
              <div key={index} className="text-center p-6 bg-gradient-to-br from-white to-slate-50 rounded-2xl border border-slate-200 hover:border-orange-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                <div className="flex justify-center mb-4">
                  {value.icon}
                </div>
                <h4 className="text-lg font-semibold text-slate-800 mb-3">
                  {value.title}
                </h4>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-5"></div>
            <div className="relative z-10">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h3>
              <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto">
                Let's discuss how we can bring your vision to life with our expertise and passion.
              </p>
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-orange-500 px-10 py-4 rounded-full font-semibold hover:bg-slate-100 hover:shadow-lg transition-all hover:scale-105"
              >
                Get In Touch
              </button>
            </div>
          </div>
        </div>

        {/* Ongoing Projects Section */}
        <div className="text-center mt-16 bg-slate-50 py-12 rounded-3xl">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
              Already Working With Us?
            </h3>
            <p className="text-xl text-slate-600 mb-8">
              Access your project dashboard to track progress, review updates, and provide feedback in real-time
            </p>
            <button
              onClick={onShowLogin}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-10 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105 mb-6"
            >
              Access Client Portal
            </button>
            <p className="text-sm text-slate-500">
              Login credentials are securely delivered via email upon project initiation
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

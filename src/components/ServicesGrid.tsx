import { useEffect, useRef, useState } from 'react';

const ServicesGrid = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);



  const services = [
    {
      image: '/images/full stack development.png',
      title: 'Full Stack Projects',
      description: 'Complete end-to-end development solutions including web, Android, iOS (Swift), Windows applications, and AI/ML integrations.',
      color: 'from-blue-500 to-blue-700',
      gradient: 'bg-gradient-to-br from-blue-50/50 to-blue-100/30'
    },
    {
      image: '/images/web developemnt.png',
      title: 'Web Development',
      description: 'Modern web applications with cutting-edge technologies, responsive designs, and optimal performance across all devices.',
      color: 'from-emerald-500 to-emerald-700',
      gradient: 'bg-gradient-to-br from-emerald-50/50 to-emerald-100/30'
    },
    {
      image: '/images/e commerce.png',
      title: 'E-commerce & CRM',
      description: 'Comprehensive e-commerce platforms and custom CRM software solutions to streamline your business operations.',
      color: 'from-purple-500 to-purple-700',
      gradient: 'bg-gradient-to-br from-purple-50/50 to-purple-100/30'
    },
    {
      image: '/images/grow service online.png',
      title: 'Grow Services Online',
      description: 'Digital transformation strategies, SEO optimization, and online presence enhancement to scale your business.',
      color: 'from-orange-500 to-red-600',
      gradient: 'bg-gradient-to-br from-orange-50/50 to-orange-100/30'
    },
    {
      image: '/images/thesis and report work.png',
      title: 'Thesis & Report Work',
      description: 'Academic research support, thesis writing assistance, and comprehensive report preparation with professional standards.',
      color: 'from-indigo-500 to-indigo-700',
      gradient: 'bg-gradient-to-br from-indigo-50/50 to-indigo-100/30'
    },
    {
      image: '/images/professional pptpdf.png',
      title: 'Professional PDF/PPT',
      description: 'High-quality document design, presentation creation, and professional formatting for business and academic needs.',
      color: 'from-pink-500 to-pink-700',
      gradient: 'bg-gradient-to-br from-pink-50/50 to-pink-100/30'
    },
    {
      image: '/images/component marketplace.png',
      title: 'Components Marketplace',
      description: 'Ready-to-use UI components, templates, and development resources to accelerate your project timeline.',
      color: 'from-teal-500 to-teal-700',
      gradient: 'bg-gradient-to-br from-teal-50/50 to-teal-100/30'
    },
    {
      image: '/images/security solutions.png',
      title: 'Security Solutions',
      description: 'Advanced security implementations, data protection protocols, and comprehensive cybersecurity measures.',
      color: 'from-red-500 to-red-700',
      gradient: 'bg-gradient-to-br from-red-50/50 to-red-100/30'
    },
    {
      image: '/images/dev ops and deployment.png',
      title: 'DevOps & Deployment',
      description: 'Automated deployment pipelines, cloud infrastructure management, and continuous integration solutions.',
      color: 'from-amber-500 to-amber-700',
      gradient: 'bg-gradient-to-br from-amber-50/50 to-amber-100/30'
    },
    {
      image: '/images/uiux design.png',
      title: 'UI/UX Design',
      description: 'Intuitive user interfaces, engaging user experiences, and design systems that captivate and convert users.',
      color: 'from-violet-500 to-violet-700',
      gradient: 'bg-gradient-to-br from-violet-50/50 to-violet-100/30'
    },
    {
      image: '/images/backend system.png',
      title: 'Backend Systems',
      description: 'Scalable server architectures, robust APIs, and database solutions designed for high performance and reliability.',
      color: 'from-cyan-500 to-cyan-700',
      gradient: 'bg-gradient-to-br from-cyan-50/50 to-cyan-100/30'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-24 bg-white relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.1) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-orange-200/20 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-green-200/20 to-teal-200/20 rounded-full blur-xl animate-pulse delay-500"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-20">
          <div className="inline-block">
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-clip-text text-transparent mb-6 relative">
              Our Services
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </h2>
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We offer comprehensive tech solutions to help your business thrive in the digital world with cutting-edge technologies and innovative approaches.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 bg-white rounded-3xl shadow-sm border border-gray-100/50 hover:shadow-2xl hover:shadow-gray-200/50 transition-all duration-700 transform hover:-translate-y-3 hover:scale-[1.02] ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-16 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 80}ms` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 ${service.gradient} opacity-0 group-hover:opacity-100 rounded-3xl transition-all duration-500`} />
              
              {/* Border Glow Effect */}
              <div className={`absolute inset-0 bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-20 rounded-3xl blur-sm transition-opacity duration-500 -z-10`} />
              
              <div className="relative z-10">
                {/* Image Container */}
                <div className="relative mb-6 overflow-hidden">
                  <div className={`w-full h-48 rounded-2xl transform group-hover:rotate-1 group-hover:scale-105 transition-all duration-500 shadow-lg overflow-hidden`}>
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        // Fallback to gradient background if image fails to load
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const nextSibling = target.nextSibling as HTMLElement;
                        if (nextSibling) {
                          nextSibling.style.display = 'block';
                        }
                      }}
                    />
                    {/* Fallback gradient background */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-r ${service.color} flex items-center justify-center text-white font-bold text-2xl`}
                      style={{ display: 'none' }}
                    >
                      {service.title.split(' ').map(word => word[0]).join('')}
                    </div>
                    {/* Overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                  {/* Image Shadow */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                </div>
                
                <h3 className="text-2xl font-bold text-slate-800 mb-4 group-hover:text-slate-900 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed group-hover:text-slate-700 transition-colors duration-300 mb-6">
                  {service.description}
                </p>

                {/* Enhanced Learn More Button */}
                <div className="transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                  <button className={`inline-flex items-center px-6 py-3 bg-gradient-to-r ${service.color} text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300`}>
                    Learn More 
                    <svg className="ml-2 w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Corner Decoration */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-gray-300 to-gray-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};

export default ServicesGrid;

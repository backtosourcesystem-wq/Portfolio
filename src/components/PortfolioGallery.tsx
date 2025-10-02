import { useEffect, useRef, useState } from 'react';
import { ExternalLink, Code, Github } from 'lucide-react';

const PortfolioGallery = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const projects = [
    {
      title: 'CRM Systems',
      description: 'Comprehensive customer relationship management solution with automated workflows and analytics dashboard',
      image: 'https://images.pexels.com/photos/7421264/pexels-photo-7421264.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Node.js', 'MongoDB', 'Chart.js'],
      category: 'CRM Solution'
    },
    {
      title: 'E-commerce Clothing Site',
      description: 'Modern online fashion store with advanced product filtering, shopping cart, and secure payment processing',
      image: 'https://images.pexels.com/photos/994234/pexels-photo-994234.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['React', 'Express', 'Stripe', 'PostgreSQL'],
      category: 'E-commerce'
    },
    {
      title: 'Static Construction Site',
      description: 'Professional construction company website with project galleries, service listings, and contact forms',
      image: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      category: 'Business Website'
    },
    {
      title: 'Company Portfolio',
      description: 'Elegant corporate portfolio website showcasing services, team, and past projects with modern design',
      image: 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      category: 'Portfolio'
    },
    {
      title: 'Digital Marketing Agency',
      description: 'SEO-optimized marketing website with case studies, service packages, and lead generation forms',
      image: 'https://images.pexels.com/photos/3184430/pexels-photo-3184430.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['WordPress', 'Elementor', 'Google Analytics'],
      category: 'Marketing'
    },
    {
      title: 'Restaurant Management System',
      description: 'Complete restaurant software solution with POS, inventory management, and online ordering',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
      tech: ['Vue.js', 'Laravel', 'MySQL'],
      category: 'Management Software'
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="portfolio"
      className="py-24 bg-white"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
            Our Portfolio
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Explore our recent projects and see how we've helped businesses transform their digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 ${
                isVisible 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-12 opacity-0'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon Container */}
              <div className="relative h-64 bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <Github className="h-20 w-20 text-slate-500 group-hover:text-orange-500 transition-colors duration-300" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-orange-500 text-white text-sm font-medium rounded-full">
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-orange-500 transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300">
            View All Projects
            <ExternalLink className="ml-2 h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PortfolioGallery;

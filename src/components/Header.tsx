import { useState, useEffect } from 'react';
import { Menu, X, User, LogOut } from 'lucide-react';
import logo from '../assets/images/logo.png';

interface HeaderProps {
  user?: any;
  onLogout?: () => void;
  onShowLogin?: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout, onShowLogin }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMenuOpen(false);
  };



  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-0">
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="B2S Logo"
              className="h-16 w-16 object-contain transform scale-110"
            />
            <h2 className="text-2xl font-bold text-slate-800 nanum-myeongjo-regular">Back To Source System</h2>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className="text-slate-700 hover:text-orange-500 font-medium transition-colors duration-200"
              >
                {item}
              </button>
            ))}

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 px-3 py-2 bg-slate-100 rounded-full">
                  <User className="h-4 w-4 text-slate-600" />
                  <span className="text-slate-700 font-medium">{user.name || user.userid}</span>
                </div>
                <button
                  onClick={onLogout}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-full hover:bg-red-600 transition-colors duration-200"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onShowLogin}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-orange-700"
              >
                Login
              </button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-slate-800" />
            ) : (
              <Menu className="h-6 w-6 text-slate-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <nav className="flex flex-col space-y-2">
              {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left px-4 py-2 text-slate-700 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all duration-200"
                >
                  {item}
                </button>
              ))}

              {user ? (
                <>
                  <div className="px-4 py-2 flex items-center space-x-2 text-slate-700 bg-slate-50 rounded-lg mx-4">
                    <User className="h-4 w-4" />
                    <span className="font-medium">{user.name || user.userid}</span>
                  </div>
                  <button
                    onClick={() => {
                      onLogout?.();
                      setIsMenuOpen(false);
                    }}
                    className="mx-4 mt-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-200 text-center flex items-center justify-center space-x-2"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    onShowLogin?.();
                    setIsMenuOpen(false);
                  }}
                  className="mx-4 mt-4 px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-orange-600 hover:to-orange-700 text-center"
                >
                  Login
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

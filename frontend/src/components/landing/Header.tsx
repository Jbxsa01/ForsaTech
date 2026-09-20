import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, Sparkles } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Fonctionnalités" },
    { href: "#how-it-works", label: "Comment ça marche" },
    { href: "#about", label: "À propos" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-[#FF7A00]/10" 
          : "bg-white/80 backdrop-blur-sm border-b border-[#FF7A00]/8"
      }`}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center group ml-3 md:ml-6">
            <img 
              src="/logo.png" 
              alt="ForsaTech" 
              className="h-10 md:h-12 w-auto transition-all duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 rounded-lg text-[#333333]/75 hover:text-[#FF7A00] hover:bg-[#FF7A00]/10 font-medium transition-all duration-200 text-sm"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-[#333333]/75 hover:text-[#FF7A00] hover:bg-[#FF7A00]/10"
              >
                Connexion
              </Button>
            </Link>
            <Link to="/signup">
              <Button 
                size="sm"
                className="bg-[#FF7A00] hover:bg-[#E56700] text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <Sparkles className="w-4 h-4 mr-1.5" />
                Inscription
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#333333] hover:bg-[#FF7A00]/10 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#333333]/10 animate-fade-in">
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 rounded-lg text-[#333333]/75 hover:text-[#FF7A00] hover:bg-[#FF7A00]/10 font-medium transition-all duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="flex gap-3 pt-4 border-t border-[#333333]/10">
                <Link to="/login" className="flex-1">
                  <Button variant="ghost" className="w-full">
                    Connexion
                  </Button>
                </Link>
                <Link to="/signup" className="flex-1">
                  <Button className="w-full bg-[#FF7A00] hover:bg-[#E56700] text-white">
                    <Sparkles className="w-4 h-4 mr-1.5" />
                    Inscription
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

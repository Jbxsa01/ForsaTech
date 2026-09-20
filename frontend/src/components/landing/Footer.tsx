import { Link } from "react-router-dom";
import { Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { label: "Fonctionnalités", href: "#features" },
      { label: "Comment ça marche", href: "#how-it-works" },
      { label: "Tarifs", href: "#pricing" },
      { label: "API", href: "#api" },
    ],
    company: [
      { label: "À propos", href: "#about" },
      { label: "Carrières", href: "#careers" },
      { label: "Blog", href: "#blog" },
      { label: "Presse", href: "#press" },
    ],
    support: [
      { label: "Centre d'aide", href: "#help" },
      { label: "Contact", href: "#contact" },
      { label: "FAQ", href: "#faq" },
      { label: "Statut", href: "#status" },
    ],
    legal: [
      { label: "Confidentialité", href: "#privacy" },
      { label: "Conditions", href: "#terms" },
      { label: "Cookies", href: "#cookies" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Instagram, href: "#", label: "Instagram" },
  ];

  return (
    <footer className="bg-white border-t border-[#333333]/10">
      <div className="container mx-auto px-4">
        {/* Main Footer */}
        <div className="py-12 md:py-16 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center mb-4 group">
              <img 
                src="/logo.png" 
                alt="ForsaTech" 
                className="h-10 w-auto transition-all duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="text-[#333333]/70 text-sm mb-6 max-w-xs leading-relaxed">
              Connectez talents et opportunités grâce à l'IA. 
              Emplois, stages PFE et formations au Maroc et à l'international.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-lg bg-[#F4F7F8] border border-[#333333]/10 flex items-center justify-center text-[#333333]/60 hover:text-[#FF7A00] hover:border-[#FF7A00] hover:bg-[#FF7A00]/10 transition-all duration-200"
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <FooterLinkGroup title="Produit" links={footerLinks.product} />
          <FooterLinkGroup title="Entreprise" links={footerLinks.company} />
          <FooterLinkGroup title="Support" links={footerLinks.support} />
          <FooterLinkGroup title="Légal" links={footerLinks.legal} />
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-[#333333]/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[#333333]/60">
            © {currentYear} ForsaTech. Tous droits réservés.
          </p>
          <div className="flex items-center gap-2 text-sm text-[#333333]/60">
            <span>Fait avec</span>
            <span className="text-[#2ECC71]">❤</span>
            <span>au Maroc</span>
            <span className="ml-2">🇲🇦</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkGroupProps {
  title: string;
  links: { label: string; href: string }[];
}

const FooterLinkGroup = ({ title, links }: FooterLinkGroupProps) => (
  <div>
    <h4 className="font-semibold text-[#333333] mb-4">{title}</h4>
    <ul className="space-y-3">
      {links.map((link) => (
        <li key={link.label}>
          <a
            href={link.href}
            className="text-sm text-[#333333]/60 hover:text-[#FF7A00] transition-colors"
          >
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default Footer;

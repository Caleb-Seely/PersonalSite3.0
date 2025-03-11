import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { colors, colorCombos } from '@/app/styles/colors';

interface NavLink {
  href: string;
  label: string;
  target?: string;
  rel?: string;
}

interface NavMenuProps {
  links: NavLink[];
}

const NavMenu: React.FC<NavMenuProps> = ({ links }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Fixed Navigation */}
      <div className="absolute top-0 w-full p-4 flex justify-between items-center z-20">
        <div className="text-cream text-2xl font-bold">CS</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="z-50 text-cream"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      {isMenuOpen && (
        <div className={`fixed top-16 right-4 ${colors.primary} bg-opacity-80 z-40 rounded-lg shadow-lg p-4`}>
          <nav className={`${colors.text} text-l space-y-1`}>
          {links.map((link) => (
            <Link
               key={link.href}
               href={link.href}
               className={`block py-1 px-2 rounded ${colors.hover} transition-colors`}
               target={link.target}
               rel={link.rel}
            >
               {link.label}
            </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
};

export default NavMenu;

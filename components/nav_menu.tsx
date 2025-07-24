import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { tw, transitions } from '@/app/styles/theme/utils';
import { trackNavigationClick, trackResumeDownload } from './google-analytics';

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
      <div className={`absolute top-0 w-full p-4 flex justify-between items-center z-20 `}>
        <div className={`text-2xl font-bold ${tw.text('accent')}`}>CS</div>
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className={`z-50 ${tw.text('text')}`}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      {isMenuOpen && (
        <div className={`fixed top-16 right-4 ${tw.bg('primary')} ${tw.bgWithOpacity('primary', 'heavy')} z-40 rounded-lg shadow-lg p-4`}>
          <nav className={`${tw.text('text')} text-l space-y-1`}>
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-1 px-2 rounded ${tw.hoverBg('hover')} ${transitions.color}`}
                target={link.target}
                rel={link.rel}
                onClick={() => {
                  if (link.label === 'Resume') {
                    trackResumeDownload()
                  } else {
                    trackNavigationClick(link.label.toLowerCase(), 'nav_menu')
                  }
                  setIsMenuOpen(false)
                }}
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

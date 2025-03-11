import React from 'react';
import { Mail, Linkedin, FileText, Github } from "lucide-react";
import { tw, transitions } from '@/app/styles/theme/utils';

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:calebseely@gmail.com" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/caleb-seely" },
    { icon: FileText, href: "/misc/Caleb_Seely_Resume.pdf" },
    { icon: Github, href: "https://github.com/Caleb-Seely" }
  ];

  return (
    <footer className={`${tw.bg('primary')} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-12">
          {socialLinks.map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              className={`${tw.text('text')} ${tw.hoverText('accent')} ${transitions.all} hover:scale-110`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Icon size={28} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

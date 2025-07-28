import React from 'react';
import { Mail, FileText } from "lucide-react";
import { tw, transitions } from '@/app/styles/theme/utils';
import { trackResumeDownload } from './google-analytics';

// Custom SVG components for LinkedIn and GitHub bc they were depricated in Lucid
const LinkedInIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: "mailto:calebseely@gmail.com", isCustom: false, isResume: false },
    { icon: LinkedInIcon, href: "https://www.linkedin.com/in/caleb-seely", isCustom: true, isResume: false },
    { icon: FileText, href: "/misc/Caleb_Seely_Resume.pdf", isCustom: false, isResume: true },
    { icon: GitHubIcon, href: "https://github.com/Caleb-Seely", isCustom: true, isResume: false },
  ];
  
  return (
    <footer className={`${tw.bg('primary')} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-12">
          {socialLinks.map(({ icon: Icon, href, isCustom, isResume }) => (
            <a
              key={href}
              href={href}
              className={`${tw.text('text')} ${tw.hoverText('accent')} ${transitions.all} hover:scale-110`}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                if (isResume) {
                  trackResumeDownload()
                }
              }}
            >
              {isCustom ? <Icon /> : <Icon size={28} />}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
import { Mail, Linkedin, FileText, Github } from "lucide-react";

const Footer = ({ colors }: { colors: { primary: string; text: string } }) => {
  const socialLinks = [
    { icon: Mail, href: "mailto:calebseely@gmail.com" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/caleb-seely" },
    { icon: FileText, href: "/misc/Caleb_Seely_Resume.pdf" },
    { icon: Github, href: "https://github.com/Caleb-Seely" }
  ];

  return (
    <footer className={`${colors.primary} py-8`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center space-x-12">
          {socialLinks.map(({ icon: Icon, href }) => (
            <a
              key={href}
              href={href}
              className={`transition-all duration-300 hover:text-[#8DB7F5] hover:scale-110 ${colors.text}`}
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

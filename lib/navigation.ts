export interface NavLink {
  href: string;
  label: string;
  target?: string;
  rel?: string;
}

const baseLinks: NavLink[] = [
  { href: "/pacing", label: "Pacing" },
  { href: "/projects", label: "Projects" },
  { href: "/places", label: "Places" },
  { href: "/misc/Caleb_Seely_Resume.pdf", label: "Resume", target: "_blank", rel: "noopener noreferrer" },
];

export const getNavLinks = (currentPage?: string): NavLink[] => {
  if (currentPage === 'home') {
    return baseLinks;
  }

  const homeLink: NavLink = { href: "/", label: "Home" };
  const filteredLinks = baseLinks.filter(
    link => link.label.toLowerCase() !== currentPage?.toLowerCase()
  );

  return [homeLink, ...filteredLinks];
};

// Pre-configured nav links for each page
export const homeNavLinks = baseLinks;
export const pacingNavLinks = getNavLinks('pacing');
export const projectsNavLinks = getNavLinks('projects');
export const placesNavLinks = getNavLinks('places');

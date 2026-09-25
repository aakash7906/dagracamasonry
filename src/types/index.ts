export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  features: string[];
  imageUrl: string;
  popular?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'residential' | 'commercial' | 'restoration' | 'hardscaping';
  description: string;
  location: string;
  completionYear: string;
  tags: string[];
  imageUrl: string;
}

export interface TestimonialItem {
  id: string;
  author: string;
  role: string;
  location: string;
  quote: string;
  rating: number;
  projectType: string;
}

export interface CompanyStat {
  value: string;
  label: string;
  subtext: string;
}

export type SkillCategory = 'all' | 'frontend' | 'backend' | 'mobile' | 'game_dev' | 'other';

export interface Skill {
  name: string;
  logo: string;
  category: SkillCategory;
  icon: string;
  color: string;
  border: string;
  text: string;
}

export type PublicationType = 'Journal Paper' | 'Conference Paper' | 'Book Chapter' | 'Unpublished';

export interface Publication {
  type: PublicationType;
  authors: string;
  title: string;
  venue: string;
  year: number;
  pdfUrl?: string;
}

export interface ExperienceItem {
  period: string;
  category: string;
  categoryBadge: string;
  title: string;
  subtitle: string;
  bullets: string[];
  color: string;
}

export interface AwardItem {
  title: string;
  venue: string;
  yearBadge: string;
  badgeType: 'FIRST PLACE' | 'SECOND PLACE';
}

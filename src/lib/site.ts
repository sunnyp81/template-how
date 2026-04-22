export const site = {
  name: 'Template.how',
  tagline: 'US + UK templates — built to be read, used, and cited.',
  url: 'https://template.how',
  locale: 'en',
  defaultOgImage: '/og/default.png'
} as const;

export const author = {
  name: 'Sunny Patel',
  jobTitle: 'SEO Consultant & Template Editor',
  url: 'https://sunnypatel.co.uk',
  sameAs: [
    'https://www.linkedin.com/in/sunnypatel1994/',
    'https://twitter.com/2012infinite',
    'https://clutch.co/profile/sunny-patel'
  ]
} as const;

export const NODE_SLUGS = [
  'legal-document-templates',
  'resume-templates',
  'business-templates',
  'life-event-templates',
  'planning-templates',
  'design-templates',
  'education-templates',
  'productivity-templates'
] as const;

export type NodeSlug = typeof NODE_SLUGS[number];

export const NODE_LABELS: Record<NodeSlug, string> = {
  'legal-document-templates': 'Legal documents',
  'resume-templates': 'Resumes & careers',
  'business-templates': 'Business operations',
  'life-event-templates': 'Life events',
  'planning-templates': 'Planning',
  'design-templates': 'Design & creative',
  'education-templates': 'Education',
  'productivity-templates': 'Productivity'
};

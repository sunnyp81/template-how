import { type NodeSlug } from '@/lib/site';

/**
 * Short, scannable one-liners for each of the 8 hubs. Used in cross-hub
 * navigation (HubNav) and in the "place in the system" orientation strip so a
 * visitor instantly understands what each cluster covers.
 */
export const HUB_BLURBS: Record<NodeSlug, string> = {
  'legal-document-templates':
    'Bills of sale, leases, NDAs and wills — with the governing statute and a last-verified date.',
  'resume-templates':
    'Resumes, CVs and cover letters built to clear ATS screening and impress a human.',
  'business-templates':
    'Invoices, estimates, balance sheets and the day-to-day paperwork of running a business.',
  'life-event-templates':
    'Obituaries, announcements and order-of-service templates for life’s milestones.',
  'planning-templates':
    'Itineraries, schedules, budgets and birth plans to organise what comes next.',
  'design-templates':
    'Social banners, thumbnails and creative layouts sized right for every platform.',
  'education-templates':
    'Lesson plans, certificates, Cornell notes and study tools for teachers and students.',
  'productivity-templates':
    'To-do lists, habit trackers, checklists and planners that keep work moving.'
};

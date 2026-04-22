import { defineCollection, z } from 'astro:content';
import { NODE_SLUGS } from '@/lib/site';

// NOTE: Astro 5 Content Layer strips `slug` from frontmatter data before
// schema validation (it's framework-managed via the entry id/filename).
// `slug` fields are kept in frontmatter for human readability but omitted
// from zod schemas. NODE validation via z.enum(NODE_SLUGS) is done on the
// `node` field (seeds/guides) rather than on the entry id.

const nodes = defineCollection({
  type: 'content',
  schema: z.object({
    label: z.string(),
    headline: z.string(),
    lede: z.string(),
    seeds: z.array(z.string()),
    updated: z.string().transform((s) => new Date(s))
  })
});

const seeds = defineCollection({
  type: 'content',
  schema: z.object({
    node: z.enum(NODE_SLUGS),
    title: z.string(),
    h1: z.string(),
    definitionalLede: z.string(),
    primaryKeyword: z.string(),
    searchVolume: z.number().int().nonnegative(),
    difficulty: z.number().int().min(0).max(100),
    renderer: z.enum(['legal-document', 'resume', 'invoice', 'letter', 'list-plan', 'static-only']),
    related: z.array(z.string()).min(4),
    crossCluster: z.array(z.string()).min(1),
    audience: z.array(z.enum(['us', 'uk'])).min(1),
    wordCountFloor: z.number().int().default(1800),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      accessed: z.string()
    })).min(1),
    updated: z.string().transform((s) => new Date(s))
  })
});

const variants = defineCollection({
  type: 'content',
  schema: z.object({
    parentSeed: z.string(),
    jurisdictionCode: z.string(),
    title: z.string(),
    h1: z.string(),
    definitionalLede: z.string(),
    audience: z.enum(['us', 'uk']),
    wordCountFloor: z.number().int().default(1200),
    siblings: z.array(z.string()).min(3),
    sources: z.array(z.object({
      title: z.string(),
      url: z.string().url(),
      accessed: z.string()
    })).min(1),
    updated: z.string().transform((s) => new Date(s))
  })
});

const guides = defineCollection({
  type: 'content',
  schema: z.object({
    node: z.enum(NODE_SLUGS),
    title: z.string(),
    h1: z.string(),
    lede: z.string(),
    references: z.array(z.string()).min(2),
    updated: z.string().transform((s) => new Date(s))
  })
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    h1: z.string(),
    lede: z.string(),
    published: z.string().transform((s) => new Date(s)),
    updated: z.string().transform((s) => new Date(s))
  })
});

export const collections = { nodes, seeds, variants, guides, blog };

import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Case studies live as Markdown in src/content/case-studies/. Adding a new one is
// "write a .md file with this frontmatter" — see CLAUDE.md §5.
const caseStudies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/case-studies' }),
  schema: z.object({
    title: z.string(),
    // One-line summary shown on homepage cards. Plain language, no jargon (CLAUDE.md §4).
    summary: z.string(),
    role: z.string(),
    // Not every entry has resume-stated dates (e.g. personal projects) — never invent one.
    period: z.string().optional(),
    stack: z.array(z.string()),
    // Homepage card order, ascending.
    order: z.number(),
    featured: z.boolean().default(true),
  }),
});

export const collections = { caseStudies };

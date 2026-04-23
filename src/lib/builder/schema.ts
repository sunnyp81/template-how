import { z } from 'zod';

const fieldBase = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  required: z.boolean().optional(),
  showIf: z.string().optional(),
  requiredIf: z.string().optional(),
  help: z.string().optional()
});

const fieldType = z.discriminatedUnion('type', [
  fieldBase.extend({ type: z.literal('text') }),
  fieldBase.extend({ type: z.literal('textarea') }),
  fieldBase.extend({ type: z.literal('number') }),
  fieldBase.extend({ type: z.literal('currency'), currency: z.enum(['USD', 'GBP']).default('USD') }),
  fieldBase.extend({ type: z.literal('date') }),
  fieldBase.extend({ type: z.literal('checkbox') }),
  fieldBase.extend({
    type: z.literal('select'),
    options: z.union([
      z.array(z.object({ value: z.string(), label: z.string() })),
      z.literal('us-states'),
      z.literal('uk-nations'),
      z.literal('us-states+uk-nations')
    ])
  })
]);

export const builderSchemaValidator = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  renderer: z.enum(['legal-document', 'resume', 'invoice', 'letter', 'list-plan']),
  sections: z.array(
    z.object({
      id: z.string().min(1),
      heading: z.string().min(1),
      fields: z.array(fieldType).min(1)
    })
  ).min(1),
  governingData: z.object({
    lookupBy: z.string(),
    source: z.string()
  }).optional()
});

export type BuilderSchema = z.infer<typeof builderSchemaValidator>;
export type BuilderField = BuilderSchema['sections'][number]['fields'][number];
export type FieldType = BuilderField['type'];

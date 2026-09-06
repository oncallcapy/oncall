import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { scienceNoteSchema } from './content/schemas/scienceNote';

const scienceFiles = glob({ pattern: '*.json', base: './src/content/science' });

export const collections = {
  science: defineCollection({
    // Only reviewed JSON notes belong here. No unvalidated Markdown body can
    // bypass the framing contract. Schema validity alone is not review approval.
    loader: {
      name: 'reviewed-science-notes',
      async load(context) {
        // The glob loader returns early when its directory is empty. Clear its
        // persisted entries first so deleting the last note also unpublishes it
        // on the next build, including builds using an existing content cache.
        context.store.clear();
        await scienceFiles.load(context);
      },
    },
    schema: scienceNoteSchema,
  }),
};

// 1. Import utilities from `astro:content`
import { z, defineCollection } from "astro:content";

// 2. Define a schema for each collection you'd like to validate.
const blogCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    author: z.string(),
    date: z.string(),
    description: z.string(),
  }),
});
// 3. Export a single `collections` object to register your collection(s)
export const collections = {
  blog: blogCollection,
};

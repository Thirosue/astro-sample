import { getCollection } from "astro:content";
interface Blog {
  author: string;
  date: string;
  title: string;
  description: string;
  slug: string;
}

export async function getAllBlogs(): Promise<Blog[]> {
  const blogs = await getCollection("blog");
  return blogs
    .map((blog) => ({ ...blog.data, slug: blog.slug }))
    .sort(
      (a, z) =>
        new Date(z.date).getMilliseconds() - new Date(a.date).getMilliseconds()
    );
}

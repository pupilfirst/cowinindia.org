import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "docs");

export function getPostSlugs() {
  const postsSlugs = [];
  const folders = fs.readdirSync(postsDirectory);
  folders.forEach((folder) => {
    const files = fs.readdirSync(`${postsDirectory}/${folder}`);
    files.forEach((file) => postsSlugs.push([folder, file]));
  });
  return postsSlugs;
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.join("/").replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  const items = {};

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === "slug") {
      items[field] = realSlug;
    }
    if (field === "content") {
      items[field] = content;
    }

    if (data[field]) {
      items[field] = data[field];
    }
  });

  return items;
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

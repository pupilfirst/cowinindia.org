import fs from "fs";
import { join } from "path";
import matter from "gray-matter";

const postsDirectory = join(process.cwd(), "docs");

export function getPostSlugs(locale) {
  const postsSlugs = [];

  const folders = fs.readdirSync(`${postsDirectory}/${locale}`);
  folders.forEach((folder) => {
    const files = fs.readdirSync(`${postsDirectory}/${locale}/${folder}`);
    files.forEach((file) => postsSlugs.push([`${folder}`, file]));
  });

  return postsSlugs;
}

export function getPostBySlug(locale, slug, fields = []) {
  const realSlug = slug.join("/").replace(/\.md$/, "");
  const fullPath = join(postsDirectory, `${locale}/${realSlug}.md`);
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

export function getAllPostsByLocale(locale, fields = []) {
  const slugs = getPostSlugs(locale);
  const posts = slugs
    .map((slug) => getPostBySlug(locale, slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
  return posts;
}

export function getAllPosts(fields = []) {
  const locales = fs.readdirSync(`${postsDirectory}`);
  const posts = locales.map((locale) => {
    const p = getAllPostsByLocale(locale, fields);
    return { locale: locale, posts: p };
  });

  return posts;
}

export function getAllLocales() {
  const locales = fs.readdirSync(`${postsDirectory}`);

  return locales;
}

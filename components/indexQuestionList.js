import Link from "next/link";
import { humanize } from "../lib/utils";

function getCategories(posts) {
  const categories = posts.map((post) => post.slug.split("/")[0]);
  return [...new Set(categories)].sort();
}

function getPostsByCategories(category, posts) {
  return posts.filter((post) => post.slug.split("/")[0] == category);
}

export default function IndexQuestionList({ posts, locale }) {
  return (
    <div className="mx-auto container max-w-4xl p-6 bg-gray-300 border rounded">
      {getCategories(posts).map((category) => (
        <div className="mb-8">
          <div className="mb-4 text-2xl font-semibold">
            {humanize(category)}
          </div>
          {getPostsByCategories(category, posts).map((post) => (
            <Link
              key={post.slug}
              as={`${locale}/${post.slug}`}
              href="[locale]/[...slug]"
            >
              <div className="mt-2 rounded bg-white p-4 shadow-md cursor-pointer">
                <a className="text-indigo-700 text-xl">{post.title}</a>
                <div className="text-gray-700 mt-2">{post.excerpt}</div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

